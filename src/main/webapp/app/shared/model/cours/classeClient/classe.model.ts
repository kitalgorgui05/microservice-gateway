export interface IClasseModel {
   id?:string;
   nom?:string;
}
export class ClasseModel implements IClasseModel{
    constructor(public id?:string, public nom?:string) {
    }
}
