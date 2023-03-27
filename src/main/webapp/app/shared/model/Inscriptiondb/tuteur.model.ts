import { Sexe } from 'app/shared/model/enumerations/sexe.model';

export interface ITuteur {
  id?: number;
  prenom?: string;
  nom?: string;
  adresse?: any;
  email?: string;
  sexe?: Sexe;
}

export class Tuteur implements ITuteur {
  constructor(
    public id?: number,
    public prenom?: string,
    public nom?: string,
    public adresse?: any,
    public email?: string,
    public sexe?: Sexe
  ) {}
}
