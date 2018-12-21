export interface Service {
  id: number;
  service_description: String;
  associated_cluster: String;
  mandatory: boolean;
  extensible: boolean;
}
