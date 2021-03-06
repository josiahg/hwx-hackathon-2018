import { Component, OnInit, NgModule } from '@angular/core';
import { JsonPipe } from '@angular/common'
import { Router } from '@angular/router'
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { Blueprint } from '../../svcs/blueprint.model';
import { BlueprintService } from '../../svcs/blueprint.service';

import { Service } from '../../svcs/service.model';
import { ServiceService } from '../../svcs/service.service';

import * as GenBlueprint from '../../svcs/generated-blueprint.model';
import { BsComponentRef } from 'ngx-bootstrap/component-loader/public_api';

import { Cluster } from '../../svcs/cluster.model';
import { ClusterService } from '../../svcs/cluster.service';

import { FilewriterService } from '../../svcs/filewriter.service'

import { DownloadService } from '../../svcs/download.service'

import { UriService } from '../../svcs/uri.service'

import { BundlePushService } from '../../svcs/bundle-push.service'

import { CloudbreakCredentialsService } from '../../svcs/cloudbreakcredentials.service'

interface ClusterType {
  id: String;
  img: String;
  description: String;
};

interface BPComp {
  name: string;
};

interface HostGroup {
  name: string;
  configurations: any[];
  components: any[];
  cardinality: string;
};

interface GenBlueprint {
  Blueprints: any;
  //settings: Setting[];
  configurations: any;
  host_groups: HostGroup[];
};

@Component({
  templateUrl: 'generator.component.html'
})
export class GeneratorComponent implements OnInit {

  constructor(private blueprintService: BlueprintService,
    private serviceService: ServiceService,
    private clusterService: ClusterService,
    private filewriterService: FilewriterService,
    private downloadService: DownloadService,
    private uriService: UriService,
    private bundlePushService: BundlePushService,
    private cbCredService: CloudbreakCredentialsService) {};

  max: number = 5;
  dynamic: number = 1;

  clusterTypes: ClusterType[] = [{'id':'1','img':'../../../assets/img/hwx/icon-hdp.png', 'description': 'HDP boiiii'},
                  {'id':'2','img':'../../../assets/img/hwx/icon-dataflow.png', 'description':'HDF is for nerds'},
                  {'id':'3','img':'../../../assets/img/hwx/hdf-hdp-connected-sq2.png','description':'All the things'}
  ];
  showClusterTypes = true;
  showServices = false;
  showOptions = false;
  showVersion = false;
  showGenerate = false;
  public readyForDownload = false;
  downloadLink = "";
  clusterType = 0;

  nodeTypes = ['Master', 'Worker', 'Compute'];

  public blueprints: Blueprint[] = [];
  public services: Service[];

  public generated: any[] = [];

  selectedServices = new Map<number, boolean>();

  public host_groups: HostGroup[] = [];
  public hg_master: HostGroup = { 'name':'master', 'cardinality':'1', 'components':[] } as HostGroup;
  public hg_worker: HostGroup = { 'name':'worker', 'cardinality':'1+', 'components':[] } as HostGroup;
  public hg_compute: HostGroup = { 'name':'compute', 'cardinality':'1+', 'components':[] } as HostGroup;
  public gen_bp: GenBlueprint = {} as GenBlueprint;
  public shRecipes = new Set();
  public oneBigConf: string[] = [];

  ngOnInit(): void {
    this.fetchBlueprintsForService(1);
    //console.log(this.blueprints);
    this.gen_bp.Blueprints = {'blueprint_name': 'test_gen_1', 'stack_name':'HDP', 'stack_version':'3.0'};
    this.gen_bp.configurations = [];
    this.gen_bp.host_groups = this.host_groups;
  }

  fetchServicesForClusterType(id) {
    this.serviceService
    .getServiceById(id)
    .subscribe((data: Service[]) => {
      this.services = data;
      console.log('Service data requested...');
      console.log(this.services);
    })
  }

  stringToBPComp(str): BPComp {
    let obj = JSON.parse(str);
    return obj as BPComp;
  }

  fetchRecipesForService(id) {
    this.blueprintService
    .getRecipesForBlueprint(id)
    .subscribe((data: {'id','service_id','recipe_description','extra_type','pre_ambari_start','post_ambari_start','post_cluster_install','on_termination'}) => {
      if(typeof data[0] !== 'undefined')
        this.shRecipes.add(data[0].pre_ambari_start);
    });
  }

  fetchBlueprintsForService(id) {
    this.blueprintService
    .getBlueprintsForService(id)
    .subscribe((data: Blueprint[]) => {
      //console.log('Blueprint data requested ... ');
      //console.log('Data', data);
      data.forEach(bp => {
        this.generated.push(bp)
        if(bp.master_blueprint.length > 0) {
          // console.log('BPComp:',this.stringToBPComp(bp.master_blueprint));
          this.hg_master.components.push(this.stringToBPComp(bp.master_blueprint))
        }
        if(bp.worker_blueprint.length > 0) {
          // console.log('BPComp:',this.stringToBPComp(bp.worker_blueprint));
          this.hg_worker.components.push(this.stringToBPComp(bp.worker_blueprint))
        }
        if(bp.compute_blueprint.length > 0) {
          // console.log('BPComp:',this.stringToBPComp(bp.compute_blueprint));
          this.hg_compute.components.push(this.stringToBPComp(bp.compute_blueprint))
        }
        if(bp.config.length > 0) {
          //console.log('Bpconfig: ',bp.config)
          this.oneBigConf.push(bp.config as string)
        }
      })
      // Dedupe the lists of components
      this.hg_master.components = this.hg_master.components.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.name === thing.name && t.name === thing.name
        ))
      )
      this.hg_worker.components = this.hg_worker.components.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.name === thing.name && t.name === thing.name
        ))
      )
      this.hg_compute.components = this.hg_compute.components.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.name === thing.name && t.name === thing.name
        ))
      )
    })
  }
  public asyncResult: any;

  async genBlueprint(name) {
    this.host_groups.push(this.hg_master);
    this.host_groups.push(this.hg_worker);
    this.host_groups.push(this.hg_compute);
    this.gen_bp.host_groups = this.host_groups;
    this.gen_bp.Blueprints.blueprint_name = name;
    this.addConfigsToBP();
    console.log(JSON.stringify(this.gen_bp))
    this.asyncResult = await this.filewriterService
    .writeFile(name,JSON.stringify(this.gen_bp));
  }

  async genSh(name) {
    //console.log("TODO: Fix genSH")
    let arr = JSON.stringify(Array.from(this.shRecipes.values()))
    let json = JSON.stringify(arr)
    console.log(json);
    await this.filewriterService.generateSh(name,JSON.stringify(Array.from(this.shRecipes.values())));
  }

  fetchNeededBlueprints() {
    console.log("Fetching blueprints...");
    Object.keys(this.selectedServices).forEach(svc => {
      if(this.selectedServices[svc]) {
        this.fetchBlueprintsForService(svc);
        this.fetchRecipesForService(svc);
      }
    });
  }

  clusterTypeSelect(id) {
    //console.log('Type is ' + id)
    this.fetchServicesForClusterType(id);
    this.clusterType = id;
    this.clusterService
    .getClusterById(id)
    .subscribe((data: Cluster[]) => {
      this.gen_bp.Blueprints.stack_version = data[0].version;
      this.gen_bp.Blueprints.stack_name = data[0].cluster_type;
    })
    this.showClusterTypes = false;
    this.showVersion = true;
    //this.showServices = true;
    this.dynamic++;
  }

  addServicesToMap() {
    this.services.forEach(value => {
      this.selectedServices[value.id] = !!value.mandatory;
    })
  }

  updateServiceSelected(id) {
    this.selectedServices[id] = !this.selectedServices[id];
    //console.log("Servics: ", JSON.stringify(this.selectedServices));
  }

  setSize() {
    this.showVersion = false;
    this.showServices = true;
    this.dynamic++;
    this.addServicesToMap();
  }

  addServices() {
    this.showServices = false;
    this.showOptions = true;
    this.dynamic++;
    this.fetchNeededBlueprints();
  }

  addConfigsToBP() {
    // One big, ugly, non-typesafe hack, do not recommend
    let confStr = '{"configurations": [' + this.oneBigConf.join(',') + ']}'
    let obj = JSON.parse(confStr)
    obj.configurations.forEach(i => {
      this.gen_bp.configurations.push(i);
    })
  }

  addOptions() {
    this.showOptions = false;
    this.showGenerate = true;
    this.dynamic++;
  }

  public bundleName = "";
  public createResult: any;
  public shResult: any;
  async genBundle(name) {

    /*this.showGenerate = false;
    this.showClusterTypes = true;
    this.dynamic = 1;*/
    this.bundleName = name;

    this.genBlueprint(name);
    //this.genSh(name);
    await this.filewriterService
      .generateSh(name,JSON.stringify(Array.from(this.shRecipes.values())))
      .then(await this.downloadService.createBundle(name) as any)
    //this.shResult = await this.filewriterService.generateSh(name,JSON.stringify(Array.from(this.shRecipes.values())));

    this.downloadLink = this.uriService.getUri() + '/download/' + name;
    this.readyForDownload = true;
  }

  downloadBundle(name) {
    console.log('about to download',name)
    this.downloadService.downloadBundle(name);
  }

  async pushBundle(name) {
    let res = await this.cbCredService.getAllCredentialsP();
    console.log(res)
    let body = {"cb_url": res[0].cb_url, "token": "", "bp_base64": btoa(JSON.stringify(this.gen_bp)), "cluster_name": name};
    let tReq = { "cb_url":res[0].cb_url, "username":res[0].cb_username, "password":res[0].cb_password};
    console.log(tReq)
    //let result = await this.bundlePushService.getToken("admin@example.com","admin-password1","18.188.99.82");
    let result = await this.bundlePushService.getToken(tReq);
    console.log(result);
    body.token = result as string;
    body.token = body.token.slice(0,-1);
    console.log(body);
    let pushed = await this.bundlePushService.loadBlueprint(body);
    console.log(pushed);
  }
}
