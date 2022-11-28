import { EntretienStatut } from 'src/enums/EntretienStatut.enum';
import { ReponseCandidat } from './Reponse.interface';
import { Sujet } from './Sujet.interface';
import { User } from './User.interface';

export interface Entretien {
  id: string;
  date: string;
  statut: EntretienStatut;
  dateLimite: string;
  candidat: User;
  sujet: Sujet;
  reponseCandidat?: ReponseCandidat[];
}

export interface FormEntretien {
  id: string;
  date: string;
  statut: 'en cours' | 'annulé' | 'achevé';
  dateLimite: string;
  candidat: User;
  sujet: Sujet;
  reponseCandidat?: ReponseCandidat[];
}
