import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChauffeur, Chauffeur } from 'app/shared/model/transport/chauffeur.model';
import { ChauffeurService } from './chauffeur.service';
import { ChauffeurComponent } from './chauffeur.component';
import { ChauffeurDetailComponent } from './chauffeur-detail.component';
import { ChauffeurUpdateComponent } from './chauffeur-update.component';

@Injectable({ providedIn: 'root' })
export class ChauffeurResolve implements Resolve<IChauffeur> {
  constructor(private service: ChauffeurService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChauffeur> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chauffeur: HttpResponse<Chauffeur>) => {
          if (chauffeur.body) {
            return of(chauffeur.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Chauffeur());
  }
}

export const chauffeurRoute: Routes = [
  {
    path: '',
    component: ChauffeurComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'gatewayApp.transportChauffeur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChauffeurDetailComponent,
    resolve: {
      chauffeur: ChauffeurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportChauffeur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChauffeurUpdateComponent,
    resolve: {
      chauffeur: ChauffeurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportChauffeur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChauffeurUpdateComponent,
    resolve: {
      chauffeur: ChauffeurResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.transportChauffeur.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
