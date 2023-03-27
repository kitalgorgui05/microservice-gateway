export interface IEleveModel{
  id?:string;
  prenom?:string;
  nom?:string;
}
export class EleveModel implements IEleveModel{
  constructor(public id?:string, public prenom?:string, public nom?:string) {
  }
}
