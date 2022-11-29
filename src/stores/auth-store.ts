import { defineStore } from 'pinia';
import { UserLogin, UserSignIn } from 'src/model/User.interface';
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

export const useAuthStore = defineStore('auth', {
  state: () => ({
    auth: <Auth>{}, // reference of fire Auth service
    isLoading: false,
    userIsConnected: false,
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
  },
});
