export interface IClasseModel {
  id?: number;
  nom?: string;
}
export class ClasseMode implements IClasseModel{
  constructor(
    public id?: number,
    public nom?: string
  ) {
  }
}
