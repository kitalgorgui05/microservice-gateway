export interface IAnneeModel {
   id ?:string;
   nom?:string;
}
export class AnneeModel implements IAnneeModel{
  constructor(public id?:string, public nom?:string) {
  }
}
