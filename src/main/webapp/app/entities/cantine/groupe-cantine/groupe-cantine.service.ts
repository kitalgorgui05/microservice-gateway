import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGroupeCantine } from 'app/shared/model/cantine/groupe-cantine.model';

type EntityResponseType = HttpResponse<IGroupeCantine>;
type EntityArrayResponseType = HttpResponse<IGroupeCantine[]>;

@Injectable({ providedIn: 'root' })
export class GroupeCantineService {
  public resourceUrl = SERVER_API_URL + 'services/cantine/api/groupe-cantines';

  constructor(protected http: HttpClient) {}

  create(groupeCantine: IGroupeCantine): Observable<EntityResponseType> {
    return this.http.post<IGroupeCantine>(this.resourceUrl, groupeCantine, { observe: 'response' });
  }

  update(groupeCantine: IGroupeCantine): Observable<EntityResponseType> {
    return this.http.put<IGroupeCantine>(this.resourceUrl, groupeCantine, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroupeCantine>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroupeCantine[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
