<template>
  <base-expandable-item>
    <template #header>
      <div :class="`col-4 text-left ${!isTrue ? 'text-red' : ''}`">
        {{ props.reponse?.test.titre }}
      </div>
      <div :class="`col-4 text-center ${!isTrue ? 'text-red' : ''}`">
        {{ props.reponse?.test.categorie }}
      </div>
      <div :class="`col-1 text-center ${!isTrue ? 'text-red' : ''}`">
        {{ props.reponse?.test.type }}
      </div>
      <div :class="`col-1 text-center ${!isTrue ? 'text-red' : ''}`">
        {{ props.reponse?.test.bareme }}
      </div>
      <div :class="`col-2 text-center ${!isTrue ? 'text-red' : ''}`">
        {{ msToTime(props.reponse?.test.duree || 0) }}
      </div>
    </template>

    <template #body>
      <q-card-section>
        <span class="text-weight-bold q-mr-md">Question : </span>
        {{ props.reponse.test.description }}
      </q-card-section>

      <q-card-section>
        <div class="text-weight-bold q-mr-md q-mb-md">
          Reponse du candidat :
        </div>
        <div
          class="q-mb-sm"
          v-html="displayReponseCandidat(props.reponse)"
        ></div>
      </q-card-section>
    </template>
  </base-expandable-item>
</template>

<script lang="ts" setup>
import BaseExpandableItem from './BaseExpandableItem.vue';
import { computed, PropType } from 'vue';
import { ReponseCandidat } from 'src/model/Reponse.interface';
import { msToTime } from 'src/utils/timeConvertor.util';
import { TestType } from 'src/enums/TestType.enum';

const props = defineProps({
  reponse: {
    type: Object as PropType<ReponseCandidat>,
    required: true,
  },
});

const isTrue = computed(() => {
  switch (props.reponse.test.type) {
    case TestType.QCMU:
      return props.reponse.reponseQCMU?.isTrue;

    case TestType.QCMM:
      let isOk = true;
      for (const res of props.reponse.reponseQCMM || []) {
        if (res.isTrue === false) isOk = false;
      }
      return isOk;

    case TestType.QR:
      return props.reponse.test.reponse === props.reponse.reponseQR;

    default:
      return true;
  }
});

function displayReponseCandidat(reponse: ReponseCandidat) {
  if (reponse.test.type === TestType.QR) {
    return reponse.reponseQR ? reponse.reponseQR : '(pas de reponse)';
  } else if (reponse.test.type === TestType.QCMU) {
    return reponse.reponseQCMU
      ? `${reponse.reponseQCMU.reponse} <span class="q-mr-md"> => ${
          reponse.reponseQCMU.isTrue
            ? '<b>Bonne réponse</b>'
            : '<b>Mauvaise réponse</b>'
        } </span>`
      : 'pas de reponse';
  } else {
    if (reponse.reponseQCMM) {
      let concat = '';
      for (const res of reponse.reponseQCMM) {
        concat += `- ${res.reponse} <span class="q-mr-md"> =>  ${
          res.isTrue ? '<b>Bonne réponse</b>' : '<b>Mauvaise réponse</b>'
        } </span> <br/>`;
      }

      return concat;
    } else return 'pas de reponse';
  }
}
</script>
