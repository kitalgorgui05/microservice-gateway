import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBus } from 'app/shared/model/transport/bus.model';

@Component({
  selector: 'jhi-bus-detail',
  templateUrl: './bus-detail.component.html',
})
export class BusDetailComponent implements OnInit {
  bus: IBus | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bus }) => (this.bus = bus));
  }

  previousState(): void {
    window.history.back();
  }
}
