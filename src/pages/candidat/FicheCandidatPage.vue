<template>
  <q-page class="q-py-lg q-px-lg">
    <form-fiche-candidat></form-fiche-candidat>
  </q-page>
</template>

<script lang="ts" setup>
import FormFicheCandidat from 'src/components/FormFicheCandidat.vue';
import { useFicheCandidatStore } from 'src/stores/fiche-candidat-store';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const mainLayoutStore = useMainLayoutStore();
const ficheCandidatStore = useFicheCandidatStore();
const router = useRouter();

onBeforeMount(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'emoji_events',
    title: 'fiche candidat',
    routeName: 'fiche-candidat',
    path: '/candidat/fiche-candidat',
  });

  ficheCandidatStore.initFormFicheCandidat();

  if (!ficheCandidatStore.selectedCandidat.id) {
    router.push({ name: 'candidat' });
  }
});
</script>
