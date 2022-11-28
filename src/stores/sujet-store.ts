import { defineStore } from 'pinia';
import { Sujet } from 'src/model/Sujet.interface';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseApp } from 'src/firebase';

const db = getFirestore(firebaseApp);
const sujetCollection = collection(db, 'sujet');

export const useSujetStore = defineStore('sujet', {
  state: () => ({
    sujets: [] as Sujet[],
    sujet: {} as Sujet,
  }),
  getters: {
    getListSujet: (state) => state.sujets,
    getSujetItem: (state) => state.sujet,
  },
  actions: {
    async fetchSujetList() {
      const sujetSnapshot = await getDocs(sujetCollection);
      const sujetList = sujetSnapshot.docs.map((doc) => doc.data()) as Sujet[];
      this.sujets = sujetList;
      console.log(this.sujets);
    },
  },
});
