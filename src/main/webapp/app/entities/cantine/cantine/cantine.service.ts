import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICantine } from 'app/shared/model/cantine/cantine.model';

type EntityResponseType = HttpResponse<ICantine>;
type EntityArrayResponseType = HttpResponse<ICantine[]>;

@Injectable({ providedIn: 'root' })
export class CantineService {
  public resourceUrl = SERVER_API_URL + 'services/cantine/api/cantines';

  constructor(protected http: HttpClient) {}

  create(cantine: ICantine): Observable<EntityResponseType> {
    return this.http.post<ICantine>(this.resourceUrl, cantine, { observe: 'response' });
  }

  update(cantine: ICantine): Observable<EntityResponseType> {
    return this.http.put<ICantine>(this.resourceUrl, cantine, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICantine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICantine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
