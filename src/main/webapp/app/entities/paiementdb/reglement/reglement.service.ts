import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReglement } from 'app/shared/model/paiementdb/reglement.model';

type EntityResponseType = HttpResponse<IReglement>;
type EntityArrayResponseType = HttpResponse<IReglement[]>;

@Injectable({ providedIn: 'root' })
export class ReglementService {
  public resourceUrl = SERVER_API_URL + 'services/paiementdb/api/reglements';

  constructor(protected http: HttpClient) {}

  create(reglement: IReglement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reglement);
    return this.http
      .post<IReglement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(reglement: IReglement): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(reglement);
    return this.http
      .put<IReglement>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReglement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReglement[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(reglement: IReglement): IReglement {
    const copy: IReglement = Object.assign({}, reglement, {
      date: reglement.date && reglement.date.isValid() ? reglement.date.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((reglement: IReglement) => {
        reglement.date = reglement.date ? moment(reglement.date) : undefined;
      });
    }
    return res;
  }
}
