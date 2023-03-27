import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { GroupeTransportUpdateComponent } from 'app/entities/transport/groupe-transport/groupe-transport-update.component';
import { GroupeTransportService } from 'app/entities/transport/groupe-transport/groupe-transport.service';
import { GroupeTransport } from 'app/shared/model/transport/groupe-transport.model';

describe('Component Tests', () => {
  describe('GroupeTransport Management Update Component', () => {
    let comp: GroupeTransportUpdateComponent;
    let fixture: ComponentFixture<GroupeTransportUpdateComponent>;
    let service: GroupeTransportService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [GroupeTransportUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GroupeTransportUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupeTransportUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupeTransportService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupeTransport(123);
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
        const entity = new GroupeTransport();
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
