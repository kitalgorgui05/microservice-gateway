import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInscription, Inscription } from 'app/shared/model/Inscriptiondb/inscription.model';
import { InscriptionService } from './inscription.service';
import { IEleve } from 'app/shared/model/Inscriptiondb/eleve.model';
import { IAnnee } from 'app/shared/model/Inscriptiondb/annee.model';
import { AnneeService } from 'app/entities/Inscriptiondb/annee/annee.service';
import {ClasseService} from "../../classe1/classe/classe.service";
import {IClasse} from "../../../shared/model/classe1/classe.model";
import {EleveService} from "./eleve.service";
import { ITuteur } from 'app/shared/model/Inscriptiondb/tuteur.model';
import { TuteurService } from '../tuteur/tuteur.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

type SelectableEntity = IEleve | IAnnee;

@Component({
  selector: 'jhi-inscription-update',
  templateUrl: './inscription-update.component.html',
})
export class InscriptionUpdateComponent implements OnInit {
  isSaving = false;
  eleves: IEleve[] = [];
  annees: IAnnee[] = [];
  classes: IClasse[] = [];
  tuteurs: ITuteur[] = [];

  editForm = this.fb.group({
    id: [],
    dateInscription: [null, [Validators.required]],
    classe: [null, [Validators.required]],
    transport: [],
    cantine: [],
    eleve: [],
     statut: [null, []],
    annee: [],
    matricule: [null,[]],
    prenom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    nom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
    sexe: [null, [Validators.required]],
    adresse: [null, [Validators.required]],
    telephone: [null, [Validators.minLength(2), Validators.maxLength(12)]],
    email: [null, []],
    dateNaissance: [null, [Validators.required]],
    lieuNaissance: [null, [Validators.required]],
    tuteur: []
  });

  constructor(
    protected inscriptionService: InscriptionService,
    protected classeService: ClasseService,
    protected eleveService: EleveService,
    protected modalService: NgbModal,
    protected anneeService: AnneeService,
    protected tuteurService: TuteurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscription }) => {
      if (!inscription.id) {
        const today = moment().startOf('day');
        inscription.dateInscription = today;
      }

      this.updateForm(inscription);
      this.eleveService.query().subscribe((res: HttpResponse<IEleve[]>) => (this.eleves = res.body || []));
      this.anneeService.query().subscribe((res: HttpResponse<IAnnee[]>) => (this.annees = res.body || []));
      this.classeService.query().subscribe((res: HttpResponse<IClasse[]>) => (this.classes = res.body || []));
      this.tuteurService.query().subscribe((res: HttpResponse<ITuteur[]>) => (this.tuteurs = res.body || []));
    });
  }

  updateForm(inscription: IInscription): void {
    this.editForm.patchValue({
      id: inscription.id,
      dateInscription: inscription.dateInscription ? inscription.dateInscription.format(DATE_TIME_FORMAT) : null,
      classe: inscription.classe,
      transport: inscription.transport,
      cantine: inscription.cantine,
      eleve: inscription.eleve?.id,
      annee: inscription.annee?.id,
      matricule: inscription.eleve?.matricule,
      prenom: inscription.eleve?.prenom,
      nom: inscription.eleve?.nom,
      sexe: inscription.eleve?.sexe,
      adresse: inscription.eleve?.adresse,
      telephone: inscription.eleve?.telephone,
      email: inscription.eleve?.email,
      dateNaissance: inscription.eleve?.dateNaissance,
      lieuNaissance: inscription.eleve?.lieuNaissance,
      tuteur: inscription.eleve?.tuteur?.id,
    });
  }

  previousState(): void {
    window.history.back();
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
    const  eleve = {
      matricule: this.editForm.get(['matricule'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      email: this.editForm.get(['email'])!.value,
      dateNaissance: this.editForm.get(['dateNaissance'])!.value,
      lieuNaissance: this.editForm.get(['lieuNaissance'])!.value,
      tuteur: this.editForm.get(['tuteur'])!.value
    };
    return {
      ...new Inscription(),
      id: this.editForm.get(['id'])!.value,
      dateInscription: this.editForm.get(['dateInscription'])!.value
        ? moment(this.editForm.get(['dateInscription'])!.value, DATE_TIME_FORMAT)
        : undefined,
      classe: this.editForm.get(['classe'])!.value,
      transport: this.editForm.get(['transport'])!.value,
      cantine: this.editForm.get(['cantine'])!.value,
      eleve,

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

  trackByIdT(index: number, item: ITuteur): any {
    return item.id;
  }

  trackByIdClasses(index: number, item: IClasse): any {
    return item.id;
  }

}
