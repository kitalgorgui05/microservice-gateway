import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrimestre } from 'app/shared/model/evaluation/trimestre.model';
import {IAnneeModelClient} from "../../../shared/model/evaluation/model-client/annee.model.client";

type EntityResponseType = HttpResponse<ITrimestre>;
type EntityArrayResponseType = HttpResponse<ITrimestre[]>;

@Injectable({ providedIn: 'root' })
export class TrimestreService {
  public resourceUrl = SERVER_API_URL + 'services/evaluation/api/trimestres';

  constructor(protected http: HttpClient) {}

  create(trimestre: ITrimestre): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trimestre);
    return this.http
      .post<ITrimestre>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(trimestre: ITrimestre): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trimestre);
    return this.http
      .put<ITrimestre>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITrimestre>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITrimestre[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  getAnnees(): Observable<IAnneeModelClient[]> {
    return this.http.get<IAnneeModelClient[]>(`${this.resourceUrl}/annees`)
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(trimestre: ITrimestre): ITrimestre {
    const copy: ITrimestre = Object.assign({}, trimestre, {
      dateDebut: trimestre.dateDebut && trimestre.dateDebut.isValid() ? trimestre.dateDebut.format(DATE_FORMAT) : undefined,
      dateFin: trimestre.dateFin && trimestre.dateFin.isValid() ? trimestre.dateFin.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.dateFin = res.body.dateFin ? moment(res.body.dateFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((trimestre: ITrimestre) => {
        trimestre.dateDebut = trimestre.dateDebut ? moment(trimestre.dateDebut) : undefined;
        trimestre.dateFin = trimestre.dateFin ? moment(trimestre.dateFin) : undefined;
      });
    }
    return res;
  }
}
