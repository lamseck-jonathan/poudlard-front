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
import { TestType } from 'src/enums/TestType.enum';
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

const tests: Test[] = [
  {
    id: '1',
    titre: 'Js Callback',
    description: 'Decrivez ce que vous entendez par Callback ',
    categorie: 'JAVASCRIPT',
    duree: 30000,
    bareme: 4,
    type: TestType.QCMM,
    choix: [
      {
        id: 1,
        reponse: "C'est rien",
        isTrue: false,
      },
      {
        id: 2,
        reponse:
          "C'est une fonction envoyé en paramètre d'une autre fonction puis appeler plus tard dans la fonction mère",
        isTrue: true,
      },
      {
        id: 3,
        reponse: "C'est CB",
        isTrue: false,
      },
    ],
  },
  {
    id: '2',
    titre: 'Js Promise',
    description: 'Decrivez ce que vous entendez par Promise',
    categorie: 'JAVASCRIPT',
    duree: 22000,
    bareme: 3,
    type: TestType.QCMU,
    choix: [
      {
        id: 1,
        reponse: "C'est rien",
        isTrue: false,
      },
      {
        id: 2,
        reponse: "C'est un callBack",
        isTrue: true,
      },
      {
        id: 3,
        reponse: "C'est une variable utilisé pour gerer les appels asynchrones",
        isTrue: false,
      },
    ],
  },
  {
    id: '3',
    titre: 'Fonctions et interfaces',
    description:
      'Répondez par vrai ou faux. Dans une Interface, on ne déclare que les signatures de ses fonctions ?',
    categorie: 'POO',
    duree: 30000,
    bareme: 5,
    reponse: 'vrai',
    type: TestType.QR,
  },
  {
    id: '4',
    titre: 'Références en PHP',
    description:
      "Ecrivez le caractère utilisé pour effectuer une passage par référence d'une variable en PHP.",
    categorie: 'PHP',
    duree: 15000,
    bareme: 3,
    type: TestType.QR,
    reponse: '&',
  },
];
</script>
