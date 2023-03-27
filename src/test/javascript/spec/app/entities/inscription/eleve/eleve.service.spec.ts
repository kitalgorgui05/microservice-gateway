import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { EleveService } from 'app/entities/Inscription/eleve/eleve.service';
import { IEleve, Eleve } from 'app/shared/model/Inscription/eleve.model';
import { Sexe } from 'app/shared/model/enumerations/sexe.model';

describe('Service Tests', () => {
  describe('Eleve Service', () => {
    let injector: TestBed;
    let service: EleveService;
    let httpMock: HttpTestingController;
    let elemDefault: IEleve;
    let expectedResult: IEleve | IEleve[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EleveService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Eleve(
        0,
        'image/png',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        Sexe.MASCULIN,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateNaissance: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Eleve', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateNaissance: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaissance: currentDate,
          },
          returnedFromService
        );

        service.create(new Eleve()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Eleve', () => {
        const returnedFromService = Object.assign(
          {
            photo: 'BBBBBB',
            matricule: 'BBBBBB',
            prenom: 'BBBBBB',
            nom: 'BBBBBB',
            sexe: 'BBBBBB',
            adresse: 'BBBBBB',
            telephone: 'BBBBBB',
            email: 'BBBBBB',
            dateNaissance: currentDate.format(DATE_FORMAT),
            lieuNaissance: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaissance: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Eleve', () => {
        const returnedFromService = Object.assign(
          {
            photo: 'BBBBBB',
            matricule: 'BBBBBB',
            prenom: 'BBBBBB',
            nom: 'BBBBBB',
            sexe: 'BBBBBB',
            adresse: 'BBBBBB',
            telephone: 'BBBBBB',
            email: 'BBBBBB',
            dateNaissance: currentDate.format(DATE_FORMAT),
            lieuNaissance: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateNaissance: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Eleve', () => {
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
