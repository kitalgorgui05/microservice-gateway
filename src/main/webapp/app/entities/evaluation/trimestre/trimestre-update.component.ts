import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITrimestre, Trimestre } from 'app/shared/model/evaluation/trimestre.model';
import { TrimestreService } from './trimestre.service';
import {IAnnee} from "../../../shared/model/Inscriptiondb/annee.model";
import {AnneeService} from "../../Inscriptiondb/annee/annee.service";

@Component({
  selector: 'jhi-trimestre-update',
  templateUrl: './trimestre-update.component.html',
})
export class TrimestreUpdateComponent implements OnInit {
  isSaving = false;
  dateDebutDp: any;
  dateFinDp: any;
  annees?: IAnnee[] |null;


  editForm = this.fb.group({
    id: [],
    dateDebut: [null, [Validators.required]],
    dateFin: [null, [Validators.required]],
    annee: [null, [Validators.required]],
  });

  constructor(
    protected trimestreService: TrimestreService,
    protected anneeService: AnneeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trimestre }) => {
      this.updateForm(trimestre);
      this.getAllAnnee();
    });
  }
  getAllAnnee(): any{
    return this.anneeService.query().subscribe(
      {
        next:(data)=>{
          this.annees=data.body;
        }
      }
    );
  }
  updateForm(trimestre: ITrimestre): void {
    this.editForm.patchValue({
      id: trimestre.id,
      dateDebut: trimestre.dateDebut,
      dateFin: trimestre.dateFin,
      annee: trimestre.annee,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trimestre = this.createFromForm();
    if (trimestre.id !== undefined) {
      this.subscribeToSaveResponse(this.trimestreService.update(trimestre));
    } else {
      this.subscribeToSaveResponse(this.trimestreService.create(trimestre));
    }
  }

  private createFromForm(): ITrimestre {
    return {
      ...new Trimestre(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      annee: this.editForm.get(['annee'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrimestre>>): void {
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
  trackById(index: number, item: IAnnee): any {
    return item.id;
  }
}
