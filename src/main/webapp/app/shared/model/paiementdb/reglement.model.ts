import { Moment } from 'moment';
import { IFacture } from 'app/shared/model/paiementdb/facture.model';

export interface IReglement {
  id?: number;
  date?: Moment;
  montantInscription?: string;
  mensualite?: string;
  montantCantine?: number;
  montantTransport?: number;
  idNiveau?: string;
  idAnnee?: string;
  factures?: IFacture[];
}

export class Reglement implements IReglement {
  constructor(
    public id?: number,
    public date?: Moment,
    public montantInscription?: string,
    public mensualite?: string,
    public montantCantine?: number,
    public montantTransport?: number,
    public idNiveau?: string,
    public idAnnee?: string,
    public factures?: IFacture[]
  ) {}
}
