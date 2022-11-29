import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { defineStore } from 'pinia';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { firebaseApp } from 'src/firebase';
import { Competence, FicheCandidat } from 'src/model/FicheCandidat.interface';
import { UserListing } from 'src/model/User.interface';

const db = getFirestore(firebaseApp);
const ficheCandidatCollection = collection(db, 'fiche_candidat');

export const useFicheCandidatStore = defineStore('ficheCandidat', {
  state: () => ({
    crudAction: CrudAction.READ,
    ficheCandidats: <FicheCandidat[]>[],
    selectedCandidat: <UserListing>{},
    formFicheCandidat: <FicheCandidat>{},
  }),

  getters: {
    isInReadMode: (state) => state.crudAction === CrudAction.READ,
    isInUpdateMode: (state) => state.crudAction === CrudAction.UPDATE,
  },

  actions: {
    initFormFicheCandidat() {
      this.formFicheCandidat = {
        id: '',
        id_user: this.selectedCandidat.id,
        user: this.selectedCandidat,
        competences: [<Competence>{}, <Competence>{}, <Competence>{}],
        niveauAcademique: {},
        niveauFrancais: {},
        niveauAnglais: {},
      };
    },

    async getAllFicheCandidats() {
      const ficheCandidatSnapShot = await getDocs(ficheCandidatCollection);
      const ficheList = ficheCandidatSnapShot.docs.map((doc) =>
        doc.data()
      ) as FicheCandidat[];
      this.ficheCandidats = ficheList;
      console.log('getAllFicheCandidats', this.ficheCandidats);
    },

    async getFicheCandidat(idCandidat: string) {
      const queryResult = query(
        ficheCandidatCollection,
        where('id_user', '==', idCandidat)
      );

      const ficheCandidatSnapShot = await getDocs(queryResult);
      const ficheCandidat = ficheCandidatSnapShot.docs.map((doc) =>
        doc.data()
      ) as FicheCandidat[];

      if (ficheCandidat.length > 0) this.formFicheCandidat = ficheCandidat[0];
    },

    async updateFicheCandidat() {
      if (this.formFicheCandidat.id) {
        const docRef = doc(db, 'fiche_candidat', this.formFicheCandidat.id);
        await updateDoc(docRef, { ...this.formFicheCandidat });
      } else {
        const addResult = await addDoc(
          collection(db, 'fiche_candidat'),
          this.formFicheCandidat
        );

        const docRef = doc(db, 'fiche_candidat', addResult.id);
        await updateDoc(docRef, { id: addResult.id });
      }
    },
  },
});
