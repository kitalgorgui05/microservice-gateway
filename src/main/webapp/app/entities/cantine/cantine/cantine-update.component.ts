import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICantine, Cantine } from 'app/shared/model/cantine/cantine.model';
import { CantineService } from './cantine.service';

@Component({
  selector: 'jhi-cantine-update',
  templateUrl: './cantine-update.component.html',
})
export class CantineUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    nombreGroupe: [null, [Validators.required]],
  });

  constructor(protected cantineService: CantineService,
              protected activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cantine }) => {
      this.updateForm(cantine);
    });
  }

  updateForm(cantine: ICantine): void {
    this.editForm.patchValue({
      id: cantine.id,
      libelle: cantine.libelle,
      nombreGroupe: cantine.nombreGroupe,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cantine = this.createFromForm();
    if (cantine.id !== undefined) {
      this.subscribeToSaveResponse(this.cantineService.update(cantine));
    } else {
      this.subscribeToSaveResponse(this.cantineService.create(cantine));
    }
  }

  private createFromForm(): ICantine {
    return {
      ...new Cantine(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      nombreGroupe: this.editForm.get(['nombreGroupe'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICantine>>): void {
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
}
