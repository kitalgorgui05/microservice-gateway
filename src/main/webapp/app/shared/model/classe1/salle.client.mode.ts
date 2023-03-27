import {BatimentClient} from "app/shared/model/classe1/batiment.client.model";

export interface ISalleClient {
  id?: number;
  nom?: string;
  batiment?:BatimentClient;
}

export class SalleClient implements ISalleClient{
  constructor(public id?:number , public nom? : string, public batiment?:BatimentClient) {
  }
}
