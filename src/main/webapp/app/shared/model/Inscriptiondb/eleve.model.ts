import { Moment } from 'moment';
import { Sexe } from 'app/shared/model/enumerations/sexe.model';
import {ITuteur} from "app/shared/model/Inscriptiondb/tuteur.model";

export interface IEleve {
  id?: number;
  photoContentType?: string;
  photo?: any;
  matricule?: string;
  prenom?: string;
  nom?: string;
  sexe?: Sexe;
  adresse?: any;
  telephone?: string;
  email?: string;
  dateNaissance?: Moment;
  lieuNaissance?: string;
  tuteur?: ITuteur;
}

export class Eleve implements IEleve {
  constructor(
    public id?: number,
    public photoContentType?: string,
    public photo?: any,
    public matricule?: string,
    public prenom?: string,
    public nom?: string,
    public sexe?: Sexe,
    public adresse?: any,
    public telephone?: string,
    public email?: string,
    public dateNaissance?: Moment,
    public lieuNaissance?: string,
    public tuteur?: ITuteur
  ) {}
}
