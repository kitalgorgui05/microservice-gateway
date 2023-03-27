import { IUtilisateur } from 'app/shared/model/utilisateur/utilisateur.model';

export interface IProfileUtil {
  id?: number;
  libelle?: string;
  description?: any;
  utilisateurs?: IUtilisateur[];
}

export class ProfileUtil implements IProfileUtil {
  constructor(public id?: number, public libelle?: string, public description?: any, public utilisateurs?: IUtilisateur[]) {}
}
