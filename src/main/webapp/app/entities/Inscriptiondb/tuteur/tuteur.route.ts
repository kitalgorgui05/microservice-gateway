import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITuteur, Tuteur } from 'app/shared/model/Inscriptiondb/tuteur.model';
import { TuteurService } from './tuteur.service';
import { TuteurComponent } from './tuteur.component';
import { TuteurDetailComponent } from './tuteur-detail.component';
import { TuteurUpdateComponent } from './tuteur-update.component';

@Injectable({ providedIn: 'root' })
export class TuteurResolve implements Resolve<ITuteur> {
  constructor(private service: TuteurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITuteur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tuteur: HttpResponse<Tuteur>) => {
          if (tuteur.body) {
            return of(tuteur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tuteur());
  }
}

export const tuteurRoute: Routes = [
  {
    path: '',
    component: TuteurComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.inscriptiondbTuteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TuteurDetailComponent,
    resolve: {
      tuteur: TuteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptiondbTuteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TuteurUpdateComponent,
    resolve: {
      tuteur: TuteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptiondbTuteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TuteurUpdateComponent,
    resolve: {
      tuteur: TuteurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptiondbTuteur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
