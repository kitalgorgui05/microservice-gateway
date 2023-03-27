import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TrimestreUpdateComponent } from 'app/entities/evaluation/trimestre/trimestre-update.component';
import { TrimestreService } from 'app/entities/evaluation/trimestre/trimestre.service';
import { Trimestre } from 'app/shared/model/evaluation/trimestre.model';

describe('Component Tests', () => {
  describe('Trimestre Management Update Component', () => {
    let comp: TrimestreUpdateComponent;
    let fixture: ComponentFixture<TrimestreUpdateComponent>;
    let service: TrimestreService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TrimestreUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TrimestreUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TrimestreUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TrimestreService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Trimestre(123);
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
        const entity = new Trimestre();
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
