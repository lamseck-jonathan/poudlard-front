import { Niveau } from 'src/enums/Niveau.enum';
import { Test } from './Test.interface';

export interface Sujet {
  id: string;
  titre: string;
  description: string;
  niveau: Niveau;
}

export interface SujetListing {
  id: string;
  titre: string;
  description: string;
  niveau: Niveau;
  tests: Test[];
  totalPoint?: number;
  totalDuree?: string;
}
