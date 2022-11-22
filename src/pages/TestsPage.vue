<template>
  <q-page class="q-pt-md">
    <div class="row justify-end q-gutter-x-md" style="margin-bottom: 2rem">
      <q-input
        v-model="searchValue"
        label="Rechercher"
        type="search"
        hide-bottom-space
        outlined
        dense
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-btn class="q-px-lg" color="primary" label="ajouter" unelevated />
    </div>

    <q-list class="q-gutter-y-md">
      <test-item-display
        v-for="test in filteredTests"
        :test="test"
        :key="test.id"
      />
    </q-list>
  </q-page>
</template>

<script lang="ts" setup>
import TestItemDisplay from 'src/components/TestItemDisplay.vue';
import { fakeTestList } from 'src/data/tests.fake';
import { Test } from 'src/model/Test.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { stringInclude } from 'src/utils/string.util';
import { msToTime } from 'src/utils/timeConvertor.util';
import { computed, onMounted, ref } from 'vue';

const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'quiz',
    title: 'test',
    routeName: 'test',
    path: '/tests',
  });
});

const searchValue = ref<string>('');

const filteredTests = computed(() => {
  return tests.filter(
    (el) =>
      stringInclude(el.id, searchValue.value) ||
      stringInclude(el.titre, searchValue.value) ||
      stringInclude(el.type, searchValue.value) ||
      stringInclude(el.categorie, searchValue.value) ||
      stringInclude(String(el.bareme), searchValue.value) ||
      stringInclude(msToTime(el.duree), searchValue.value)
  );
});

const tests: Test[] = [...fakeTestList];
</script>
