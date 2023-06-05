import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IClasse} from "../../../shared/model/classe1/classe.model";
import { IAnnee } from 'app/shared/model/Inscriptiondb/annee.model';
import {HttpResponse} from "@angular/common/http";
import {AnneeService} from "../annee/annee.service";
import {ClasseService} from "../../classe1/classe/classe.service";
import {InscriptionService} from "./inscription.service";
import {FormBuilder, Validators} from "@angular/forms";
import {IInscription, Inscription} from "../../../shared/model/Inscriptiondb/inscription.model";
import {DATE_TIME_FORMAT} from "../../../shared/constants/input.constants";
import * as moment from "moment/moment";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

type SelectableEntity = IClasse;
@Component({
  selector: 'jhi-reinscription-modal',
  templateUrl: './reinscription.component.html',
})

export class ReinscriptionComponent implements OnInit {
  isSaving = false;
  annees: IAnnee[] = [];
  classes: IClasse[] = [];

  editForm = this.fb.group({
    id: [],
    dateInscription: [null, [Validators.required]],
    classe: [null, [Validators.required]],
    transport: [],
    cantine: [],
    annee: []
  });
  constructor(
    public activeModal: NgbActiveModal,
    protected inscriptionService : InscriptionService,
    protected anneeService:AnneeService,
    protected classeService: ClasseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({inscription }) => {
      if (!inscription.id) {
        const today = moment().startOf('day');
        inscription.dateInscription = today;
      }

      this.updateForm(inscription);
      this.anneeService.query().subscribe((res: HttpResponse<IAnnee[]>) => (this.annees = res.body || []));
      this.classeService.query().subscribe((res: HttpResponse<IClasse[]>) => (this.classes = res.body || []));
    });
  }

  updateForm(inscription: IInscription): void {
    this.editForm.patchValue({
      id: inscription.id,
      dateInscription: inscription.dateInscription ? inscription.dateInscription.format(DATE_TIME_FORMAT) : null,
      classe: inscription.classe,
      transport: inscription.transport,
      cantine: inscription.cantine,
      annee: inscription.annee?.id
    });
  }

  save(): void {
    this.isSaving = true;
    const inscription = this.createFromForm();
    if (inscription.id !== undefined) {
      this.subscribeToSaveResponse(this.inscriptionService.update(inscription));
    } else {
      this.subscribeToSaveResponse(this.inscriptionService.create(inscription));
    }
  }

  private createFromForm(): any {
    return {
      ...new Inscription(),
      id: this.editForm.get(['id'])!.value,
      dateInscription: this.editForm.get(['dateInscription'])!.value
        ? moment(this.editForm.get(['dateInscription'])!.value, DATE_TIME_FORMAT)
        : undefined,
      classe: this.editForm.get(['classe'])!.value,
      transport: this.editForm.get(['transport'])!.value,
      cantine: this.editForm.get(['cantine'])!.value,
      /* statut: this.editForm.get(['statut'])!.value, */
      annee: this.editForm.get(['annee'])!.value,

    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscription>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  previousState(): void {
    window.history.back();
  }
  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  trackByIdAnnee(index: number, item: IAnnee): any {
    return item.id!;
  }
  trackByIdClasse(index: number, item: IClasse): any {
    return item.id!;
  }
}
