import { Moment } from 'moment';
import { ICours } from 'app/shared/model/cours/cours.model';

export interface IHoraire {
  id?: number;
  heurDedut?:Moment;

  heurFin?:Moment;

  cours?: ICours[];
}

export class Horaire implements IHoraire {
  constructor(
    public id?: number,
    public heurDedut?:Moment,
    public heurFin?:Moment,
    public cours?: ICours[]) {}
}
