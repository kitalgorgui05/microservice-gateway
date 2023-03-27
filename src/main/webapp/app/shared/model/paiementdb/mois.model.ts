import { IFacture } from 'app/shared/model/paiementdb/facture.model';

export interface IMois {
  id?: number;
  nom?: string;
  factures?: IFacture[];
}

export class Mois implements IMois {
  constructor(public id?: number, public nom?: string, public factures?: IFacture[]) {}
}
