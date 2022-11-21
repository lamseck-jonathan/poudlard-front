<template>
  <q-page class="flex justify-center items-center">
    <div class="text-uppercase">Sujets page</div>
  </q-page>
</template>

<script lang="ts" setup>
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { onMounted } from 'vue';

const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'mdi-text-subject',
    title: 'sujet',
    routeName: 'sujets',
    path: '/sujets',
  });
});
</script>
