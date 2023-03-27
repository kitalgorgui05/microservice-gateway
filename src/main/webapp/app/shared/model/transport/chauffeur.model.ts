import { Moment } from 'moment';

export interface IChauffeur {
  id?: number;
  prenom?: string;
  nom?: string;
  dateNaissance?: Moment;
  lieuNaissance?: string;
  cin?: string;
  telephone?: string;
  adresse?: any;
}

export class Chauffeur implements IChauffeur {
  constructor(
    public id?: number,
    public prenom?: string,
    public nom?: string,
    public dateNaissance?: Moment,
    public lieuNaissance?: string,
    public cin?: string,
    public telephone?: string,
    public adresse?: any
  ) {}
}
