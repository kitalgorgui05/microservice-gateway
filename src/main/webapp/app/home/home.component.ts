import { Component, OnInit } from '@angular/core';

import { LoginService } from 'app/core/login/login.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import {BatimentService} from "app/entities/immoblier/batiment/batiment.service";
import {ChartDataSets, ChartType} from "chart.js";
import { Label } from 'ng2-charts';
import {InscriptionService} from "app/entities/Inscriptiondb/inscription/inscription.service";
import {EnseignantService} from "app/entities/cours/enseignant/enseignant.service";
import {ClasseService} from "app/entities/classe1/classe/classe.service";
import {EleveService} from "app/entities/Inscriptiondb/inscription/eleve.service";

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit {

   nombreEleve: Number=0;
   inscrits: Number =0;

   nonInscrits: Number =0;

  nombreClasse: Number=0;
  nombreEnseignant: Number=0;
  account: Account | null = null;
  chartType: ChartType="line";
  dataSet: ChartDataSets[]=[
    {
      data:[12,40,18,6,20]
    }
  ];
  label: Label[]=['1','2','3','4','5'];
  chartOption: any={
    legend:{
      position: 'bottom',
      labels : {
        fontSize: 14
      }
    },
    animationEnabled: true,
    exportEnabled: true
  };

  constructor(private accountService: AccountService,
              private loginService: LoginService,
              private batimentService:BatimentService,
              private eleveService:EleveService,
              private inscriptionService:InscriptionService,
              private enseignantService: EnseignantService,
              private classeService: ClasseService
  ) {}

  ngOnInit(): void {
   this.countEleve();
   this.countInscrit();
   this.countEnseignant();
   this.countClasse();
   this.countNonInscrit()
    this.accountService.identity().subscribe(account => (this.account = account));
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

    countEleve():any{
    return this.eleveService.countEleve().subscribe({
      next:(data: Number)=>{
        this.nombreEleve=data;
      }
    });
  }

  countInscrit():any{
    return this.inscriptionService.countInscrit().subscribe({
      next:(data)=>{
        this.inscrits=data;
      }
    });
  }
  countNonInscrit(): any{
    return this.nonInscrits = (this.countEleve() -this.countInscrit());
  }

  countEnseignant():any{
    return this.enseignantService.countEnseignant().subscribe({
      next:(data)=>{
        this.nombreEnseignant=data;
      }
    });
  }

  countClasse():any{
    return this.classeService.countClasse().subscribe({
      next:(data)=>{
        this.nombreClasse=data;
      }
    });
  }

  login(): void {
    this.loginService.login();
  }
}
