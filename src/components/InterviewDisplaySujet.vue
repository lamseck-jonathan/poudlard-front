<template>
  <q-card class="row">
    <q-card-section class="col">
      {{ props.sujet.titre }}
    </q-card-section>

    <q-card-section class="col">
      {{ props.sujet.description }}
    </q-card-section>

    <q-card-section class="col-2">
      {{ props.sujet.niveau }}
    </q-card-section>

    <q-card-section class="col-1 text-center">
      {{ totalPoint(props.sujet.tests) }}
    </q-card-section>

    <q-card-section class="col-2 text-center">
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
