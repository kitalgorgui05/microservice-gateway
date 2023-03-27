import {IEvaluation} from "./evaluation.model";
import {IEleveModelClient} from "./model-client/eleve.model.client";

export interface INote {
  id?: number;
  note?: number;
  eleve?: string;
  eleveDTOReq?:IEleveModelClient;
  apperciation?: any;
  evaluation?: IEvaluation;
}

export class Note implements INote {
  constructor(
    public id?: number,
    public note?: number,
    public eleve?: string,
    public eleveDTOReq?:IEleveModelClient,
    public apperciation?: any,
    public evaluation?: IEvaluation) {}
}
