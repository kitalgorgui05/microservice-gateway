export interface IServiceUtil {
  id?: number;
  code?: string;
  libelle?: string;
  description?: any;
}

export class ServiceUtil implements IServiceUtil {
  constructor(public id?: number, public code?: string, public libelle?: string, public description?: any) {}
}
