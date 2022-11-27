import { Diplome } from 'src/enums/Diplome.enum';
import { Niveau } from 'src/enums/Niveau.enum';
import { SituationActuelle } from 'src/enums/SituationActuelle.enum';
import { User } from './User.interface';

export interface FicheCandidat extends User {
  // information personnelle hérité de User
  posteConvoite?: string;

  // Compétences
  competences?: Competence[];
  anneeExperienceReelle?: number;
  niveauAcademique: NiveauAcademique;
  niveauFrancais: NiveauLinguistique;
  niveauAnglais: NiveauLinguistique;

  // Motivation et connaisances sur la société
  connaisSociete?: boolean;
  motivation?: string;

  // Situation
  situationActuelle?: SituationActuelle;
  disponibilite?: string;
  pretention?: string;
}

export interface Competence {
  langage: string;
  anneeExperience?: number;
  niveau: Niveau;
}

export interface NiveauAcademique {
  diplome?: Diplome;
  date?: string;
  option?: string;
  institut?: string;
  autre?: string;
}

export interface NiveauLinguistique {
  lu?: number;
  parle?: number;
  ecrit?: number;
}
