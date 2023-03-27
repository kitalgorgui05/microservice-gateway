export interface IMatiereModel {
  id?:string;
  nom?:string;
}
export class MatiereModel implements IMatiereModel{
  constructor(public id?:string,public nom?:string) {
  }
}
