export interface IBatiment {
  id?: number;
  nom?: string;
  nombreSalle?: number;
}

export class Batiment implements IBatiment {
  constructor(public id?: number, public nom?: string, public nombreSalle?: number) {}
}
