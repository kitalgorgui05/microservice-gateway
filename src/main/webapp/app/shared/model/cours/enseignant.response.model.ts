export interface IEnseignantResponseModel{
  id?: number;
  nom?: string;
  prenom?: string;
  adresse?: any;
  telephone?: string;
}
export class EnseignantResponseModel implements IEnseignantResponseModel{
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public adresse?: any,
    public telephone?: string
  ) {
  }
}
