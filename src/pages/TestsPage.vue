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

    <base-modal v-model="showAddModal" title="Formulaire test" width="800px">
      <form-add-test
        v-model="testModel"
        :mode="testCrudAction"
        @submit="onFormSubmit"
      />
    </base-modal>
  </q-page>
</template>

<script lang="ts" setup>
import FormAddTest from 'src/components/FormAddTest.vue';
import TestItemDisplay from 'src/components/TestItemDisplay.vue';
import BaseModal from 'src/components/BaseModal.vue';
import { useConfirmationPopup } from 'src/composables/Popup.composable';
import { fakeTestList } from 'src/data/tests.fake';
import { PopupButton } from 'src/enums/Popup.enum';
import { Test } from 'src/model/Test.interface';
import { useMainLayoutStore } from 'src/stores/main-layout-store';
import { stringInclude } from 'src/utils/string.util';
import { msToTime } from 'src/utils/timeConvertor.util';
import { computed, onMounted, ref } from 'vue';
import { CrudAction } from 'src/enums/CrudAction.enum';
import getEmptyTestModel from 'src/utils/getEmptyTest.util';

/*-------- MainLayout Store --------*/

const mainLayoutStore = useMainLayoutStore();

onMounted(() => {
  mainLayoutStore.setNavBarpageInfo({
    icon: 'quiz',
    title: 'test',
    routeName: 'test',
    path: '/tests',
  });
});

/*-------- Search Operation --------*/

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

/*-------- Modal Handler --------*/
const showAddModal = ref<boolean>(false);

function onFormSubmit() {
  switch (testCrudAction.value) {
    case CrudAction.CREATE:
      console.log('CREATE', testModel.value);

      break;
    case CrudAction.READ:
      break;

    case CrudAction.UPDATE:
      console.log('UPTADE', testModel.value);
      break;

    default:
      break;
  }
}
/*-------- Test Crud Operation --------*/

const tests = ref<Test[]>([...fakeTestList]);
const testCrudAction = ref<CrudAction>(CrudAction.CREATE);
const testModel = ref<Test>(getEmptyTestModel());

/**
 * @desc handle opening form
 */
function openTestForm(mode: CrudAction) {
  testCrudAction.value = mode;
  showAddModal.value = true;
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
  testModel.value = getEmptyTestModel();
  openTestForm(CrudAction.UPDATE);

  testModel.value = test;
}

/**
 * @desc handle on show test
 */
function onShowTest(test: Test) {
  testModel.value = getEmptyTestModel();
  openTestForm(CrudAction.READ);

  testModel.value = test;
}

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
</script>
