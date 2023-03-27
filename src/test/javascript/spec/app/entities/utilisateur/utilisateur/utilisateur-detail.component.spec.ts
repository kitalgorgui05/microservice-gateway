import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { UtilisateurDetailComponent } from 'app/entities/utilisateur/utilisateur/utilisateur-detail.component';
import { Utilisateur } from 'app/shared/model/utilisateur/utilisateur.model';

describe('Component Tests', () => {
  describe('Utilisateur Management Detail Component', () => {
    let comp: UtilisateurDetailComponent;
    let fixture: ComponentFixture<UtilisateurDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ utilisateur: new Utilisateur(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UtilisateurDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(UtilisateurDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UtilisateurDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load utilisateur on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.utilisateur).toEqual(jasmine.objectContaining({ id: 123 }));
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
