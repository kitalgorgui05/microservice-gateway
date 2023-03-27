import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProgrammeTransport, ProgrammeTransport } from 'app/shared/model/transport/programme-transport.model';
import { ProgrammeTransportService } from './programme-transport.service';
import { ProgrammeTransportComponent } from './programme-transport.component';
import { ProgrammeTransportDetailComponent } from './programme-transport-detail.component';
import { ProgrammeTransportUpdateComponent } from './programme-transport-update.component';

@Injectable({ providedIn: 'root' })
export class ProgrammeTransportResolve implements Resolve<IProgrammeTransport> {
  constructor(private service: ProgrammeTransportService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProgrammeTransport> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((programmeTransport: HttpResponse<ProgrammeTransport>) => {
          if (programmeTransport.body) {
            return of(programmeTransport.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProgrammeTransport());
  }
}

export const programmeTransportRoute: Routes = [
  {
    path: '',
    component: ProgrammeTransportComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.transportProgrammeTransport.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProgrammeTransportDetailComponent,
    resolve: {
      programmeTransport: ProgrammeTransportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportProgrammeTransport.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProgrammeTransportUpdateComponent,
    resolve: {
      programmeTransport: ProgrammeTransportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportProgrammeTransport.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProgrammeTransportUpdateComponent,
    resolve: {
      programmeTransport: ProgrammeTransportResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportProgrammeTransport.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
