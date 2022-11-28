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
        <q-item-label class="text-subtitle1 text-primary">{{
          test ? msToTime(test.duree) : '00:00:00'
        }}</q-item-label>
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
import { msToTime } from 'src/utils/timeConvertor.util';
import { PropType } from 'vue';
import { Test } from '../model/Test.interface';

defineProps({
  test: { type: Object as PropType<Test> },
});
</script>
