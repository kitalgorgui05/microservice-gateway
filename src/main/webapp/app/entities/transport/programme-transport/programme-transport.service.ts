import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProgrammeTransport } from 'app/shared/model/transport/programme-transport.model';

type EntityResponseType = HttpResponse<IProgrammeTransport>;
type EntityArrayResponseType = HttpResponse<IProgrammeTransport[]>;

@Injectable({ providedIn: 'root' })
export class ProgrammeTransportService {
  public resourceUrl = SERVER_API_URL + 'services/transport/api/programme-transports';

  constructor(protected http: HttpClient) {}

  create(programmeTransport: IProgrammeTransport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programmeTransport);
    return this.http
      .post<IProgrammeTransport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(programmeTransport: IProgrammeTransport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(programmeTransport);
    return this.http
      .put<IProgrammeTransport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProgrammeTransport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProgrammeTransport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(programmeTransport: IProgrammeTransport): IProgrammeTransport {
    const copy: IProgrammeTransport = Object.assign({}, programmeTransport, {
      heurDepart:
        programmeTransport.heurDepart && programmeTransport.heurDepart.isValid() ? programmeTransport.heurDepart.toJSON() : undefined,
      dateDepart:
        programmeTransport.dateDepart && programmeTransport.dateDepart.isValid()
          ? programmeTransport.dateDepart.format(DATE_FORMAT)
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.heurDepart = res.body.heurDepart ? moment(res.body.heurDepart) : undefined;
      res.body.dateDepart = res.body.dateDepart ? moment(res.body.dateDepart) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((programmeTransport: IProgrammeTransport) => {
        programmeTransport.heurDepart = programmeTransport.heurDepart ? moment(programmeTransport.heurDepart) : undefined;
        programmeTransport.dateDepart = programmeTransport.dateDepart ? moment(programmeTransport.dateDepart) : undefined;
      });
    }
    return res;
  }
}
