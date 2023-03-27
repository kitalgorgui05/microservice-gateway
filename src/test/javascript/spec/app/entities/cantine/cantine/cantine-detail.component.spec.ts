import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CantineDetailComponent } from 'app/entities/cantine/cantine/cantine-detail.component';
import { Cantine } from 'app/shared/model/cantine/cantine.model';

describe('Component Tests', () => {
  describe('Cantine Management Detail Component', () => {
    let comp: CantineDetailComponent;
    let fixture: ComponentFixture<CantineDetailComponent>;
    const route = ({ data: of({ cantine: new Cantine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CantineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CantineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CantineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cantine on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cantine).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
