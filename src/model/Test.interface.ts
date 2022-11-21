import { Reponse } from './Reponse.interface';

export interface Test {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  duree: number;
  bareme: number;
  choix?: Reponse[];
  reponse?: string;
  type: TypeTest;
}

/** JUST FOR INFORMATION */
export const test: Test = {
  id: 'xlijseoijflkjzeflnn1',
  titre: 'Tag pour aller à la ligne',
  description: 'ma description',
  categorie: 'QCMU',
  type: {
    id: 1,
    type_test: 'QCM',
    label: 'Question Choix Multiple',
  },
  duree: 30000,
  bareme: 4,
  choix: [
    {
      id: 1,
      reponse: 'div',
      isTrue: false,
    },
    {
      id: 2,
      reponse: 'input',
      isTrue: false,
    },
    {
      id: 3,
      reponse: 'br',
      isTrue: false,
    },
  ],
};

export interface TestChoix {
  id: number;
  reponse: string;
  isTrue: boolean;
}

export interface TypeTest {
  id: number;
  type_test: string;
  label: string;
}
