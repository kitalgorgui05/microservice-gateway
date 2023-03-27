import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AnneeDetailComponent } from 'app/entities/Inscription/annee/annee-detail.component';
import { Annee } from 'app/shared/model/Inscription/annee.model';

describe('Component Tests', () => {
  describe('Annee Management Detail Component', () => {
    let comp: AnneeDetailComponent;
    let fixture: ComponentFixture<AnneeDetailComponent>;
    const route = ({ data: of({ annee: new Annee(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnneeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AnneeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnneeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load annee on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.annee).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
