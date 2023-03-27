import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAnnee } from 'app/shared/model/Inscriptiondb/annee.model';

type EntityResponseType = HttpResponse<IAnnee>;
type EntityArrayResponseType = HttpResponse<IAnnee[]>;

@Injectable({ providedIn: 'root' })
export class AnneeService {
  public resourceUrl = SERVER_API_URL + 'services/inscriptiondb/api/annees';

  constructor(protected http: HttpClient) {}

  create(annee: IAnnee): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(annee);
    return this.http
      .post<IAnnee>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(annee: IAnnee): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(annee);
    return this.http
      .put<IAnnee>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAnnee>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAnnee[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(annee: IAnnee): IAnnee {
    const copy: IAnnee = Object.assign({}, annee, {
      dateDebut: annee.dateDebut && annee.dateDebut.isValid() ? annee.dateDebut.format(DATE_FORMAT) : undefined,
      dateFin: annee.dateFin && annee.dateFin.isValid() ? annee.dateFin.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((annee: IAnnee) => {
        annee.dateDebut = annee.dateDebut ? moment(annee.dateDebut) : undefined;
        annee.dateFin = annee.dateFin ? moment(annee.dateFin) : undefined;
      });
    }
    return res;
  }
}
