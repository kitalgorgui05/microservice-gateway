import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'batiment',
        loadChildren: () => import('./immoblier/batiment/batiment.module').then(m => m.ImmoblierBatimentModule),
      },
      {
        path: 'salle',
        loadChildren: () => import('./immoblier/salle/salle.module').then(m => m.ImmoblierSalleModule),
      },
      {
        path: 'evaluation',
        loadChildren: () => import('./evaluation/evaluation/evaluation.module').then(m => m.EvaluationEvaluationModule),
      },
      {
        path: 'trimestre',
        loadChildren: () => import('./evaluation/trimestre/trimestre.module').then(m => m.EvaluationTrimestreModule),
      },
      {
        path: 'note',
        loadChildren: () => import('./evaluation/note/note.module').then(m => m.EvaluationNoteModule),
      },
      {
        path: 'cantine',
        loadChildren: () => import('./cantine/cantine/cantine.module').then(m => m.CantineCantineModule),
      },
      {
        path: 'groupe-cantine',
        loadChildren: () => import('./cantine/groupe-cantine/groupe-cantine.module').then(m => m.CantineGroupeCantineModule),
      },
      {
        path: 'bus',
        loadChildren: () => import('./transport/bus/bus.module').then(m => m.TransportBusModule),
      },
      {
        path: 'chauffeur',
        loadChildren: () => import('./transport/chauffeur/chauffeur.module').then(m => m.TransportChauffeurModule),
      },
      {
        path: 'groupe-transport',
        loadChildren: () => import('./transport/groupe-transport/groupe-transport.module').then(m => m.TransportGroupeTransportModule),
      },
      {
        path: 'zone',
        loadChildren: () => import('./transport/zone/zone.module').then(m => m.TransportZoneModule),
      },
      {
        path: 'programme-transport',
        loadChildren: () =>
          import('./transport/programme-transport/programme-transport.module').then(m => m.TransportProgrammeTransportModule),
      },
      {
        path: 'absence',
        loadChildren: () => import('./cours/absence/absence.module').then(m => m.CoursAbsenceModule),
      },
      {
        path: 'cours',
        loadChildren: () => import('./cours/cours/cours.module').then(m => m.CoursCoursModule),
      },
      {
        path: 'horaire',
        loadChildren: () => import('./cours/horaire/horaire.module').then(m => m.CoursHoraireModule),
      },
      {
        path: 'enseignant',
        loadChildren: () => import('./cours/enseignant/enseignant.module').then(m => m.CoursEnseignantModule),
      },
      {
        path: 'annee',
        loadChildren: () => import('./Inscriptiondb/annee/annee.module').then(m => m.InscriptiondbAnneeModule),
      },
      {
        path: 'tuteur',
        loadChildren: () => import('./Inscriptiondb/tuteur/tuteur.module').then(m => m.InscriptiondbTuteurModule),
      },
      {
        path: 'inscription',
        loadChildren: () => import('./Inscriptiondb/inscription/inscription.module').then(m => m.InscriptiondbInscriptionModule),
      },
      {
        path: 'matiere',
        loadChildren: () => import('./classe1/matiere/matiere.module').then(m => m.Classe1MatiereModule),
      },
      {
        path: 'niveau',
        loadChildren: () => import('./classe1/niveau/niveau.module').then(m => m.Classe1NiveauModule),
      },
      {
        path: 'classe',
        loadChildren: () => import('./classe1/classe/classe.module').then(m => m.Classe1ClasseModule),
      },

      {
        path: 'reglement',
        loadChildren: () => import('./paiementdb/reglement/reglement.module').then(m => m.PaiementdbReglementModule),
      },
      {
        path: 'facture',
        loadChildren: () => import('./paiementdb/facture/facture.module').then(m => m.PaiementdbFactureModule),
      },
      {
        path: 'mois',
        loadChildren: () => import('./paiementdb/mois/mois.module').then(m => m.PaiementdbMoisModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
  declarations: [],
})
export class GatewayEntityModule {}
