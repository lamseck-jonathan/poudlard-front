<template>
  <router-view />
</template>

<script setup lang="ts">
// import { getAuth } from 'firebase/auth';
// import {
//   collection,
//   getDocs,
//   getFirestore,
//   query,
//   where,
// } from 'firebase/firestore/lite';
// import { watch } from 'vue';
// import { useRouter } from 'vue-router';
// import { Role } from './enums/Role.enum';
// import { firebaseApp } from './firebase';
// import { User } from './model/User.interface';
// import { useAuthStore } from './stores/auth-store';
// import { useMainLayoutStore } from './stores/main-layout-store';

// const mainLayoutStore = useMainLayoutStore();
// const authStore = useAuthStore();
// const router = useRouter();

// const db = getFirestore(firebaseApp);
// const userCollection = collection(db, 'user');

// watch(
//   () => authStore.userIsConnected,
//   async () => {
//     if (
//       !authStore.userIsConnected &&
//       router.currentRoute.value.name !== 'login' &&
//       router.currentRoute.value.name !== 'signIn'
//     ) {
//       router.push({ name: 'login' });
//     } else {
//       const auth = getAuth();
//       const user = auth.currentUser;

//       if (user) {
//         const queryResult = query(
//           userCollection,
//           where('email', '==', user.email)
//         );

//         const userSnapShot = await getDocs(queryResult);
//         const userFound = userSnapShot.docs.map((doc) => doc.data()) as User[];

//         if (userFound) {
//           mainLayoutStore.currentUser = userFound[0];
//           console.log(
//             'mainLayoutStore user ROLE :  ',
//             mainLayoutStore.currentUser.role
//           );

//           if (mainLayoutStore.currentUser.role === Role.CANDIDAT) {
//             router.push({ name: 'interview-home' });
//           } else {
//             const currentRouteName = router.currentRoute.value.name;
//             if (currentRouteName) {
//               router.push({ name: currentRouteName });
//             } else {
//               router.push({ name: 'dashboard' });
//             }
//           }
//         } else {
//           mainLayoutStore.currentUser.nom = 'Doe';
//           mainLayoutStore.currentUser.prenom = 'John';
//         }
//       }
//     }
//   }
// );
</script>
