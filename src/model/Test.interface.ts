import { TestType } from 'src/enums/TestType.enum';

export interface Test {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  duree: number;
  bareme: number;
  choix?: TestChoix[];
  reponse?: string;
  type: TestType;
}

/** JUST FOR INFORMATION */
export const test: Test = {
  id: 'xlijseoijflkjzeflnn1',
  titre: 'Tag pour aller à la ligne',
  description: 'ma description',
  categorie: 'HTML',
  type: TestType.QCMU,
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
