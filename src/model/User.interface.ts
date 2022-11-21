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
