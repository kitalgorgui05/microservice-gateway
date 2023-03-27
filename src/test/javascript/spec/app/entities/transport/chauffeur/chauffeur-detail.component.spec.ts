import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ChauffeurDetailComponent } from 'app/entities/transport/chauffeur/chauffeur-detail.component';
import { Chauffeur } from 'app/shared/model/transport/chauffeur.model';

describe('Component Tests', () => {
  describe('Chauffeur Management Detail Component', () => {
    let comp: ChauffeurDetailComponent;
    let fixture: ComponentFixture<ChauffeurDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ chauffeur: new Chauffeur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ChauffeurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ChauffeurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChauffeurDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load chauffeur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chauffeur).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
