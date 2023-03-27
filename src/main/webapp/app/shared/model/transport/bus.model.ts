import {IChauffeur} from "./chauffeur.model";

export interface IBus {
  id?: number;
  matricule?: string;
  numero?: string;
  nombreplace?: number;
  chauffeur?: IChauffeur;
}

export class Bus implements IBus {
  constructor(
    public id?: number,
    public matricule?: string,
    public numero?: string,
    public nombreplace?: number,
    public chauffeur?: IChauffeur
  ) {}
}
