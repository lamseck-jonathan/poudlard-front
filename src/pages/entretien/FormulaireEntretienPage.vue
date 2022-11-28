<template>
  <q-page class="q-py-md">
    <form-entretien></form-entretien>
  </q-page>
</template>

<script lang="ts" setup>
import FormEntretien from 'src/components/FormEntretien.vue';
import { onMounted } from 'vue';
import { useMainLayoutStore } from 'src/stores/main-layout-store';

const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'present_to_all',
    title: 'Formulaire entretien',
    routeName: 'formulaire-entretien',
    path: '/entretiens/formulaire',
  });
});
</script>
