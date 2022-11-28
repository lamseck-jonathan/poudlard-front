import { TestType } from 'src/enums/TestType.enum';

/* This function will be in store when we'll connect the app to the DB */
export default function getEmptyTestModel() {
  return {
    id: '',
    titre: '',
    description: '',
    categorie: '',
    duree: 0,
    bareme: 0,
    choix: [
      {
        id: 1,
        reponse: '',
        isTrue: false,
      },
      {
        id: 2,
        reponse: '',
        isTrue: false,
      },
    ],
    reponse: '',
    type: TestType.QCMU,
  };
}
