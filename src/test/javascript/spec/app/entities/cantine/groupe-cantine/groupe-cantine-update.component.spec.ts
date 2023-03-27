import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { GroupeCantineUpdateComponent } from 'app/entities/cantine/groupe-cantine/groupe-cantine-update.component';
import { GroupeCantineService } from 'app/entities/cantine/groupe-cantine/groupe-cantine.service';
import { GroupeCantine } from 'app/shared/model/cantine/groupe-cantine.model';

describe('Component Tests', () => {
  describe('GroupeCantine Management Update Component', () => {
    let comp: GroupeCantineUpdateComponent;
    let fixture: ComponentFixture<GroupeCantineUpdateComponent>;
    let service: GroupeCantineService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [GroupeCantineUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GroupeCantineUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GroupeCantineUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GroupeCantineService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GroupeCantine(123);
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
        const entity = new GroupeCantine();
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
