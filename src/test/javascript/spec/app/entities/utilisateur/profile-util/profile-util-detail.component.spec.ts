import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ProfileUtilDetailComponent } from 'app/entities/utilisateur/profile-util/profile-util-detail.component';
import { ProfileUtil } from 'app/shared/model/utilisateur/profile-util.model';

describe('Component Tests', () => {
  describe('ProfileUtil Management Detail Component', () => {
    let comp: ProfileUtilDetailComponent;
    let fixture: ComponentFixture<ProfileUtilDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ profileUtil: new ProfileUtil(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProfileUtilDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProfileUtilDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProfileUtilDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load profileUtil on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.profileUtil).toEqual(jasmine.objectContaining({ id: 123 }));
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
