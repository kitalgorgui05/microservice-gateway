import {INiveau} from "app/shared/model/classe1/niveau.model";
import {ISalleClient} from "app/shared/model/classe1/salle.client.mode";

export interface IClasse {
  id?: number;
  nom?: string;
  niveau?: INiveau;
  salle?: string;
  salleClient?: ISalleClient;
}

export class Classe implements IClasse {
  constructor(
    public id?: number,
    public nom?: string,
    public niveau?: INiveau,
    public salleId?: ISalleClient) {}
}
