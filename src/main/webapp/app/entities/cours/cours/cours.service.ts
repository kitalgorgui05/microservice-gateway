import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICours } from 'app/shared/model/cours/cours.model';
import {INiveauModel} from "../../../shared/model/cours/classeClient/niveau.model";
import {IClasseModel} from "../../../shared/model/cours/classeClient/classe.model";
import {IMatiereModel} from "../../../shared/model/cours/classeClient/matiere.model";
import {IAnneeModel} from "../../../shared/model/cours/classeClient/annee.model";

type EntityResponseType = HttpResponse<ICours>;
type EntityArrayResponseType = HttpResponse<ICours[]>;

@Injectable({ providedIn: 'root' })
export class CoursService {
  public resourceUrl = SERVER_API_URL + 'services/cours/api/cours';

  constructor(protected http: HttpClient) {}

  create(cours: ICours): Observable<EntityResponseType> {
    return this.http.post<ICours>(this.resourceUrl, cours, { observe: 'response' });
  }

  update(cours: ICours): Observable<EntityResponseType> {
    return this.http.put<ICours>(this.resourceUrl, cours, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICours>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICours[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
getAllNiveau():Observable<INiveauModel[]> {
    return this.http.get<INiveauModel[]>(`${this.resourceUrl}/niveaus`)
}
getClasses():Observable<IClasseModel[]> {
    return this.http.get<IClasseModel[]>(`${this.resourceUrl}/classes`)
  }

  getMatieres():Observable<IMatiereModel[]> {
    return this.http.get<IClasseModel[]>(`${this.resourceUrl}/matieres`)
  }
  getAnnees():Observable<IAnneeModel[]> {
    return this.http.get<IAnneeModel[]>(`${this.resourceUrl}/annees`)
  }

  getClasseByNiveauId( id:string):Observable<IClasseModel[]> {
    return this.http.get<IClasseModel[]>(`${this.resourceUrl}/classe/niveaus/${id}`);
  }
}
