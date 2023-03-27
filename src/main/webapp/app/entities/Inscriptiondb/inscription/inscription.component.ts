import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInscription } from 'app/shared/model/Inscriptiondb/inscription.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { InscriptionService } from './inscription.service';
import { InscriptionDeleteDialogComponent } from './inscription-delete-dialog.component';
import {TuteurService} from "../tuteur/tuteur.service";
import {FormBuilder} from "@angular/forms";
import {AnneeService} from "../annee/annee.service";
import {Annee} from "../../../shared/model/Inscriptiondb/annee.model";
import {ClasseService} from "../../classe1/classe/classe.service";
import {Classe} from "../../../shared/model/classe1/classe.model";

@Component({
  selector: 'jhi-inscription',
  templateUrl: './inscription.component.html',
})
export class InscriptionComponent implements OnInit, OnDestroy {
  inscriptions?: IInscription[];
  classes?: Classe[] | null;
  annees?: Annee[] | null;
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  filtreData = this.fb.group({
    classe: [],
    annee: [],
  });
  constructor(
    protected inscriptionService: InscriptionService,
    protected tuteur:TuteurService,
    protected anneeService : AnneeService,
    protected classeService : ClasseService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.inscriptionService
      .query(this.filtreData.value, {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IInscription[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }


  ngOnInit(): void {
    this.listAllClasses();
    this.listAllAnnees();

  }
  public listAllClasses():any{
    return this.classeService.query().subscribe(
      {
        next:(data)=>{
          this.classes=data.body;
        }
      }
    )
  }
 public listAllAnnees():any{
    this.anneeService.query().subscribe(
      {
        next:(data)=>{
          this.annees=data.body;
        }
      }
    )
  }
  public afficher(): void {
    this.handleNavigation();
    // this.registerChangeInInscriptions();
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
       /*  alert(JSON.stringify(this.filtreData.value)) */
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInscription): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInscriptions(): void {
    this.eventSubscriber = this.eventManager.subscribe('inscriptionListModification', () => this.loadPage());
  }

  delete(inscription: IInscription): void {
    const modalRef = this.modalService.open(InscriptionDeleteDialogComponent, { size: 'sm', backdrop: 'static' });
    modalRef.componentInstance.inscription = inscription;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IInscription[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/inscription'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.inscriptions = data || [];
    this.ngbPaginationPage = this.page;
  }
  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
