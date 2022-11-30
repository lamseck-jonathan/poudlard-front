import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from 'firebase/firestore/lite';
import { defineStore } from 'pinia';
import { useToast } from 'src/composables/Toast.composable';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { ToastType } from 'src/enums/ToastType.enum';
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
    selectedResultat: <Entretien>{},
    isLoading: false,
  }),

  getters: {
    isInReadMode: (state) => state.crudAction === CrudAction.READ,
    isInAddMode: (state) => state.crudAction === CrudAction.CREATE,
  },

  actions: {
    async fetchEntretienList() {
      this.isLoading = true;
      try {
        const entretienSnapshot = await getDocs(entretienCollection);
        const entretienList = entretienSnapshot.docs.map((doc) =>
          doc.data()
        ) as Entretien[];
        this.entretiens = entretienList;
        console.log(this.entretiens);
      } catch (err) {
        useToast(
          'Erreur',
          'Une erreur est survenu lors du traitement ',
          ToastType.ERROR
        );
      } finally {
        this.isLoading = false;
      }
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

          useToast(
            'Succès',
            'Entretien mise à jour avec succès',
            ToastType.SUCCESS
          );

          resolve(null);
        } catch (err) {
          useToast(
            'Erreur',
            'Un erreur est survenu lors de la mise à jour',
            ToastType.ERROR
          );

          reject(err);
        } finally {
          this.isLoading = false;
        }
      });
    },
  },
});
