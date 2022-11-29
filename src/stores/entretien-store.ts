import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore/lite';
import { defineStore } from 'pinia';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { firebaseApp } from 'src/firebase';
import { Entretien } from 'src/model/Entretien.interface';

const db = getFirestore(firebaseApp);
const entretienCollection = collection(db, 'entretien');

export const useEntretienStore = defineStore('entretien', {
  state: () => ({
    entretiens: <Entretien[]>[],
    crudAction: <CrudAction>'',
    FormEntretien: <Entretien>{},
    currentInterview: <Entretien>{},
    isLoading: false,
  }),

  getters: {
    isInReadMode: (state) => state.crudAction === CrudAction.READ,
    isInAddMode: (state) => state.crudAction === CrudAction.CREATE,
  },

  actions: {
    async fetchEntretienList() {
      const entretienSnapshot = await getDocs(entretienCollection);
      const entretienList = entretienSnapshot.docs.map((doc) =>
        doc.data()
      ) as Entretien[];
      this.entretiens = entretienList;
      console.log(this.entretiens);
    },

    getAllEntretien() {
      return new Promise(async (resolve, reject) => {
        this.isLoading = true;

        try {
          const entretienSnapshot = await getDocs(entretienCollection);
          const entretienList = entretienSnapshot.docs.map((doc) =>
            doc.data()
          ) as Entretien[];

          this.entretiens = entretienList;
          resolve(this.entretiens);
        } catch (error) {
          console.log('get all entretien error : ', error);
          reject(error);
        }
      });
    },

    updateEntretien(entretienItem: Entretien) {
      return new Promise(async (resolve, reject) => {
        this.isLoading = true;

        try {
          const docRef = doc(db, 'entretien', entretienItem.id);
          await updateDoc(docRef, { ...entretienItem });
          console.log('updated successfully');
        } catch (err) {
          console.log('update entretien error ', entretienItem);
          reject(err);
        } finally {
          this.isLoading = false;
        }
      });
    },
  },
});
