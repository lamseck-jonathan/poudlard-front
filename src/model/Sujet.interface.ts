import { Niveau } from 'src/enums/Niveau.enum';
import { Test } from './Test.interface';

export interface Sujet {
  id: string;
  titre: string;
  description: string;
  niveau: Niveau;
  auteur?: string;
  tests: Test[];
}

export interface SujetListing extends Sujet {
  totalPoint?: number;
  totalDuree?: string;
}
