import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProgrammeTransportUpdateComponent } from 'app/entities/transport/programme-transport/programme-transport-update.component';
import { ProgrammeTransportService } from 'app/entities/transport/programme-transport/programme-transport.service';
import { ProgrammeTransport } from 'app/shared/model/transport/programme-transport.model';

describe('Component Tests', () => {
  describe('ProgrammeTransport Management Update Component', () => {
    let comp: ProgrammeTransportUpdateComponent;
    let fixture: ComponentFixture<ProgrammeTransportUpdateComponent>;
    let service: ProgrammeTransportService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProgrammeTransportUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProgrammeTransportUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProgrammeTransportUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProgrammeTransportService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProgrammeTransport(123);
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
        const entity = new ProgrammeTransport();
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
