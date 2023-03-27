import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFacture, Facture } from 'app/shared/model/paiementdb/facture.model';
import { FactureService } from './facture.service';
import { IMois } from 'app/shared/model/paiementdb/mois.model';
import { MoisService } from 'app/entities/paiementdb/mois/mois.service';
import { IReglement } from 'app/shared/model/paiementdb/reglement.model';
import { ReglementService } from 'app/entities/paiementdb/reglement/reglement.service';

type SelectableEntity = IMois | IReglement;

@Component({
  selector: 'jhi-facture-update',
  templateUrl: './facture-update.component.html',
})
export class FactureUpdateComponent implements OnInit {
  isSaving = false;
  mois: IMois[] = [];
  reglements: IReglement[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    code: [],
    paiee: [null, [Validators.required]],
    idEleve: [null, [Validators.required]],
    moisId: [],
    paiementId: [],
  });

  constructor(
    protected factureService: FactureService,
    protected moisService: MoisService,
    protected reglementService: ReglementService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facture }) => {
      this.updateForm(facture);

      this.moisService.query().subscribe((res: HttpResponse<IMois[]>) => (this.mois = res.body || []));

      this.reglementService.query().subscribe((res: HttpResponse<IReglement[]>) => (this.reglements = res.body || []));
    });
  }

  updateForm(facture: IFacture): void {
    this.editForm.patchValue({
      id: facture.id,
      date: facture.date,
      code: facture.code,
      paiee: facture.paiee,
      idEleve: facture.idEleve,
      moisId: facture.moisId,
      paiementId: facture.paiementId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facture = this.createFromForm();
    if (facture.id !== undefined) {
      this.subscribeToSaveResponse(this.factureService.update(facture));
    } else {
      this.subscribeToSaveResponse(this.factureService.create(facture));
    }
  }

  private createFromForm(): IFacture {
    return {
      ...new Facture(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      code: this.editForm.get(['code'])!.value,
      paiee: this.editForm.get(['paiee'])!.value,
      idEleve: this.editForm.get(['idEleve'])!.value,
      moisId: this.editForm.get(['moisId'])!.value,
      paiementId: this.editForm.get(['paiementId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacture>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
