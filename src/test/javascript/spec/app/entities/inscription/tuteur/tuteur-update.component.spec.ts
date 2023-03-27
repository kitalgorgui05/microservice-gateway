import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { TuteurUpdateComponent } from 'app/entities/Inscription/tuteur/tuteur-update.component';
import { TuteurService } from 'app/entities/Inscription/tuteur/tuteur.service';
import { Tuteur } from 'app/shared/model/Inscription/tuteur.model';

describe('Component Tests', () => {
  describe('Tuteur Management Update Component', () => {
    let comp: TuteurUpdateComponent;
    let fixture: ComponentFixture<TuteurUpdateComponent>;
    let service: TuteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [TuteurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TuteurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TuteurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TuteurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tuteur(123);
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
        const entity = new Tuteur();
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
