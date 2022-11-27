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

      <q-btn
        class="q-px-lg"
        color="primary"
        label="ajouter"
        @click="() => (showAddModal = true)"
        unelevated
      />
    </div>

    <q-list class="q-gutter-y-md">
      <test-item-display
        v-for="test in filteredTests"
        :test="test"
        :key="test.id"
        @click:show="onShowTest"
        @click:delete="onDeleteTest"
      />
    </q-list>

    <base-modal v-model="showAddModal" title="Formulaire test" width="800px">
      <form-add-test></form-add-test>
    </base-modal>
  </q-page>
</template>

<script lang="ts" setup>
import FormAddTest from 'src/components/FormAddTest.vue';
import TestItemDisplay from 'src/components/TestItemDisplay.vue';
import BaseModal from 'src/components/BaseModal.vue';
import { useConfirmationPopup } from 'src/composables/Popup.composable';
//import { fakeTestList } from 'src/data/tests.fake';
import { PopupButton } from 'src/enums/Popup.enum';
import { Test } from 'src/model/Test.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { stringInclude } from 'src/utils/string.util';
import { msToTime } from 'src/utils/timeConvertor.util';
import { computed, onMounted, ref } from 'vue';
import { useTestStore } from 'src/stores/test-store';
import { doc, getDoc, getFirestore } from 'firebase/firestore/lite';
import { firebaseApp } from 'src/firebase';

const mainLayoutStore = useMainLayoutStore();
const testStore = useTestStore();

onMounted(async () => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'quiz',
    title: 'test',
    routeName: 'test',
    path: '/tests',
  });
});
const db = getFirestore(firebaseApp);

const searchValue = ref<string>('');

const filteredTests = computed(() => {
  return tests.value.filter(
    (el) =>
      stringInclude(el.id, searchValue.value) ||
      stringInclude(el.titre, searchValue.value) ||
      stringInclude(el.type, searchValue.value) ||
      stringInclude(el.categorie, searchValue.value) ||
      stringInclude(String(el.bareme), searchValue.value) ||
      stringInclude(msToTime(el.duree), searchValue.value)
  );
});

testStore.fetchTestList();

const tests = computed(() => {
  return testStore.tests;
});

/**
 * @desc handle on delete test
 */
function onDeleteTest(test: Test) {
  const { confirmationPopup } = useConfirmationPopup(
    'Confirmation',
    'Voulez vous vraiment supprimer définitivement cette élément de la base ?'
  );

  confirmationPopup.onOk(({ clicked }) => {
    if (clicked === PopupButton.YES) {
      const idx = tests.value.findIndex((el) => el.id === test.id);

      if (idx > -1) {
        tests.value.splice(idx, 1); // delete test from array
      }
    }
  });
}

async function onShowTest(test: Test) {
  console.log(test);
  const docRef = doc(db, 'test', test.id);
  const docSnap = await getDoc(docRef);
  const showTest: Test = docSnap.data() as Test;
  console.log(showTest);
}

const showAddModal = ref<boolean>(false);
</script>
