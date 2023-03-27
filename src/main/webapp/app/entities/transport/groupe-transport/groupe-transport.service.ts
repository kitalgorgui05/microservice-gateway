import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGroupeTransport } from 'app/shared/model/transport/groupe-transport.model';

type EntityResponseType = HttpResponse<IGroupeTransport>;
type EntityArrayResponseType = HttpResponse<IGroupeTransport[]>;

@Injectable({ providedIn: 'root' })
export class GroupeTransportService {
  public resourceUrl = SERVER_API_URL + 'services/transport/api/groupe-transports';

  constructor(protected http: HttpClient) {}

  create(groupeTransport: IGroupeTransport): Observable<EntityResponseType> {
    return this.http.post<IGroupeTransport>(this.resourceUrl, groupeTransport, { observe: 'response' });
  }

  update(groupeTransport: IGroupeTransport): Observable<EntityResponseType> {
    return this.http.put<IGroupeTransport>(this.resourceUrl, groupeTransport, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroupeTransport>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroupeTransport[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
