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
import { useRouter } from 'vue-router';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { useToast } from 'src/composables/Toast.composable';
import { ToastType } from 'src/enums/ToastType.enum';
import { useLoadingPopup } from 'src/composables/Popup.composable';

const mainLayoutStore = useMainLayoutStore();
const entretienStore = useEntretienStore();
const db = getFirestore(firebaseApp);
const router = useRouter();

const { loadingPopup } = useLoadingPopup();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'present_to_all',
    title: 'Formulaire entretien',
    routeName: 'formulaire-entretien',
    path: '/entretiens/formulaire',
  });
});

async function addEntretien(entretienItem: Entretien) {
  loadingPopup.show();
  const addResult = await addDoc(collection(db, 'entretien'), entretienItem);
  const docRef = doc(db, 'entretien', addResult.id);
  await updateDoc(docRef, {
    id: addResult.id,
  });
  const docSnap = await getDoc(docRef);
  const newEntretien: Entretien = docSnap.data() as Entretien;
  entretienStore.entretiens.push(newEntretien);

  loadingPopup.hide();

  useToast('Succès', 'Entretien ajouté avec succès', ToastType.SUCCESS);

  console.log(entretienStore.entretiens);
}

async function onFormSubmit() {
  switch (entretienStore.crudAction) {
    case CrudAction.CREATE:
      await addEntretien(entretienStore.FormEntretien);
      router.push({ name: 'entretien' });
      break;

    case CrudAction.UPDATE:
      loadingPopup.show();
      entretienStore.updateEntretien(entretienStore.FormEntretien).then(() => {
        loadingPopup.hide();
        router.push({ name: 'entretien' });
      });
      break;

    default:
      break;
  }
}
</script>
