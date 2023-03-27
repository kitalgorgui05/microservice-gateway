import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITrimestre, Trimestre } from 'app/shared/model/evaluation/trimestre.model';
import { TrimestreService } from './trimestre.service';
import { TrimestreComponent } from './trimestre.component';
import { TrimestreDetailComponent } from './trimestre-detail.component';
import { TrimestreUpdateComponent } from './trimestre-update.component';

@Injectable({ providedIn: 'root' })
export class TrimestreResolve implements Resolve<ITrimestre> {
  constructor(private service: TrimestreService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrimestre> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((trimestre: HttpResponse<Trimestre>) => {
          if (trimestre.body) {
            return of(trimestre.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Trimestre());
  }
}

export const trimestreRoute: Routes = [
  {
    path: '',
    component: TrimestreComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.evaluationTrimestre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrimestreDetailComponent,
    resolve: {
      trimestre: TrimestreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.evaluationTrimestre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrimestreUpdateComponent,
    resolve: {
      trimestre: TrimestreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.evaluationTrimestre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrimestreUpdateComponent,
    resolve: {
      trimestre: TrimestreResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.evaluationTrimestre.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
