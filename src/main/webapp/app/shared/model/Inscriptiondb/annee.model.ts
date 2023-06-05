import { Moment } from 'moment';

export interface IAnnee {
  id?: number;
  nom?: string;
  dateDebut?: Moment;
  dateFin?: Moment;
}

export class Annee implements IAnnee {
  constructor(
    public id?: number,
    public nom?: string,
    public dateDebut?: Moment,
    public dateFin?: Moment
  ) {}
}
