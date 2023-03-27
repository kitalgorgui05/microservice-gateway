import {IMatiereModel} from "./matiere.model";

export interface INiveauModel {
  id: string
  nom: string
  matieres: IMatiereModel[]
}

export class NiveauModel implements INiveauModel{
  constructor(public id:string, public nom:string,public matieres:IMatiereModel[]) {
  }
}
