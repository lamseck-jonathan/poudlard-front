<template>
  <q-page class="q-py-md">
    <form-entretien @submit="onFormSubmit"></form-entretien>
  </q-page>
</template>

<script lang="ts" setup>
import FormEntretien from 'src/components/FormEntretien.vue';
import { onMounted } from 'vue';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { useEntretienStore } from 'src/stores/entretien-store';
import { Entretien } from 'src/model/Entretien.interface';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore/lite';
import { firebaseApp } from 'src/firebase';

const mainLayoutStore = useMainLayoutStore();
const entretienStore = useEntretienStore();
const db = getFirestore(firebaseApp);

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'present_to_all',
    title: 'Formulaire entretien',
    routeName: 'formulaire-entretien',
    path: '/entretiens/formulaire',
  });
});

async function addEntretien(entretienItem: Entretien) {
  const addResult = await addDoc(collection(db, 'entretien'), entretienItem);
  const docRef = doc(db, 'entretien', addResult.id);
  await updateDoc(docRef, {
    id: addResult.id,
  });
  const docSnap = await getDoc(docRef);
  const newEntretien: Entretien = docSnap.data() as Entretien;
  entretienStore.entretiens.push(newEntretien);
  console.log(entretienStore.entretiens);
}

function onFormSubmit() {
  addEntretien(entretienStore.FormEntretien);
}
</script>
