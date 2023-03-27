import {INiveauModel} from "./niveau.model";

export interface IClasseModelIns {
  id?:string;
  nom?:string;
  niveau?:INiveauModel;
}
export class ClasseModel implements IClasseModelIns{
constructor(
  public id?:string,
  public nom?:string,
  public niveau?:INiveauModel,
) {
}
}
