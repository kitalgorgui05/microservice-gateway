import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ChauffeurUpdateComponent } from 'app/entities/transport/chauffeur/chauffeur-update.component';
import { ChauffeurService } from 'app/entities/transport/chauffeur/chauffeur.service';
import { Chauffeur } from 'app/shared/model/transport/chauffeur.model';

describe('Component Tests', () => {
  describe('Chauffeur Management Update Component', () => {
    let comp: ChauffeurUpdateComponent;
    let fixture: ComponentFixture<ChauffeurUpdateComponent>;
    let service: ChauffeurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ChauffeurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ChauffeurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChauffeurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChauffeurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Chauffeur(123);
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
        const entity = new Chauffeur();
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
