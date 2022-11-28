import { EntretienStatut } from 'src/enums/EntretienStatut.enum';
import { Entretien } from 'src/model/Entretien.interface';
import { fakeSujetList } from './sujets.fake';
import { fakeUtilisateursList } from './utilisateurs.fake';

export const fakeEntretiensList: Entretien[] = [
  {
    id: 'entretien_1',
    date: '27/11/2022',
    statut: EntretienStatut.EN_COURS,
    dateLimite: '29/11/2022',
    candidat: fakeUtilisateursList[2],
    sujet: fakeSujetList[1],
  },
];
