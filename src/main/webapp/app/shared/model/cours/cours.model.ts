import {IClasseModel} from "app/shared/model/cours/classeClient/classe.model";
import {IAnneeModel} from "app/shared/model/cours/classeClient/annee.model";
import {IMatiereModel} from "app/shared/model/cours/classeClient/matiere.model";
import {IEnseignant} from "app/shared/model/cours/enseignant.model";
import {IHoraire} from "app/shared/model/cours/horaire.model";

export interface ICours {
  id?:string;
  idMatiere?:string;
  matiereClient?:IMatiereModel;
  idClasse?:string;
  classeClient?:IClasseModel;
  idAnnee?:string;
  anneeClient?:IAnneeModel;
  enseignant?:IEnseignant;
  horaire?:IHoraire;
}

export class Cours implements ICours {
  constructor(
      public id?:string,
      public idMatiere?:string,
      public matiereClient?:IMatiereModel,
      public idClasse?:string,
      public classeClient?:IClasseModel,
      public idAnnee?:string,
      public anneeClient?:IAnneeModel,
      public enseignant?:IEnseignant,
      public horaire?:IHoraire
  ) {}
}
