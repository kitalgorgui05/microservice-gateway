import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInscription } from 'app/shared/model/Inscriptiondb/inscription.model';

type EntityResponseType = HttpResponse<IInscription>;
type EntityArrayResponseType = HttpResponse<IInscription[]>;

@Injectable({ providedIn: 'root' })
export class InscriptionService {
  public resourceUrl = SERVER_API_URL + 'services/inscriptiondb/api/inscriptions';

  constructor(protected http: HttpClient) {}

  create(inscription: IInscription): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscription);
    return this.http
      .post<IInscription>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(inscription: IInscription): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(inscription);
    return this.http
      .put<IInscription>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInscription>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }


  countInscrit():Observable<number>{
    return this.http.get<number>(`${this.resourceUrl}/count`);
  }
  query(filterData: any, req?: any): Observable<EntityArrayResponseType> {
    let options = createRequestOption(req);

    if(filterData?.classe) {
      options = options.append('classe.equals', filterData?.classe);
    }
    if(filterData?.annee) {
      options = options.append('anneeId.equals', filterData?.annee);
    }
    return this.http
      .get<IInscription[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(inscription: IInscription): IInscription {
    const copy: IInscription = Object.assign({}, inscription, {
      dateInscription:
        inscription.dateInscription && inscription.dateInscription.isValid() ? inscription.dateInscription.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateInscription = res.body.dateInscription ? moment(res.body.dateInscription) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((inscription: IInscription) => {
        inscription.dateInscription = inscription.dateInscription ? moment(inscription.dateInscription) : undefined;
      });
    }
    return res;
  }
}
