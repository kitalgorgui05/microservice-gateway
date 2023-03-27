import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBus, Bus } from 'app/shared/model/transport/bus.model';
import { BusService } from './bus.service';
import { BusComponent } from './bus.component';
import { BusDetailComponent } from './bus-detail.component';
import { BusUpdateComponent } from './bus-update.component';

@Injectable({ providedIn: 'root' })
export class BusResolve implements Resolve<IBus> {
  constructor(private service: BusService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBus> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bus: HttpResponse<Bus>) => {
          if (bus.body) {
            return of(bus.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bus());
  }
}

export const busRoute: Routes = [
  {
    path: '',
    component: BusComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.transportBus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BusDetailComponent,
    resolve: {
      bus: BusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportBus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BusUpdateComponent,
    resolve: {
      bus: BusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportBus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BusUpdateComponent,
    resolve: {
      bus: BusResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportBus.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
