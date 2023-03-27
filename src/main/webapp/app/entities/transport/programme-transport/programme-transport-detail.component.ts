import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProgrammeTransport } from 'app/shared/model/transport/programme-transport.model';

@Component({
  selector: 'jhi-programme-transport-detail',
  templateUrl: './programme-transport-detail.component.html',
})
export class ProgrammeTransportDetailComponent implements OnInit {
  programmeTransport: IProgrammeTransport | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programmeTransport }) => (this.programmeTransport = programmeTransport));
  }

  previousState(): void {
    window.history.back();
  }
}
