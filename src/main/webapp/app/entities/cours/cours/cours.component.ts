import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICours } from 'app/shared/model/cours/cours.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CoursService } from './cours.service';
import { CoursDeleteDialogComponent } from './cours-delete-dialog.component';
import {INiveauModel} from "../../../shared/model/cours/classeClient/niveau.model";
import {IClasseModel} from "../../../shared/model/cours/classeClient/classe.model";
import {IMatiereModel} from "../../../shared/model/cours/classeClient/matiere.model";
import {IAnneeModel} from "../../../shared/model/cours/classeClient/annee.model";

@Component({
  selector: 'jhi-cours',
  templateUrl: './cours.component.html'
})
export class CoursComponent implements OnInit, OnDestroy {
  cours?: ICours[];

  niveaus?: INiveauModel[];
  classes?: IClasseModel[];
  matieres?: IMatiereModel[];
  annees?: IAnneeModel[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected coursService: CoursService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.coursService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ICours[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInCours();
    this.getNiveaus();
    this.getClasses();
    this.getMatieres();
    this.getAnnees();
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
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }

  }

  trackId(index: number, item: ICours): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCours(): void {
    this.eventSubscriber = this.eventManager.subscribe('coursListModification', () => this.loadPage());
  }

  delete(cours: ICours): void {
    const modalRef = this.modalService.open(CoursDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cours = cours;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ICours[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/cours'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.cours = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  getNiveaus():any{
    return this.coursService.getAllNiveau().subscribe({
      next:(data)=>{
        this.niveaus=data;
      }
    })
  }

  getClasses():any{
    return this.coursService.getClasses().subscribe({
      next:(data)=>{
        this.classes=data;
      }
    })
  }

  getMatieres():any{
    return this.coursService.getMatieres().subscribe({
      next:(data)=>{
        this.matieres=data;
      }
    })
  }
  getAnnees():any{
    return this.coursService.getAnnees().subscribe({
      next:(data)=>{
        this.annees=data;
      }
    })
  }
}
