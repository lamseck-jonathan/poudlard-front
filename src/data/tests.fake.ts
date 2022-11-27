import { TestType } from 'src/enums/TestType.enum';
import { Test } from 'src/model/Test.interface';

export const fakeTestList = <Test[]>[
  {
    id: '1',
    titre: 'Js Callback',
    description: 'Decrivez ce que vous entendez par Callback ',
    categorie: 'JAVASCRIPT',
    duree: 30000,
    bareme: 4,
    type: TestType.QCMM,
    choix: [
      {
        id: 1,
        reponse: "C'est rien",
        isTrue: false,
      },
      {
        id: 2,
        reponse:
          "C'est une fonction envoyé en paramètre d'une autre fonction puis appeler plus tard dans la fonction mère",
        isTrue: true,
      },
      {
        id: 3,
        reponse: "C'est CB",
        isTrue: false,
      },
    ],
  },
  {
    id: '2',
    titre: 'Js Promise',
    description: 'Decrivez ce que vous entendez par Promise',
    categorie: 'JAVASCRIPT',
    duree: 22000,
    bareme: 3,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: "C'est rien",
        isTrue: false,
      },
      {
        id: 2,
        reponse: "C'est un callBack",
        isTrue: true,
      },
      {
        id: 3,
        reponse: "C'est une variable utilisé pour gerer les appels asynchrones",
        isTrue: false,
      },
    ],
  },
  {
    id: '3',
    titre: 'Fonctions et interfaces',
    description:
      'Répondez par vrai ou faux. Dans une Interface, on ne déclare que les signatures de ses fonctions ?',
    categorie: 'POO',
    duree: 30000,
    bareme: 5,
    reponse: 'vrai',
    type: TestType.QR,
  },
  {
    id: '4',
    titre: 'Références en PHP',
    description:
      "Ecrivez le caractère utilisé pour effectuer une passage par référence d'une variable en PHP.",
    categorie: 'PHP',
    duree: 15000,
    bareme: 3,
    type: TestType.QR,
    reponse: '&',
  },
  {
    id: '5',
    titre: 'Les tags non HTML ',
    description:
      "Parmi la liste suivante, selectionnez le/les tags qui n'existe(ent) pas en HTML :",
    categorie: 'HTML',
    duree: 16000,
    bareme: 4,
    type: TestType.QCMM,
    choix: [
      {
        id: 1,
        reponse: 'br',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'bottom',
        isTrue: true,
      },
      {
        id: 3,
        reponse: 'footer',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'checkbox',
        isTrue: true,
      },
    ],
  },
  {
    id: '6',
    titre: 'Display CSS',
    description:
      'Quelle est la valeur qui n\'existe pas pour l\'attribut "display" en css : ',
    categorie: 'JAVASCRIPT',
    duree: 21000,
    bareme: 3,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'flex',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'grid',
        isTrue: true,
      },
      {
        id: 3,
        reponse: 'center',
        isTrue: true,
      },
      {
        id: 4,
        reponse: 'none',
        isTrue: false,
      },
    ],
  },
  {
    id: '7',
    titre: "C'est quoi MYSQL ... ",
    description: 'MySQL est un système de gestion de base de données _____?',
    categorie: 'SGBD',
    duree: 35000,
    bareme: 3,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'Orienté objet',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'Relationnel',
        isTrue: true,
      },
      {
        id: 3,
        reponse: 'Hiérarchique',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'Réseau',
        isTrue: false,
      },
    ],
  },
  {
    id: '8',
    titre: 'Attribut BD Relationnel ',
    description:
      'Qu’est-ce qui représente un attribut dans une base de données relationnelle ?',
    categorie: 'SGBD',
    duree: 30000,
    bareme: 5,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'Table',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'Ligne',
        isTrue: false,
      },
      {
        id: 3,
        reponse: 'Colonne',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'Objet',
        isTrue: true,
      },
    ],
  },
  {
    id: '9',
    titre: 'Selectionner une BD par défaut ',
    description:
      'Quelle instruction est utilisée pour sélectionner une base de données par défaut?',
    categorie: 'SGBD',
    duree: 30000,
    bareme: 5,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'USE',
        isTrue: true,
      },
      {
        id: 2,
        reponse: 'CREATE',
        isTrue: false,
      },
      {
        id: 3,
        reponse: 'SCHEMA',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'DROP',
        isTrue: false,
      },
    ],
  },
  {
    id: '10',
    titre: 'le Sigle PHP',
    description: 'Que signifie PHP?',
    categorie: 'PHP',
    duree: 22000,
    bareme: 4,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'Personal Home Page',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'Hypertext Preprocessor',
        isTrue: true,
      },
      {
        id: 3,
        reponse: 'Pretext Hypertext Processor',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'Preprocessor Home Page',
        isTrue: false,
      },
    ],
  },
  {
    id: '11',
    titre: 'Commentaire en PHP',
    description: 'Nous pouvons utiliser ___ pour commenter une seule ligne?',
    categorie: 'PHP',
    duree: 22000,
    bareme: 3,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: '/?',
        isTrue: false,
      },
      {
        id: 2,
        reponse: '//',
        isTrue: true,
      },
      {
        id: 3,
        reponse: '#',
        isTrue: false,
      },
      {
        id: 4,
        reponse: ' /* */',
        isTrue: false,
      },
    ],
  },
];

export const fakeFrontendTestList = [
  {
    id: '1',
    titre: 'Js Callback',
    description: 'Decrivez ce que vous entendez par Callback ',
    categorie: 'JAVASCRIPT',
    duree: 30000,
    bareme: 4,
    type: TestType.QCMM,
    choix: [
      {
        id: 1,
        reponse: "C'est rien",
        isTrue: false,
      },
      {
        id: 2,
        reponse:
          "C'est une fonction envoyé en paramètre d'une autre fonction puis appeler plus tard dans la fonction mère",
        isTrue: true,
      },
      {
        id: 3,
        reponse: "C'est CB",
        isTrue: false,
      },
    ],
  },
  {
    id: '2',
    titre: 'Js Promise',
    description: 'Decrivez ce que vous entendez par Promise',
    categorie: 'JAVASCRIPT',
    duree: 22000,
    bareme: 3,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: "C'est rien",
        isTrue: false,
      },
      {
        id: 2,
        reponse: "C'est un callBack",
        isTrue: true,
      },
      {
        id: 3,
        reponse: "C'est une variable utilisé pour gerer les appels asynchrones",
        isTrue: false,
      },
    ],
  },
  {
    id: '3',
    titre: 'Les tags non HTML ',
    description:
      "Parmi la liste suivante, selectionnez le/les tags qui n'existe(ent) pas en HTML :",
    categorie: 'HTML',
    duree: 16000,
    bareme: 4,
    type: TestType.QCMM,
    choix: [
      {
        id: 1,
        reponse: 'br',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'bottom',
        isTrue: true,
      },
      {
        id: 3,
        reponse: 'footer',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'checkbox',
        isTrue: true,
      },
    ],
  },
  {
    id: '4',
    titre: 'Display CSS',
    description:
      'Quelle est la valeur qui n\'existe pas pour l\'attribut "display" en css : ',
    categorie: 'JAVASCRIPT',
    duree: 21000,
    bareme: 3,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'flex',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'grid',
        isTrue: true,
      },
      {
        id: 3,
        reponse: 'center',
        isTrue: true,
      },
      {
        id: 4,
        reponse: 'none',
        isTrue: false,
      },
    ],
  },
];

export const fakeBackendTestList = [
  {
    id: '1',
    titre: "C'est quoi MYSQL ... ",
    description: 'MySQL est un système de gestion de base de données _____?',
    categorie: 'SGBD',
    duree: 35000,
    bareme: 3,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'Orienté objet',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'Relationnel',
        isTrue: true,
      },
      {
        id: 3,
        reponse: 'Hiérarchique',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'Réseau',
        isTrue: false,
      },
    ],
  },
  {
    id: '2',
    titre: 'Attribut BD Relationnel ',
    description:
      'Qu’est-ce qui représente un attribut dans une base de données relationnelle ?',
    categorie: 'SGBD',
    duree: 30000,
    bareme: 5,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'Table',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'Ligne',
        isTrue: false,
      },
      {
        id: 3,
        reponse: 'Colonne',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'Objet',
        isTrue: true,
      },
    ],
  },
  {
    id: '3',
    titre: 'Selectionner une BD par défaut ',
    description:
      'Quelle instruction est utilisée pour sélectionner une base de données par défaut?',
    categorie: 'SGBD',
    duree: 30000,
    bareme: 5,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'USE',
        isTrue: true,
      },
      {
        id: 2,
        reponse: 'CREATE',
        isTrue: false,
      },
      {
        id: 3,
        reponse: 'SCHEMA',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'DROP',
        isTrue: false,
      },
    ],
  },
  {
    id: '4',
    titre: 'le Sigle PHP',
    description: 'Que signifie PHP?',
    categorie: 'PHP',
    duree: 22000,
    bareme: 4,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: 'Personal Home Page',
        isTrue: false,
      },
      {
        id: 2,
        reponse: 'Hypertext Preprocessor',
        isTrue: true,
      },
      {
        id: 3,
        reponse: 'Pretext Hypertext Processor',
        isTrue: false,
      },
      {
        id: 4,
        reponse: 'Preprocessor Home Page',
        isTrue: false,
      },
    ],
  },
  {
    id: '5',
    titre: 'Commentaire en PHP',
    description: 'Nous pouvons utiliser ___ pour commenter une seule ligne?',
    categorie: 'PHP',
    duree: 22000,
    bareme: 3,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: '/?',
        isTrue: false,
      },
      {
        id: 2,
        reponse: '//',
        isTrue: true,
      },
      {
        id: 3,
        reponse: '#',
        isTrue: false,
      },
      {
        id: 4,
        reponse: ' /* */',
        isTrue: false,
      },
    ],
  },
];
