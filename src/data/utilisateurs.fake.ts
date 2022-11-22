import { Role } from 'src/enums/Role.enum';

export const fakeUtilisateursList = [
  {
    id: '1',
    nom: 'Razafiarison',
    prenom: 'Tafitasoa',
    role: Role.ADMIN,
    adresse: 'Ampopoka Golf Fianarantsoa',
    email: 'tafita@email.com',
    telephone: '0342821847',
    actif: true,
  },
  {
    id: '2',
    nom: 'Rasoanambinina',
    prenom: 'Patricia',
    role: Role.RECRUITER,
    adresse: 'Tanambao Fianarantsoa',
    email: 'patricia@email.com',
    telephone: '0349072975',
    actif: true,
  },
  {
    id: '3',
    nom: 'JEAN MARC',
    prenom: 'Leon',
    role: Role.CANDIDAT,
    adresse: 'Andrefanambohijanahary Antananarivo',
    email: 'leon@email.com',
    telephone: '0344745682',
    actif: true,
  },
  {
    id: '4',
    nom: 'Doe',
    prenom: 'John',
    role: Role.CANDIDAT,
    adresse: 'Chartre France',
    email: 'john@email.com',
    telephone: '+334563218654',
    actif: false,
  },
];
