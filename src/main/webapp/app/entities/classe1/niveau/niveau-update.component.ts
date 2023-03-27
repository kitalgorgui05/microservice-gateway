import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { INiveau, Niveau } from 'app/shared/model/classe1/niveau.model';
import { NiveauService } from './niveau.service';
import { IMatiere } from 'app/shared/model/classe1/matiere.model';
import { MatiereService } from 'app/entities/classe1/matiere/matiere.service';

@Component({
  selector: 'jhi-niveau-update',
  templateUrl: './niveau-update.component.html',
})
export class NiveauUpdateComponent implements OnInit {
  isSaving = false;
  matieres: IMatiere[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    matieres: [null, Validators.required],
  });

  constructor(
    protected niveauService: NiveauService,
    protected matiereService: MatiereService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ niveau }) => {
      this.updateForm(niveau);

      this.matiereService.query().subscribe((res: HttpResponse<IMatiere[]>) => (this.matieres = res.body || []));
    });
  }

  updateForm(niveau: INiveau): void {
    this.editForm.patchValue({
      id: niveau.id,
      nom: niveau.nom,
      matieres: niveau.matieres,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const niveau = this.createFromForm();
    if (niveau.id !== undefined) {
      this.subscribeToSaveResponse(this.niveauService.update(niveau));
    } else {
      this.subscribeToSaveResponse(this.niveauService.create(niveau));
    }
  }

  private createFromForm(): INiveau {
    return {
      ...new Niveau(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      matieres: this.editForm.get(['matieres'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INiveau>>): void {
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

  trackById(index: number, item: IMatiere): any {
    return item.id;
  }

  getSelected(selectedVals: IMatiere[], option: IMatiere): IMatiere {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
