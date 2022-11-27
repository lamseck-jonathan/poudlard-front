import { defineStore } from 'pinia';
import { Test } from 'src/model/Test.interface';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { firebaseApp } from 'src/firebase';

const db = getFirestore(firebaseApp);
const testCollection = collection(db, 'test');

export const useTestStore = defineStore('test', {
  state: () => ({
    tests: [] as Test[],
    test: {} as Test,
  }),
  getters: {
    getListTest: (state) => state.tests,
    getTestItem: (state) => state.test,
  },
  actions: {
    async fetchTestList() {
      const testSnapshot = await getDocs(testCollection);
      const testList = testSnapshot.docs.map((doc) => doc.data()) as Test[];
      this.tests = testList;
      console.log(this.tests);
    },
  },
});
