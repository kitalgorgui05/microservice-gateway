import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { InscriptionService } from 'app/entities/Inscription/inscription/inscription.service';
import { IInscription, Inscription } from 'app/shared/model/Inscription/inscription.model';
import { Etat } from 'app/shared/model/enumerations/etat.model';

describe('Service Tests', () => {
  describe('Inscription Service', () => {
    let injector: TestBed;
    let service: InscriptionService;
    let httpMock: HttpTestingController;
    let elemDefault: IInscription;
    let expectedResult: IInscription | IInscription[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InscriptionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Inscription(0, currentDate, 'AAAAAAA', false, 'AAAAAAA', false, 'AAAAAAA', 'AAAAAAA', Etat.INSCRIT);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateInscription: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Inscription', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateInscription: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateInscription: currentDate,
          },
          returnedFromService
        );

        service.create(new Inscription()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Inscription', () => {
        const returnedFromService = Object.assign(
          {
            dateInscription: currentDate.format(DATE_TIME_FORMAT),
            classe: 'BBBBBB',
            transport: true,
            groupeTransport: 'BBBBBB',
            cantine: true,
            groupeCantine: 'BBBBBB',
            paiement: 'BBBBBB',
            statut: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateInscription: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Inscription', () => {
        const returnedFromService = Object.assign(
          {
            dateInscription: currentDate.format(DATE_TIME_FORMAT),
            classe: 'BBBBBB',
            transport: true,
            groupeTransport: 'BBBBBB',
            cantine: true,
            groupeCantine: 'BBBBBB',
            paiement: 'BBBBBB',
            statut: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateInscription: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Inscription', () => {
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
