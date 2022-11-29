import { EntretienStatut } from 'src/enums/EntretienStatut.enum';
import { TestType } from 'src/enums/TestType.enum';
import { Entretien } from 'src/model/Entretien.interface';
import { fakeSujetList } from './sujets.fake';
import { fakeUtilisateursList } from './utilisateurs.fake';

export const fakeEntretiensList: Entretien[] = [
  {
    id: 'entretien_1',
    date: '27/11/2022',
    statut: EntretienStatut.EN_COURS,
    dateLimite: '29/11/2022',
    candidat: fakeUtilisateursList[2],
    sujet: fakeSujetList[1],
    reponseCandidat: [
      {
        test: {
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
        reponseQCMM: [
          {
            id: 2,
            reponse:
              "C'est une fonction envoyé en paramètre d'une autre fonction puis appeler plus tard dans la fonction mère",
            isTrue: true,
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
        ],
      },
      {
        test: {
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
              reponse:
                "C'est une variable utilisé pour gerer les appels asynchrones",
              isTrue: false,
            },
          ],
        },
        reponseQCMU: {
          id: 2,
          reponse: "C'est un callBack",
          isTrue: true,
        },
      },
      {
        test: {
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
        reponseQCMM: [
          {
            id: 2,
            reponse:
              "C'est une fonction envoyé en paramètre d'une autre fonction puis appeler plus tard dans la fonction mère",
            isTrue: true,
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
        ],
      },
      {
        test: {
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
        reponseQCMU: {
          id: 3,
          reponse: 'center',
          isTrue: true,
        },
      },
      {
        test: {
          id: '5',
          titre: "C'est quoi MYSQL ... ",
          description:
            'MySQL est un système de gestion de base de données _____?',
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
        reponseQCMU: {
          id: 3,
          reponse: 'Hiérarchique',
          isTrue: false,
        },
      },
      {
        test: {
          id: '6',
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
              isTrue: true,
            },
            {
              id: 3,
              reponse: 'Colonne',
              isTrue: false,
            },
            {
              id: 4,
              reponse: 'Objet',
              isTrue: false,
            },
          ],
        },
        reponseQCMU: {
          id: 3,
          reponse: 'Colonne',
          isTrue: false,
        },
      },
      {
        test: {
          id: '7',
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
        reponseQCMU: {
          id: 1,
          reponse: 'USE',
          isTrue: true,
        },
      },
      {
        test: {
          id: '8',
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
        reponseQCMU: {
          id: 2,
          reponse: 'Hypertext Preprocessor',
          isTrue: true,
        },
      },
      {
        test: {
          id: '9',
          titre: 'Commentaire en PHP',
          description:
            'Nous pouvons utiliser ___ pour commenter une seule ligne?',
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
        reponseQCMU: {
          id: 2,
          reponse: '//',
          isTrue: true,
        },
      },
    ],
  },
];
