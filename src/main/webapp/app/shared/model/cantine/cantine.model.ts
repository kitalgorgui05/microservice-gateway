import { IGroupeCantine } from 'app/shared/model/cantine/groupe-cantine.model';

export interface ICantine {
  id?: number;
  libelle?: string;
  nombreGroupe?: number;
  groupecantines?: IGroupeCantine[];
}

export class Cantine implements ICantine {
  constructor(public id?: number, public libelle?: string, public nombreGroupe?: number, public groupecantines?: IGroupeCantine[]) {}
}
