import { INiveau } from 'app/shared/model/classe1/niveau.model';

export interface IMatiere {
  id?: number;
  nom?: string;
  niveaus?: INiveau[];
}

export class Matiere implements IMatiere {
  constructor(public id?: number, public nom?: string, public niveaus?: INiveau[]) {}
}
