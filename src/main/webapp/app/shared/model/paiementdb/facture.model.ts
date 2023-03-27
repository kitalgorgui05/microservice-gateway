import { Moment } from 'moment';

export interface IFacture {
  id?: number;
  date?: Moment;
  code?: string;
  paiee?: string;
  idEleve?: string;
  moisId?: number;
  paiementId?: number;
}

export class Facture implements IFacture {
  constructor(
    public id?: number,
    public date?: Moment,
    public code?: string,
    public paiee?: string,
    public idEleve?: string,
    public moisId?: number,
    public paiementId?: number
  ) {}
}
