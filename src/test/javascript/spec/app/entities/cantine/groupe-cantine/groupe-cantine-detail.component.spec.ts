import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { GroupeCantineDetailComponent } from 'app/entities/cantine/groupe-cantine/groupe-cantine-detail.component';
import { GroupeCantine } from 'app/shared/model/cantine/groupe-cantine.model';

describe('Component Tests', () => {
  describe('GroupeCantine Management Detail Component', () => {
    let comp: GroupeCantineDetailComponent;
    let fixture: ComponentFixture<GroupeCantineDetailComponent>;
    const route = ({ data: of({ groupeCantine: new GroupeCantine(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [GroupeCantineDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GroupeCantineDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GroupeCantineDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load groupeCantine on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.groupeCantine).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
