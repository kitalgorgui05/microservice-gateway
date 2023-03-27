export interface IMatiereModel {
   id?: number;
    nom?: string;
}
export class MatierModel implements IMatiereModel{
  constructor(
    public id?: number,
    public nom?: string
  ) {
  }
}
