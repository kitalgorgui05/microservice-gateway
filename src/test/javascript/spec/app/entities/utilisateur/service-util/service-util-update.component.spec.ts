import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ServiceUtilUpdateComponent } from 'app/entities/utilisateur/service-util/service-util-update.component';
import { ServiceUtilService } from 'app/entities/utilisateur/service-util/service-util.service';
import { ServiceUtil } from 'app/shared/model/utilisateur/service-util.model';

describe('Component Tests', () => {
  describe('ServiceUtil Management Update Component', () => {
    let comp: ServiceUtilUpdateComponent;
    let fixture: ComponentFixture<ServiceUtilUpdateComponent>;
    let service: ServiceUtilService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ServiceUtilUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ServiceUtilUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ServiceUtilUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ServiceUtilService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ServiceUtil(123);
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
        const entity = new ServiceUtil();
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
