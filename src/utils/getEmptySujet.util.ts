import { Niveau } from 'src/enums/Niveau.enum';
import { Sujet } from 'src/model/Sujet.interface';

/* This function will be in store when we'll connect the app to the DB */
export default function getEmptySujetModel(): Sujet {
  return {
    id: '',
    titre: '',
    description: '',
    niveau: Niveau.DEBUTANT,
    tests: [],
  };
}
