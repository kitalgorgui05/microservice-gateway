export interface IEleveModelClient {
  id?:String;
  prenom?:String;
  nom?:String;
}
export class EleveModelClient implements IEleveModelClient{
  constructor(
    public id?:String,
    public prenom?:String,
    public nom?:String
  ) {
  }
}
