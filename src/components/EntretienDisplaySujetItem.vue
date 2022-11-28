<template>
  <div class="row q-mb-md">
    <div class="col-2 sujet-label">Titre :</div>
    <div class="col">{{ sujetModel.titre }}</div>
  </div>

  <div class="row q-mb-md">
    <div class="col-2 sujet-label">Description :</div>
    <div class="col">{{ sujetModel.description }}</div>
  </div>

  <div class="row q-mb-md">
    <div class="col-2 sujet-label">Niveau :</div>
    <div class="col">{{ sujetModel.niveau }}</div>
  </div>

  <div class="row q-mb-md">
    <div class="col-2 sujet-label">Total Durées :</div>
    <div class="col">{{ sujetModel.totalDuree }}</div>
  </div>

  <div class="row q-mb-md">
    <div class="col-2 sujet-label">Total Points :</div>
    <div class="col">{{ sujetModel.totalPoint }}</div>
  </div>
</template>

<script lang="ts" setup>
import { Niveau } from 'src/enums/Niveau.enum';
import { SujetListing } from 'src/model/Sujet.interface';
import { totalDuree, totalPoint } from 'src/utils/sujet.util';
import { msToTime } from 'src/utils/timeConvertor.util';
import { onMounted, PropType, ref, watch } from 'vue';

const sujetModel = ref<SujetListing>({
  id: '',
  titre: '',
  description: '',
  niveau: Niveau.DEBUTANT,
  tests: [],
  totalPoint: 0,
  totalDuree: '00:00:00',
});

const props = defineProps({
  sujet: {
    type: Object as PropType<SujetListing>,
    required: false,
  },
});

onMounted(() => {
  if (props.sujet) {
    sujetModel.value = props.sujet;
    sujetModel.value.totalDuree = msToTime(totalDuree(props.sujet.tests));
    sujetModel.value.totalPoint = totalPoint(props.sujet.tests);
  }
});

watch(
  () => props.sujet,
  () => {
    if (props.sujet) {
      sujetModel.value = props.sujet;
      sujetModel.value.totalDuree = msToTime(totalDuree(props.sujet.tests));
      sujetModel.value.totalPoint = totalPoint(props.sujet.tests);
    }
  }
);
</script>

<style lang="scss" scoped>
.sujet-label {
  font-weight: bolder;
  text-transform: uppercase;
  margin-right: 1rem;
}
</style>
