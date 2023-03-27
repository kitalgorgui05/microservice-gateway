import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGroupeCantine, GroupeCantine } from 'app/shared/model/cantine/groupe-cantine.model';
import { GroupeCantineService } from './groupe-cantine.service';
import { ICantine } from 'app/shared/model/cantine/cantine.model';
import { CantineService } from 'app/entities/cantine/cantine/cantine.service';

@Component({
  selector: 'jhi-groupe-cantine-update',
  templateUrl: './groupe-cantine-update.component.html',
})
export class GroupeCantineUpdateComponent implements OnInit {
  isSaving = false;
  cantines: ICantine[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    nombreEleves: [null, [Validators.required]],
    cantine: [],
  });

  constructor(
    protected groupeCantineService: GroupeCantineService,
    protected cantineService: CantineService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupeCantine }) => {
      this.updateForm(groupeCantine);

      this.cantineService.query().subscribe((res: HttpResponse<ICantine[]>) => (this.cantines = res.body || []));
    });
  }
  updateForm(groupeCantine: IGroupeCantine): void {
    this.editForm.patchValue({
      id: groupeCantine.id,
      nom: groupeCantine.nom,
      nombreEleves: groupeCantine.nombreEleves,
      cantine: groupeCantine.cantine?.id,
    });
  }
  previousState(): void {
    window.history.back();
  }
  save(): void {
    this.isSaving = true;
    const groupeCantine = this.createFromForm();
    if (groupeCantine.id !== undefined) {
      this.subscribeToSaveResponse(this.groupeCantineService.update(groupeCantine));
    } else {
      this.subscribeToSaveResponse(this.groupeCantineService.create(groupeCantine));
    }
  }
  private createFromForm(): IGroupeCantine {
    return {
      ...new GroupeCantine(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      nombreEleves: this.editForm.get(['nombreEleves'])!.value,
      cantine: this.editForm.get(['cantine'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupeCantine>>): void {
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
  trackById(index: number, item: ICantine): any {
    return item.id;
  }
}
