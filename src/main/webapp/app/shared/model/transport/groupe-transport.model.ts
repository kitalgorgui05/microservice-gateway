import { IZone } from 'app/shared/model/transport/zone.model';

export interface IGroupeTransport {
  id?: number;
  nom?: string;
  nombreEleves?: number;
  zones?: IZone[];
}

export class GroupeTransport implements IGroupeTransport {
  constructor(public id?: number, public nom?: string, public nombreEleves?: number, public zones?: IZone[]) {
  }
}
