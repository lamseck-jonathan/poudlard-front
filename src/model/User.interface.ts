import { Role } from 'src/enums/Role.enum';

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSignIn {
  nom: string;
  prenom: string;
  email: string;
  role: string;
  adresse: string;
  telephone: string;
  mdp: string;
  mdpVerif: string;
}

export interface UserListing {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: Role;
  telephone: string;
  adresse: string;
  actif: boolean;
}
