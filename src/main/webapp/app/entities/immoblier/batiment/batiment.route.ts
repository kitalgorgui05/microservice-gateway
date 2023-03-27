import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBatiment, Batiment } from 'app/shared/model/immoblier/batiment.model';
import { BatimentService } from './batiment.service';
import { BatimentComponent } from './batiment.component';
import { BatimentDetailComponent } from './batiment-detail.component';
import { BatimentUpdateComponent } from './batiment-update.component';

@Injectable({ providedIn: 'root' })
export class BatimentResolve implements Resolve<IBatiment> {
  constructor(private service: BatimentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBatiment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((batiment: HttpResponse<Batiment>) => {
          if (batiment.body) {
            return of(batiment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Batiment());
  }
}

export const batimentRoute: Routes = [
  {
    path: '',
    component: BatimentComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.immoblierBatiment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BatimentDetailComponent,
    resolve: {
      batiment: BatimentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.immoblierBatiment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BatimentUpdateComponent,
    resolve: {
      batiment: BatimentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.immoblierBatiment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BatimentUpdateComponent,
    resolve: {
      batiment: BatimentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.immoblierBatiment.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
