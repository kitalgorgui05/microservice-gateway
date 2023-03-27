import { Moment } from 'moment';
import {IAnneeModelClient} from "./model-client/annee.model.client";

export interface ITrimestre {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  annee?:string;
  anneeClient?: IAnneeModelClient;
}

export class Trimestre implements ITrimestre {
  constructor(
    public id?: number,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public annee?:string,
    public anneeClient?: IAnneeModelClient
  ) {}
}
