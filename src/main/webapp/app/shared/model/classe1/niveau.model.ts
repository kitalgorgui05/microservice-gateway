import { IMatiere } from 'app/shared/model/classe1/matiere.model';

export interface INiveau {
  id?: number;
  nom?: string;
  matieres?: IMatiere[];
}

export class Niveau implements INiveau {
  constructor(public id?: number, public nom?: string, public matieres?: IMatiere[]) {}
}
