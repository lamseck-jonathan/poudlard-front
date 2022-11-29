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
        @click="() => onAddTest()"
        unelevated
      />
    </div>

    <q-list class="q-gutter-y-md">
      <test-item-display
        v-for="test in filteredTests"
        :test="test"
        :key="test.id"
        @click:show="onShowTest"
        @click:edit="onEditTest"
        @click:delete="onDeleteTest"
      />
    </q-list>

    <base-modal v-model="showTestModal" title="Formulaire test" width="800px">
      <form-test
        v-model="testModel"
        :mode="testCrudAction"
        @submit="onFormSubmit"
      />
    </base-modal>
  </q-page>
</template>

<script lang="ts" setup>
import FormTest from 'src/components/FormTest.vue';
import TestItemDisplay from 'src/components/TestItemDisplay.vue';
import BaseModal from 'src/components/BaseModal.vue';
import { useConfirmationPopup } from 'src/composables/Popup.composable';
import { PopupButton } from 'src/enums/Popup.enum';
import { Test } from 'src/model/Test.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { stringInclude } from 'src/utils/string.util';
import { msToTime } from 'src/utils/timeConvertor.util';
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useTestStore } from 'src/stores/test-store';
import { CrudAction } from 'src/enums/CrudAction.enum';
import getEmptyTestModel from 'src/utils/getEmptyTest.util';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore/lite';
import { firebaseApp } from 'src/firebase';

/*-------- MainLayout Store --------*/

const mainLayoutStore = useMainLayoutStore();
const testStore = useTestStore();
const db = getFirestore(firebaseApp);

onMounted(async () => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'quiz',
    title: 'test',
    routeName: 'test',
    path: '/tests',
  });
});

/*-------- Search Operation --------*/

onBeforeMount(() => {
  testStore.fetchTestList();
});

const searchValue = ref<string>('');

const tests = computed(() => {
  return testStore.tests;
});

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

/*-------- Modal Handler --------*/
const showTestModal = ref<boolean>(false);

function closeModal() {
  showTestModal.value = false;
}
/*-------- Test Crud Operation --------*/

//const tests = ref<Test[]>([...fakeTestList]);
const testCrudAction = ref<CrudAction>(CrudAction.CREATE);
const testModel = ref<Test>(getEmptyTestModel());

async function addTest(testItem: Test) {
  const addResult = await addDoc(collection(db, 'test'), testItem);
  const docRef = doc(db, 'test', addResult.id);
  await updateDoc(docRef, {
    id: addResult.id,
  });
  const docSnap = await getDoc(docRef);
  const newTest: Test = docSnap.data() as Test;
  testStore.tests.push(newTest);
  console.log(testStore.tests);
}

async function updateTest(testItem: Test) {
  const docRef = doc(db, 'test', testItem.id);
  await updateDoc(docRef, {
    ...testItem,
  });
}

/**
 * @desc handle opening form
 */
function openTestForm(mode: CrudAction) {
  testModel.value = getEmptyTestModel();
  testCrudAction.value = mode;
  showTestModal.value = true;
}

/**
 * @desc handle on add test
 */
function onAddTest() {
  openTestForm(CrudAction.CREATE);
}

/**
 * @desc handle on edit test
 */
function onEditTest(test: Test) {
  openTestForm(CrudAction.UPDATE);
  testModel.value = test;
}

/**
 * @desc handle on show test
 */
function onShowTest(test: Test) {
  openTestForm(CrudAction.READ);
  testModel.value = test;
}

/**
 * @desc handling on form submit event
 */
function onFormSubmit() {
  switch (testCrudAction.value) {
    case CrudAction.CREATE:
      //Add test
      addTest(testModel.value);
      //tests.value.push(testModel.value);
      closeModal();
      break;

    case CrudAction.UPDATE:
      //update test
      updateTest(testModel.value);
      const idx = tests.value.findIndex((el) => el.id === testModel.value.id);
      tests.value[idx] = testModel.value;
      closeModal();
      break;

    default:
      break;
  }
}

/**
 * @desc handle on delete test
 */
function onDeleteTest(test: Test) {
  const { confirmationPopup } = useConfirmationPopup(
    'Confirmation',
    'Voulez vous vraiment supprimer définitivement cette élément de la base ?'
  );

  confirmationPopup.onOk(async ({ clicked }) => {
    if (clicked === PopupButton.YES) {
      console.log('delete', test);
      await deleteDoc(doc(db, 'test', test.id));
    }
  });
}
</script>
