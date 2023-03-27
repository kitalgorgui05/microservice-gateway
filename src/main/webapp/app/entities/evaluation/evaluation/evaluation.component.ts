import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEvaluation } from 'app/shared/model/evaluation/evaluation.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EvaluationService } from './evaluation.service';
import { EvaluationDeleteDialogComponent } from './evaluation-delete-dialog.component';
import {ClasseService} from "../../classe1/classe/classe.service";
import {MatiereService} from "../../classe1/matiere/matiere.service";
import {IClasse} from "../../../shared/model/classe1/classe.model";
import {IMatiere} from "../../../shared/model/classe1/matiere.model";

@Component({
  selector: 'jhi-evaluation',
  templateUrl: './evaluation.component.html',
})
export class EvaluationComponent implements OnInit, OnDestroy {
  evaluations?: IEvaluation[];
  classes?: IClasse[]|null;
  matieres?: IMatiere[] |null;
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected evaluationService: EvaluationService,
    protected matiereService: MatiereService,
    protected classeService: ClasseService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.evaluationService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IEvaluation[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInEvaluations();
    this.classeService.query().subscribe((res: HttpResponse<IClasse[]>) => (this.classes = res.body || []));
    this.matiereService.query().subscribe((res: HttpResponse<IMatiere[]>) => (this.matieres = res.body || []));
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

  trackId(index: number, item: IEvaluation): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEvaluations(): void {
    this.eventSubscriber = this.eventManager.subscribe('evaluationListModification', () => this.loadPage());
  }

  delete(evaluation: IEvaluation): void {
    const modalRef = this.modalService.open(EvaluationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.evaluation = evaluation;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IEvaluation[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/evaluation'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.evaluations = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
