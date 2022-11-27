import { Niveau } from 'src/enums/Niveau.enum';
import { SujetListing } from 'src/model/Sujet.interface';
import { fakeBackendTestList, fakeFrontendTestList } from './tests.fake';

export const fakeSujetList: SujetListing[] = [
  {
    id: '1',
    titre: 'Test de niveau développeur frontend junior.',
    description:
      "Ce test permet d'évaluer les compétences générales en frontend du développeur.",
    niveau: Niveau.DEBUTANT,
    tests: [...fakeFrontendTestList],
  },
  {
    id: '2',
    titre: 'Test de niveau développeur backend intermédiaire junior.',
    description:
      "Ce test permet d'évaluer les compétences générales en backend du développeur junior.",
    niveau: Niveau.DEBUTANT,
    tests: [...fakeBackendTestList],
  },
];
