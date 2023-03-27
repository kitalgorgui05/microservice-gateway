import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEvaluation } from 'app/shared/model/evaluation/evaluation.model';

type EntityResponseType = HttpResponse<IEvaluation>;
type EntityArrayResponseType = HttpResponse<IEvaluation[]>;

@Injectable({ providedIn: 'root' })
export class EvaluationService {
  public resourceUrl = SERVER_API_URL + 'services/evaluation/api/evaluations';

  constructor(protected http: HttpClient) {}

  create(evaluation: IEvaluation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(evaluation);
    return this.http
      .post<IEvaluation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(evaluation: IEvaluation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(evaluation);
    return this.http
      .put<IEvaluation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEvaluation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEvaluation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(evaluation: IEvaluation): IEvaluation {
    const copy: IEvaluation = Object.assign({}, evaluation, {
      dateEvaluation: evaluation.dateEvaluation && evaluation.dateEvaluation.isValid() ? evaluation.dateEvaluation.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateEvaluation = res.body.dateEvaluation ? moment(res.body.dateEvaluation) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((evaluation: IEvaluation) => {
        evaluation.dateEvaluation = evaluation.dateEvaluation ? moment(evaluation.dateEvaluation) : undefined;
      });
    }
    return res;
  }
}
