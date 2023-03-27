import { Moment } from 'moment';
import {ITrimestre} from "./trimestre.model";
import {IMatiereModel} from "./model-client/matiere.model";
import {IClasseModel} from "./model-client/classe.model";

export interface IEvaluation {
  id?: number;
  type?: string;
  dateEvaluation?: Moment;
  classe?: string;
  classeClient?:IClasseModel;
  matiere?: string;
  matiereClient?:IMatiereModel;
  trimestre?: ITrimestre;
}

export class Evaluation implements IEvaluation {
  constructor(
    public id?: number,
    public type?: string,
    public dateEvaluation?: Moment,
    public classe?: string,
    public classeClient?: IClasseModel,
    public matiere?: string,
    public matiereClient?:IMatiereModel,
    public trimestre?: ITrimestre
  ) {}
}
