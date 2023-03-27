import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ServiceUtilDetailComponent } from 'app/entities/utilisateur/service-util/service-util-detail.component';
import { ServiceUtil } from 'app/shared/model/utilisateur/service-util.model';

describe('Component Tests', () => {
  describe('ServiceUtil Management Detail Component', () => {
    let comp: ServiceUtilDetailComponent;
    let fixture: ComponentFixture<ServiceUtilDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ serviceUtil: new ServiceUtil(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ServiceUtilDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ServiceUtilDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ServiceUtilDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load serviceUtil on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.serviceUtil).toEqual(jasmine.objectContaining({ id: 123 }));
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
