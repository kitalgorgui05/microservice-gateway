import {IBatiment} from "./batiment.model";

export interface ISalle {
  id?: number;
  nom?: string;
  nombre?: number;
  batiment?: IBatiment;
}

export class Salle implements ISalle {
  constructor(public id?: number, public nom?: string, public nombre?: number, public batiment?:  IBatiment) {}
}
