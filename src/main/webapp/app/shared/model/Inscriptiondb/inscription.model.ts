import { Moment } from 'moment';
import { Etat } from 'app/shared/model/enumerations/etat.model';
import {IEleve} from "app/shared/model/Inscriptiondb/eleve.model";
import {IAnnee} from "app/shared/model/Inscriptiondb/annee.model";
import {IClasseModelIns} from "app/shared/model/Inscriptiondb/modelClient/classe.model";

export interface IInscription {
  id?: number;
  dateInscription?: Moment;
  classe?: string;
  classeClient?:IClasseModelIns;
  transport?: boolean;
  cantine?: boolean;
  statut?: Etat;
  eleve?: IEleve;
  annee?: IAnnee;
}

export class Inscription implements IInscription {
  constructor(
    public id?: number,
    public dateInscription?: Moment,
    public classe?: string,
    public classeClient?:IClasseModelIns,
    public transport?: boolean,
    public cantine?: boolean,
    public statut?: Etat,
    public eleve?: IEleve,
    public annee?: IAnnee
  ) {
    this.transport = this.transport || false;
    this.cantine = this.cantine || false;
  }
}
