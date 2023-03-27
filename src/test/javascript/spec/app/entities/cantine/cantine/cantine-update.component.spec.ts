import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { CantineUpdateComponent } from 'app/entities/cantine/cantine/cantine-update.component';
import { CantineService } from 'app/entities/cantine/cantine/cantine.service';
import { Cantine } from 'app/shared/model/cantine/cantine.model';

describe('Component Tests', () => {
  describe('Cantine Management Update Component', () => {
    let comp: CantineUpdateComponent;
    let fixture: ComponentFixture<CantineUpdateComponent>;
    let service: CantineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [CantineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CantineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CantineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CantineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cantine(123);
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
        const entity = new Cantine();
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
