<template>
  <q-page class="flex justify-center items-center">
    <div class="text-uppercase">Dashboard page</div>
  </q-page>
</template>

<script lang="ts" setup>
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { onMounted } from 'vue';

const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'dashboard',
    title: 'tableau de bord',
    routeName: 'dashboard',
    path: '/',
  });
});
</script>
