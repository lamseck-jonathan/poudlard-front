import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { defineStore } from 'pinia';
import { fakeEntretiensList } from 'src/data/fakeEntretiens.fake';
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
  }),

  getters: {
    isInReadMode: (state) => state.crudAction === CrudAction.READ,
    isInAddMode: (state) => state.crudAction === CrudAction.CREATE,
  },

  actions: {
    getAllEntretien() {
      this.entretiens = [...fakeEntretiensList];
    },
    async fetchEntretienList() {
      const entretienSnapshot = await getDocs(entretienCollection);
      const entretienList = entretienSnapshot.docs.map((doc) =>
        doc.data()
      ) as Entretien[];
      this.entretiens = entretienList;
      console.log(this.entretiens);
    },
  },
});
