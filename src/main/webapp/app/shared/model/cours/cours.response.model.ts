import {IMatiereModel} from "./classeClient/matiere.model";
import {IClasseModel} from "./classeClient/classe.model";
import {IAnneeModel} from "./classeClient/annee.model";
import {IEnseignantResponseModel} from "./enseignant.response.model";
import {Horaire} from "./horaire.model";

export interface ICoursResponseModel {
  id?:string;
  matiereClient?:IMatiereModel;
  classeClient?:IClasseModel;
  anneeClient?:IAnneeModel;
  enseignant?:IEnseignantResponseModel;
  horaire?:Horaire;
}

export class CoursResponseModel implements ICoursResponseModel{
  constructor(
    public id?:string,
    public matiereClient?:IMatiereModel,
    public classeClient?:IClasseModel,
    public anneeClient?:IAnneeModel,
    public enseignant?:IEnseignantResponseModel,
    public horaire?:Horaire
  ) {
  }
}
