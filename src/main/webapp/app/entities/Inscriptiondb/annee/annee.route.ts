import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAnnee, Annee } from 'app/shared/model/Inscriptiondb/annee.model';
import { AnneeService } from './annee.service';
import { AnneeComponent } from './annee.component';
import { AnneeDetailComponent } from './annee-detail.component';
import { AnneeUpdateComponent } from './annee-update.component';

@Injectable({ providedIn: 'root' })
export class AnneeResolve implements Resolve<IAnnee> {
  constructor(private service: AnneeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnnee> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((annee: HttpResponse<Annee>) => {
          if (annee.body) {
            return of(annee.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Annee());
  }
}

export const anneeRoute: Routes = [
  {
    path: '',
    component: AnneeComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.inscriptiondbAnnee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AnneeDetailComponent,
    resolve: {
      annee: AnneeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptiondbAnnee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AnneeUpdateComponent,
    resolve: {
      annee: AnneeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptiondbAnnee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AnneeUpdateComponent,
    resolve: {
      annee: AnneeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptiondbAnnee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
