import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IChauffeur } from 'app/shared/model/transport/chauffeur.model';

@Component({
  selector: 'jhi-chauffeur-detail',
  templateUrl: './chauffeur-detail.component.html',
})
export class ChauffeurDetailComponent implements OnInit {
  chauffeur: IChauffeur | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chauffeur }) => (this.chauffeur = chauffeur));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
