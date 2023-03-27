export interface BatimentClient{
  id?:string;
  nom?:string;
  nombreSalle?:number;
}

export class Batiment implements BatimentClient{
  constructor(
    public id?:string,
    public nom?:string,
    public nombreSalle?:number
  ) {
  }
}
