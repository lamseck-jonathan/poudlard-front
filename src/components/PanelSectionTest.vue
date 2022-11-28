<template>
  <q-card class="q-px-md w-full" style="height: 100%">
    <q-item>
      <q-item-section avatar>
        <q-icon size="30px" color="primary" name="help_outline" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-h6">Question</q-item-label>
      </q-item-section>
      <div class="row items-center q-gutter-x-sm">
        <q-icon size="30px" color="primary" name="access_time" />
        <q-item-label class="text-subtitle1">Temps restant : </q-item-label>
        <q-item-label
          :class="
            isAboutToEnd
              ? 'text-subtitle1 alert-text q-px-sm'
              : 'text-subtitle1 text-primary q-px-sm'
          "
          >{{ test ? timer : '00:00:00' }}</q-item-label
        >
      </div>
    </q-item>
    <q-separator />
    <q-card-section>
      <p class="text-subtitle1 text-weight-bold">{{ test?.titre }}</p>
      <p class="text-subtitle1">{{ test?.description }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useErrorPopup } from 'src/composables/Popup.composable';
import { PopupButton } from 'src/enums/Popup.enum';
import { msToTime } from 'src/utils/timeConvertor.util';
import { computed, onMounted, PropType, ref, watch } from 'vue';
import { Test } from '../model/Test.interface';

const dureeModel = ref<number>(10000);
const allSetTimeOutId = ref<NodeJS.Timeout[]>([]);

const emit = defineEmits(['click:next-question']);
const props = defineProps({
  test: { type: Object as PropType<Test>, required: true },
});

const timer = computed(() => {
  return msToTime(dureeModel.value);
});

const isAboutToEnd = computed(() => {
  return dureeModel.value < props.test.duree / 3 || dureeModel.value < 10000;
});

onMounted(() => {
  dureeModel.value = props.test.duree;
  launchTimer(getTimeList());
});

watch(
  () => props.test,
  () => {
    clearAllTimeoutCache();
    allSetTimeOutId.value = [];

    dureeModel.value = props.test.duree;
    launchTimer(getTimeList());
  }
);

watch(
  () => dureeModel.value,
  () => {
    if (dureeModel.value === 0) {
      onTimeIsOut();
    }
  }
);

/**
 * @desc calc the suit value of timeout time for timer
 */
function getTimeList() {
  const allTimes: number[] = [];
  let time = dureeModel.value;

  while (time > 0) {
    allTimes.push(time);
    time -= 1000;
  }

  return allTimes.reverse();
}

/**
 * @desc start timer countdown
 */
function launchTimer(suitOfTime: number[]) {
  for (const t of suitOfTime) {
    const id = setTimeout(() => {
      dureeModel.value = dureeModel.value - 1000;
    }, t);

    allSetTimeOutId.value.push(id);
  }
}

/**
 * @desc clear all time out cache
 */
function clearAllTimeoutCache() {
  allSetTimeOutId.value.forEach((el) => {
    clearTimeout(el);
  });
}

function onTimeIsOut() {
  const { errorPopup } = useErrorPopup(
    'INFORMATION',
    'Le chrono est passé, prenez un moment si vous en avez besoin. Cliquez sur "continuer" pour continuer le test.',
    'Question suivante',
    true
  );

  errorPopup.onOk(({ clicked }) => {
    if (clicked === PopupButton.OK) {
      emit('click:next-question');
    }
  });
}
</script>

<style lang="scss" scoped>
.alert-text {
  background: red;
  color: white;
}
</style>
