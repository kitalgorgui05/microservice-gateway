import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ProgrammeTransportService } from 'app/entities/transport/programme-transport/programme-transport.service';
import { IProgrammeTransport, ProgrammeTransport } from 'app/shared/model/transport/programme-transport.model';

describe('Service Tests', () => {
  describe('ProgrammeTransport Service', () => {
    let injector: TestBed;
    let service: ProgrammeTransportService;
    let httpMock: HttpTestingController;
    let elemDefault: IProgrammeTransport;
    let expectedResult: IProgrammeTransport | IProgrammeTransport[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProgrammeTransportService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ProgrammeTransport(0, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            heurDepart: currentDate.format(DATE_TIME_FORMAT),
            dateDepart: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProgrammeTransport', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            heurDepart: currentDate.format(DATE_TIME_FORMAT),
            dateDepart: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heurDepart: currentDate,
            dateDepart: currentDate,
          },
          returnedFromService
        );

        service.create(new ProgrammeTransport()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProgrammeTransport', () => {
        const returnedFromService = Object.assign(
          {
            heurDepart: currentDate.format(DATE_TIME_FORMAT),
            dateDepart: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heurDepart: currentDate,
            dateDepart: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProgrammeTransport', () => {
        const returnedFromService = Object.assign(
          {
            heurDepart: currentDate.format(DATE_TIME_FORMAT),
            dateDepart: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heurDepart: currentDate,
            dateDepart: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProgrammeTransport', () => {
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
