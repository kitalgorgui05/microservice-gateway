import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISalle, Salle } from 'app/shared/model/immoblier/salle.model';
import { SalleService } from './salle.service';
import { IBatiment } from 'app/shared/model/immoblier/batiment.model';
import { BatimentService } from 'app/entities/immoblier/batiment/batiment.service';

@Component({
  selector: 'jhi-salle-update',
  templateUrl: './salle-update.component.html',
})
export class SalleUpdateComponent implements OnInit {
  isSaving = false;
  batiments: IBatiment[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
    batiment: []
  });

  constructor(
    protected salleService: SalleService,
    protected batimentService: BatimentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ salle }) => {
      this.updateForm(salle);
      this.batimentService.query().subscribe((res: HttpResponse<IBatiment[]>) => (this.batiments = res.body || []));
    });
  }

  updateForm(salle: ISalle): void {
    this.editForm.patchValue({
      id: salle.id,
      nom: salle.nom,
      nombre: salle.nombre,
      batiment: salle.batiment?.id
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const salle = this.createFromForm();
    if (salle.id !== undefined) {
      this.subscribeToSaveResponse(this.salleService.update(salle));
    } else {
      this.subscribeToSaveResponse(this.salleService.create(salle));
    }
  }

  private createFromForm(): ISalle {
    return {
      ...new Salle(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      batiment: this.editForm.get(['batiment'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISalle>>): void {
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
  trackById(index: number, item: IBatiment) : any{
    return item.id;
  }
}
