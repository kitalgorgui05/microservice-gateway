import { ICours } from 'app/shared/model/cours/cours.model';

export interface IEnseignant {
  id?: number;
  nom?: string;
  prenom?: string;
  adresse?: any;
  telephone?: string;
  email?: string;
  cours?: ICours[];
}

export class Enseignant implements IEnseignant {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public adresse?: any,
    public telephone?: string,
    public email?: string,
    public cours?: ICours[]
  ) {}
}
