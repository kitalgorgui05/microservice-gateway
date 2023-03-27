import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAbsence } from 'app/shared/model/cours/absence.model';
import {IEleveModel} from "../../../shared/model/cours/classeClient/eleve.model";

type EntityResponseType = HttpResponse<IAbsence>;
type EntityArrayResponseType = HttpResponse<IAbsence[]>;

@Injectable({ providedIn: 'root' })
export class AbsenceService {
  public resourceUrl = SERVER_API_URL + 'services/cours/api/absences';

  constructor(protected http: HttpClient) {}

  create(absence: IAbsence): Observable<EntityResponseType> {
    return this.http.post<IAbsence>(this.resourceUrl, absence, { observe: 'response' });
  }

  update(absence: IAbsence): Observable<EntityResponseType> {
    return this.http.put<IAbsence>(this.resourceUrl, absence, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAbsence>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAbsence[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  getEleves():Observable<IEleveModel[]> {
    return this.http.get<IEleveModel[]>(`${this.resourceUrl}/eleves`)
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
