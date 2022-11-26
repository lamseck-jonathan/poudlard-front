import { Test } from './Test.interface';

export interface Reponse {
  id: number;
  reponse: string;
  isTrue: boolean;
}

export interface ChoixReponse {
  reponse: Reponse;
  isActive: boolean;
}

export interface ReponseCandidat {
  test: Test;
  reponseQCMM?: Reponse[];
  reponseQCMU?: Reponse;
  reponseQR?: string;
}
