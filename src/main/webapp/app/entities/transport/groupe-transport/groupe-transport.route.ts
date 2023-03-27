import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGroupeTransport, GroupeTransport } from 'app/shared/model/transport/groupe-transport.model';
import { GroupeTransportService } from './groupe-transport.service';
import { GroupeTransportComponent } from './groupe-transport.component';
import { GroupeTransportDetailComponent } from './groupe-transport-detail.component';
import { GroupeTransportUpdateComponent } from './groupe-transport-update.component';

@Injectable({ providedIn: 'root' })
export class GroupeTransportResolve implements Resolve<IGroupeTransport> {
  constructor(private service: GroupeTransportService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGroupeTransport> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((groupeTransport: HttpResponse<GroupeTransport>) => {
          if (groupeTransport.body) {
            return of(groupeTransport.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GroupeTransport());
  }
}

export const groupeTransportRoute: Routes = [
  {
    path: '',
    component: GroupeTransportComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.transportGroupeTransport.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GroupeTransportDetailComponent,
    resolve: {
      groupeTransport: GroupeTransportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportGroupeTransport.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GroupeTransportUpdateComponent,
    resolve: {
      groupeTransport: GroupeTransportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportGroupeTransport.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GroupeTransportUpdateComponent,
    resolve: {
      groupeTransport: GroupeTransportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportGroupeTransport.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
