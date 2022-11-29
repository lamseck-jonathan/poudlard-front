import { defineStore } from 'pinia';
import { User } from 'src/model/User.interface';
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore/lite';
import { firebaseApp } from 'src/firebase';
import { Role } from 'src/enums/Role.enum';

const db = getFirestore(firebaseApp);
const userCollection = collection(db, 'user');

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    candidats: [] as User[],
    user: {} as User,
  }),
  getters: {
    getListUser: (state) => state.users,
    getListCandidat: (state) => state.candidats,
    getUserItem: (state) => state.user,
  },
  actions: {
    async fetchUserList() {
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map((doc) => doc.data()) as User[];
      this.users = userList;
      console.log(this.users);
    },

    async fetchCandidatList() {
      const queryResult = query(
        userCollection,
        where('role', '==', Role.CANDIDAT)
      );
      const userSnapshot = await getDocs(queryResult);
      const candidatList = userSnapshot.docs.map((doc) => doc.data()) as User[];
      this.candidats = candidatList;
      console.log(this.candidats);
    },
  },
});
