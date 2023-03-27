import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroupeCantine } from 'app/shared/model/cantine/groupe-cantine.model';

@Component({
  selector: 'jhi-groupe-cantine-detail',
  templateUrl: './groupe-cantine-detail.component.html',
})
export class GroupeCantineDetailComponent implements OnInit {
  groupeCantine: IGroupeCantine | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupeCantine }) => (this.groupeCantine = groupeCantine));
  }

  previousState(): void {
    window.history.back();
  }
}
