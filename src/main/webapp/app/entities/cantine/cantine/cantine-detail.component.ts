import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICantine } from 'app/shared/model/cantine/cantine.model';

@Component({
  selector: 'jhi-cantine-detail',
  templateUrl: './cantine-detail.component.html',
})
export class CantineDetailComponent implements OnInit {
  cantine: ICantine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cantine }) => (this.cantine = cantine));
  }

  previousState(): void {
    window.history.back();
  }
}
