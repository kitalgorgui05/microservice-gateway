import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProgrammeTransportDetailComponent } from 'app/entities/transport/programme-transport/programme-transport-detail.component';
import { ProgrammeTransport } from 'app/shared/model/transport/programme-transport.model';

describe('Component Tests', () => {
  describe('ProgrammeTransport Management Detail Component', () => {
    let comp: ProgrammeTransportDetailComponent;
    let fixture: ComponentFixture<ProgrammeTransportDetailComponent>;
    const route = ({ data: of({ programmeTransport: new ProgrammeTransport(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProgrammeTransportDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProgrammeTransportDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProgrammeTransportDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load programmeTransport on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.programmeTransport).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
