import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ClasseDetailComponent } from 'app/entities/classe1/classe/classe-detail.component';
import { Classe } from 'app/shared/model/classe1/classe.model';

describe('Component Tests', () => {
  describe('Classe Management Detail Component', () => {
    let comp: ClasseDetailComponent;
    let fixture: ComponentFixture<ClasseDetailComponent>;
    const route = ({ data: of({ classe: new Classe(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ClasseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ClasseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClasseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load classe on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.classe).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
