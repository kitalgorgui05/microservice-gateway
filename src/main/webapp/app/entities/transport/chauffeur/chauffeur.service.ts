import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IChauffeur } from 'app/shared/model/transport/chauffeur.model';

type EntityResponseType = HttpResponse<IChauffeur>;
type EntityArrayResponseType = HttpResponse<IChauffeur[]>;

@Injectable({ providedIn: 'root' })
export class ChauffeurService {
  public resourceUrl = SERVER_API_URL + 'services/transport/api/chauffeurs';

  constructor(protected http: HttpClient) {}

  create(chauffeur: IChauffeur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chauffeur);
    return this.http
      .post<IChauffeur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chauffeur: IChauffeur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chauffeur);
    return this.http
      .put<IChauffeur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IChauffeur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getNomChauffeur(id:string):Observable<string>{
    return this.http
      .get<string>(`${this.resourceUrl}/nom/${id}`);
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChauffeur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(chauffeur: IChauffeur): IChauffeur {
    const copy: IChauffeur = Object.assign({}, chauffeur, {
      dateNaissance: chauffeur.dateNaissance && chauffeur.dateNaissance.isValid() ? chauffeur.dateNaissance.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance ? moment(res.body.dateNaissance) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((chauffeur: IChauffeur) => {
        chauffeur.dateNaissance = chauffeur.dateNaissance ? moment(chauffeur.dateNaissance) : undefined;
      });
    }
    return res;
  }
}
