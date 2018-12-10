export interface Blueprints {
    blueprint_name: string;
    stack_name: string;
    stack_version: string;
}

export interface ServiceSetting {
    name: string;
    credential_store_enabled: string;
}

export interface Setting {
    recovery_settings: any[];
    service_settings: ServiceSetting[];
    component_settings: any[];
}

export interface Configuration {
    core_site: any[];
    hdfs_site: any[];
    hive_site: any[];
    mapred_site: any[];
    yarn_site: any[];
}

export interface Component {
    name: string;
}

export interface HostGroup {
    name: string;
    configurations: any[];
    components: Component[];
    cardinality: string;
}

export interface Blueprint {
    Blueprints: Blueprints;
    settings: Setting[];
    configurations: Configuration[];
    host_groups: HostGroup[];
}


/*

export interface CoreSite {
    fs.trash.interval: string;
}

export interface HdfsSite {
    dfs.namenode.safemode.threshold-pct: string;
}

export interface HiveSite {
    hive.exec.compress.output: string;
    hive.merge.mapfiles: string;
    hive.server2.tez.initialize.default.sessions: string;
    hive.server2.transport.mode: string;
}

export interface MapredSite {
    mapreduce.job.reduce.slowstart.completedmaps: string;
    mapreduce.map.output.compress: string;
    mapreduce.output.fileoutputformat.compress: string;
}

export interface YarnSite {
    yarn.acl.enable: string;
}*/
