import { IGroupeTransport } from 'app/shared/model/transport/groupe-transport.model';

export interface IZone {
  id?: number;
  libelle?: string;
  description?: any;
  groupetransports?: IGroupeTransport[];
}

export class Zone implements IZone {
  constructor(public id?: number, public libelle?: string, public description?: any, public groupetransports?: IGroupeTransport[]) {}
}
