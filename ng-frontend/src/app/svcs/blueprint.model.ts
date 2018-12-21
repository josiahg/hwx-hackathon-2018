export interface Blueprint {
  id: String;
  service_id: String;
  component_description: String;
  config: String;
  master_blueprint: String;
  worker_blueprint: String;
  compute_blueprint: String;
}
