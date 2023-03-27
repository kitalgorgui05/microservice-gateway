import {ICantine} from "./cantine.model";

export interface IGroupeCantine {
  id?: number;
  nom?: string;
  nombreEleves?: number;
  cantine?: ICantine;
}

export class GroupeCantine implements IGroupeCantine {
  constructor(public id?: number, public nom?: string, public nombreEleves?: number, public cantine?: ICantine) {}
}
