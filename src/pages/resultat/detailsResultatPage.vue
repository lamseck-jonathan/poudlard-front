<template>
  <q-page class="q-pt-md">
    <resultat-display-candidat-item
      :candidat="candidat"
      style="margin-bottom: 3rem"
    />

    <resultat-display-reponse-item
      class="q-mb-sm"
      v-for="reponse in reponseCandidat"
      :key="reponse.test.id"
      :reponse="reponse"
    />
  </q-page>
</template>

<script lang="ts" setup>
import ResultatDisplayReponseItem from 'src/components/ResultatDisplayReponseItem.vue';
import ResultatDisplayCandidatItem from 'src/components/ResultatDisplayCandidatItem.vue';
import { useEntretienStore } from 'src/stores/entretien-store';
import { computed } from 'vue';

const entretienStore = useEntretienStore();

const candidat = computed(() => {
  return entretienStore.selectedResultat.candidat;
});

const reponseCandidat = computed(() => {
  return entretienStore.selectedResultat.reponseCandidat;
});
</script>
