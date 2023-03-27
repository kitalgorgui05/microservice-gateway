import {ICoursResponseModel} from "app/shared/model/cours/cours.response.model";
import {IEleveModel} from "app/shared/model/cours/classeClient/eleve.model";

export interface IAbsence {
  id?:string;
  idEleve?:string;
  eleveClient?:IEleveModel;
  motif?:any;
  etat?:boolean;
  cours?:ICoursResponseModel;
}

export class Absence implements IAbsence {
  constructor(
    public id?:string,
    public idEleve?:string,
    public eleveClient?:IEleveModel,
    public motif?:any,
    public etat?:boolean,
    public cours?:ICoursResponseModel,
  )
  {
    this.etat = this.etat || false;
  }
}
