import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { BatimentUpdateComponent } from 'app/entities/immoblier/batiment/batiment-update.component';
import { BatimentService } from 'app/entities/immoblier/batiment/batiment.service';
import { Batiment } from 'app/shared/model/immoblier/batiment.model';

describe('Component Tests', () => {
  describe('Batiment Management Update Component', () => {
    let comp: BatimentUpdateComponent;
    let fixture: ComponentFixture<BatimentUpdateComponent>;
    let service: BatimentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [BatimentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BatimentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BatimentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BatimentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Batiment(123);
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
        const entity = new Batiment();
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
