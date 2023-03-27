import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGroupeTransport } from 'app/shared/model/transport/groupe-transport.model';

@Component({
  selector: 'jhi-groupe-transport-detail',
  templateUrl: './groupe-transport-detail.component.html',
})
export class GroupeTransportDetailComponent implements OnInit {
  groupeTransport: IGroupeTransport | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ groupeTransport }) => (this.groupeTransport = groupeTransport));
  }

  previousState(): void {
    window.history.back();
  }
}
