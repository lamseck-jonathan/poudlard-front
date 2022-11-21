export interface Reponse {
  id: number;
  reponse: string;
  isTrue: boolean;
}

export interface ChoixReponse {
  reponse: Reponse;
  isActive: boolean;
}
