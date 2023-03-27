import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EvaluationService } from 'app/entities/evaluation/evaluation/evaluation.service';
import { IEvaluation, Evaluation } from 'app/shared/model/evaluation/evaluation.model';

describe('Service Tests', () => {
  describe('Evaluation Service', () => {
    let injector: TestBed;
    let service: EvaluationService;
    let httpMock: HttpTestingController;
    let elemDefault: IEvaluation;
    let expectedResult: IEvaluation | IEvaluation[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EvaluationService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Evaluation(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateEvaluation: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Evaluation', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateEvaluation: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEvaluation: currentDate,
          },
          returnedFromService
        );

        service.create(new Evaluation()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Evaluation', () => {
        const returnedFromService = Object.assign(
          {
            type: 'BBBBBB',
            dateEvaluation: currentDate.format(DATE_TIME_FORMAT),
            classe: 'BBBBBB',
            matiere: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEvaluation: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Evaluation', () => {
        const returnedFromService = Object.assign(
          {
            type: 'BBBBBB',
            dateEvaluation: currentDate.format(DATE_TIME_FORMAT),
            classe: 'BBBBBB',
            matiere: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateEvaluation: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Evaluation', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
