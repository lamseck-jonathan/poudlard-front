import { defineStore } from 'pinia';
import { UserListing, UserLogin, UserSignIn } from 'src/model/User.interface';
import {
  getAuth,
  signInWithEmailAndPassword,
  Auth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { Role } from 'src/enums/Role.enum';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore/lite';
import { firebaseApp } from 'src/firebase';

const db = getFirestore(firebaseApp);
const userCollection = collection(db, 'user');

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: <Auth>{}, // reference of fire Auth service
    isLoading: false,
    userIsConnected: false,
    currentUserIsLoading: false,
  }),

  actions: {
    login(userLogin: UserLogin) {
      return new Promise((resolve, reject) => {
        this.isLoading = true;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log('sign in successfully', user);

            resolve(user);
          })
          .catch((error) => {
            console.log('sign in error', error);
            reject(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      });
    },

    checkUserIsConnected() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userIsConnected = true;
          const uid = user.uid;
          console.log('user uid : ', uid);
        } else {
          // User is signed out
          // ...
          this.userIsConnected = false;
          console.log('utilisateur non connecté');
        }
      });
    },

    signIn(userSignIn: UserSignIn): Promise<User> {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        // const userStore = useUserStore();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userSignIn.email, userSignIn.mdp)
          .then(async (userCredential) => {
            const user = userCredential.user;
            userSignIn.role = Role.CANDIDAT;
            // await userStore.addUtilisateur(userCredential.user.uid, userSignIn);
            resolve(user);
          })
          .catch((err) => {
            console.log('sign in error : ', err);
            reject(err);
          })
          .finally(() => (this.isLoading = true));
      });
    },

    logout() {
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        const auth = getAuth();

        signOut(auth)
          .then(() => resolve(null))
          .catch((err) => {
            console.log('signout error : ', err);
            reject(err);
          })
          .finally(() => (this.isLoading = false));
      });
    },

    getCurrentUser(): Promise<UserListing> {
      return new Promise(async (resolve, reject) => {
        this.currentUserIsLoading = true;
        const auth = getAuth();
        const user = auth.currentUser;

        try {
          if (user) {
            const queryResult = query(
              userCollection,
              where('email', '==', user.email)
            );

            const userSnapShot = await getDocs(queryResult);
            const userFound = userSnapShot.docs.map((doc) =>
              doc.data()
            ) as UserListing[];

            resolve(userFound[0]);
          } else {
            reject('user not found');
          }
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
