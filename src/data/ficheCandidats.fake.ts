import { Diplome } from 'src/enums/Diplome.enum';
import { Niveau } from 'src/enums/Niveau.enum';
import { Role } from 'src/enums/Role.enum';
import { SituationActuelle } from 'src/enums/SituationActuelle.enum';
import { FicheCandidat } from 'src/model/FicheCandidat.interface';

export const fakeFicheCandidats: FicheCandidat[] = [
  {
    id: 'mlkjsdifqz',
    id_user: '3',
    user: {
      id: '3',
      nom: 'JEAN MARC',
      prenom: 'Leon',
      role: Role.CANDIDAT,
      adresse: 'Andrefanambohijanahary Antananarivo',
      email: 'leon@email.com',
      telephone: '0344745682',
      actif: true,
    },
    niveauAcademique: {
      diplome: Diplome.MASTER,
      date: '2022-02-02',
      option: 'Informatique',
      institut: "Ecole Nationale d'informatiue",
    },
    niveauFrancais: {
      lu: 5,
      parle: 4,
      ecrit: 4,
    },
    niveauAnglais: {
      lu: 4,
      parle: 3,
      ecrit: 4,
    },
    anneeExperienceReelle: 3,
    connaisSociete: true,
    motivation: 'Environnement sociale, salaire ... ',
    situationActuelle: SituationActuelle.EN_POSTE,
    disponibilite: 'après 3 mois',
    pretention: '2 000 000',
    competences: [
      {
        langage: 'JavaScript',
        anneeExperience: 3,
        niveau: Niveau.EXPERT,
      },
      {
        langage: 'PHP',
        anneeExperience: 3,
        niveau: Niveau.AVANCE,
      },
      {
        langage: 'JAVA',
        anneeExperience: 1,
        niveau: Niveau.DEBUTANT,
      },
    ],
  },
];
