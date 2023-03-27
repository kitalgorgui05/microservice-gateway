import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BatimentDetailComponent } from 'app/entities/immoblier/batiment/batiment-detail.component';
import { Batiment } from 'app/shared/model/immoblier/batiment.model';

describe('Component Tests', () => {
  describe('Batiment Management Detail Component', () => {
    let comp: BatimentDetailComponent;
    let fixture: ComponentFixture<BatimentDetailComponent>;
    const route = ({ data: of({ batiment: new Batiment(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BatimentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BatimentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BatimentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load batiment on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.batiment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
