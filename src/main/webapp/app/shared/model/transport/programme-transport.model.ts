import { Moment } from 'moment';
import {IBus} from "./bus.model";
import {IGroupeTransport} from "./groupe-transport.model";

export interface IProgrammeTransport {
  id?: number;
  heurDepart?: Moment;
  dateDepart?: Moment;
  groupeTransport?: IGroupeTransport;
  bus?: IBus;
}

export class ProgrammeTransport implements IProgrammeTransport {
  constructor(
    public id?: number,
    public heurDepart?: Moment,
    public dateDepart?: Moment,
    public groupeTransportId?: IGroupeTransport,
    public busId?: IBus
  ) {}
}
