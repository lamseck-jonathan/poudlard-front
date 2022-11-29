<template>
  <q-card class="row" style="width: 80vw">
    <q-card-section class="col">
      <span class="text-weight-bold q-mb-md">Titre :</span> <br />
      {{ props.sujet.titre }}
    </q-card-section>

    <q-card-section class="col">
      <span class="text-weight-bold q-mb-md">Description :</span> <br />
      {{ props.sujet.description }}
    </q-card-section>

    <q-card-section class="col-2">
      <span class="text-weight-bold q-mb-md">Niveau :</span> <br />
      {{ props.sujet.niveau }}
    </q-card-section>

    <q-card-section class="col-1 text-center">
      <span class="text-weight-bold q-mb-md">Points :</span> <br />
      {{ totalPoint(props.sujet.tests) }}
    </q-card-section>

    <q-card-section class="col-2 text-center">
      <span class="text-weight-bold q-mb-md">Durée :</span> <br />
      {{ msToTime(totalDuree(props.sujet.tests)) }}
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { Sujet } from 'src/model/Sujet.interface';
import { PropType } from 'vue';
import { msToTime } from 'src/utils/timeConvertor.util';
import { totalPoint, totalDuree } from 'src/utils/sujet.util';

const props = defineProps({
  sujet: {
    type: Object as PropType<Sujet>,
    required: true,
  },
});
</script>
