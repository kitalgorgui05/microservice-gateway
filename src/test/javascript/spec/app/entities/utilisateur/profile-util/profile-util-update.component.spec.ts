import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProfileUtilUpdateComponent } from 'app/entities/utilisateur/profile-util/profile-util-update.component';
import { ProfileUtilService } from 'app/entities/utilisateur/profile-util/profile-util.service';
import { ProfileUtil } from 'app/shared/model/utilisateur/profile-util.model';

describe('Component Tests', () => {
  describe('ProfileUtil Management Update Component', () => {
    let comp: ProfileUtilUpdateComponent;
    let fixture: ComponentFixture<ProfileUtilUpdateComponent>;
    let service: ProfileUtilService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProfileUtilUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProfileUtilUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProfileUtilUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProfileUtilService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfileUtil(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProfileUtil();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
