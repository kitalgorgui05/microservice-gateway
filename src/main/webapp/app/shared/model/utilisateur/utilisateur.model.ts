import { IProfileUtil } from 'app/shared/model/utilisateur/profile-util.model';
import { Sexe } from 'app/shared/model/enumerations/sexe.model';

export interface IUtilisateur {
  id?: number;
  nom?: string;
  prenom?: string;
  sexe?: Sexe;
  telephone?: string;
  adresse?: any;
  cin?: string;
  email?: string;
  password?: string;
  serviceUtilId?: number;
  profiles?: IProfileUtil[];
}

export class Utilisateur implements IUtilisateur {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public sexe?: Sexe,
    public telephone?: string,
    public adresse?: any,
    public cin?: string,
    public email?: string,
    public password?: string,
    public serviceUtilId?: number,
    public profiles?: IProfileUtil[]
  ) {}
}
