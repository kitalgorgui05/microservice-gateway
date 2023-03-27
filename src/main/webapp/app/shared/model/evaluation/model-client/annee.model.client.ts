export interface IAnneeModelClient {
  id?:string;
  nom?:string;
}
export class AnneeModelClient implements IAnneeModelClient{
  constructor(
    public id?:string,
    public nom?:string
  ) {
  }
}
