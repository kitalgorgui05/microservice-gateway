import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClasse, Classe } from 'app/shared/model/classe1/classe.model';
import { ClasseService } from './classe.service';
import { INiveau } from 'app/shared/model/classe1/niveau.model';
import { NiveauService } from 'app/entities/classe1/niveau/niveau.service';
import {JsonPipe} from "@angular/common";
import { SalleService } from 'app/entities/immoblier/salle/salle.service';
import {ISalle} from "../../../shared/model/immoblier/salle.model";

@Component({
  selector: 'jhi-classe-update',
  templateUrl: './classe-update.component.html',
})
export class ClasseUpdateComponent implements OnInit {
  isSaving = false;
  niveaus: INiveau[] = [];
  salles?: ISalle[] | null;
  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    niveau: [],
    salle: [],
  });

  constructor(
    protected classeService: ClasseService,
    protected salleService: SalleService,
    protected niveauService: NiveauService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private jsonPipe: JsonPipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classe }) => {
      this.updateForm(classe);
      this.niveauService.query().subscribe((res: HttpResponse<INiveau[]>) => (this.niveaus = res.body || []));
    });
    this.getSalles();
  }
  updateForm(classe: IClasse): void {
    this.editForm.patchValue({
      id: classe.id,
      nom: classe.nom,
      niveau: classe.niveau?.id,
      salle: classe.salle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const classe = this.createFromForm();
    if (classe.id !== undefined) {
      this.subscribeToSaveResponse(this.classeService.update(classe));
    } else {
      this.subscribeToSaveResponse(this.classeService.create(classe));
    }
  }

  private createFromForm(): IClasse {
    return {
      ...new Classe(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      niveau: this.editForm.get(['niveau'])!.value,
      salle: this.editForm.get(['salle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClasse>>): void {
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
  trackById(index: number, item: INiveau): any {
    return item.id;
  }
  getSalles():any{
    return this.salleService.query().subscribe(
      {
        next:(data)=>{
          this.salles=data.body;
        }
      }
    )
  }
   trackByIdClasse(index: number, item: ISalle): any {
    return item.id;
  }
}
