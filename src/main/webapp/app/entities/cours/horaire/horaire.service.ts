import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHoraire } from 'app/shared/model/cours/horaire.model';

type EntityResponseType = HttpResponse<IHoraire>;
type EntityArrayResponseType = HttpResponse<IHoraire[]>;

@Injectable({ providedIn: 'root' })
export class HoraireService {
  public resourceUrl = SERVER_API_URL + 'services/cours/api/horaires';

  constructor(protected http: HttpClient) {}

  create(horaire: IHoraire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horaire);
    return this.http
      .post<IHoraire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(horaire: IHoraire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(horaire);
    return this.http
      .put<IHoraire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHoraire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHoraire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(horaire: IHoraire): IHoraire {
    const copy: IHoraire = Object.assign({}, horaire, {
      heurDebut: horaire.heurDedut && horaire.heurDedut.isValid() ? horaire.heurDedut.toJSON() : undefined,
      heurFin: horaire.heurFin && horaire.heurFin.isValid() ? horaire.heurFin.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.heurDedut = res.body.heurDedut ? moment(res.body.heurDedut) : undefined;
      res.body.heurFin = res.body.heurFin ? moment(res.body.heurFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((horaire: IHoraire) => {
        horaire.heurDedut = horaire.heurDedut ? moment(horaire.heurDedut) : undefined;
        horaire.heurFin = horaire.heurFin ? moment(horaire.heurFin) : undefined;
      });
    }
    return res;
  }
}
