export interface INiveauModel {
  id?:string;
  nom?:string;

}
export class NiveauModel implements INiveauModel{
  constructor(
    public id?:string,
    public nom?:string,
  ) {
  }
}
