<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin neo_popup">
      <!-- header  -->
      <q-card-section class="row items-center q-pb-sm">
        <div class="text-h5 text-uppercase">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <!-- body  -->
      <q-card-section> {{ message }} </q-card-section>
      <!-- footer  -->
      <q-card-actions align="right" class="popup_footer">
        <q-btn
          unelevated
          rounded
          padding="8px lg"
          color="blue-10"
          v-if="actionButtons.includes(PopupButton.CANCEL)"
          :label="'Annuler'"
          @click="onClickBtn(PopupButton.CANCEL)"
        />
        <q-btn
          unelevated
          rounded
          padding="8px lg"
          color="blue-10"
          v-if="actionButtons.includes(PopupButton.NO)"
          :label="'Non'"
          @click="onClickBtn(PopupButton.NO)"
        />
        <q-btn
          unelevated
          rounded
          padding="8px lg"
          color="primary"
          v-if="actionButtons.includes(PopupButton.YES)"
          :label="'Oui'"
          @click="onClickBtn(PopupButton.YES)"
        />
        <q-btn
          unelevated
          rounded
          padding="8px lg"
          color="primary"
          v-if="actionButtons.includes(PopupButton.OK)"
          :label="'OK'"
          @click="onClickBtn(PopupButton.OK)"
        />
        <q-btn
          unelevated
          rounded
          padding="8px lg"
          color="primary"
          v-if="actionButtons.includes(PopupButton.DOWNLOAD)"
          :label="'Télécharger'"
          @click="onClickBtn(PopupButton.DOWNLOAD)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { PopupButton, PopupType } from 'src/enums/Popup.enum';
import { onMounted, PropType, ref } from 'vue';

const actionButtons = ref<PopupButton[]>([]);
const borderColor = ref<string>('var(--q-primary)');
const props = defineProps({
  title: {
    required: false,
    type: String,
  },
  message: {
    required: false,
    type: String,
  },
  buttons: {
    required: false,
    type: Array as PropType<Array<PopupButton>>,
    default: () => [],
  },
  popupType: {
    required: false,
    type: String as PropType<PopupType>,
    default: PopupType.INFO,
  },
});

onMounted(() => {
  switch (props.popupType) {
    case PopupType.ERROR:
      actionButtons.value = [PopupButton.OK];
      borderColor.value = 'var(--q-negative)';
      break;
    case PopupType.CONFIRMATION:
      actionButtons.value = [PopupButton.YES, PopupButton.NO];
      break;
    case PopupType.WARNING:
      actionButtons.value = props.buttons;
      borderColor.value = 'var(--q-warning)';
      break;
    default:
      actionButtons.value = props.buttons;
      break;
  }
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits,
]);

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*.../* }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

function onClickBtn(btnType: PopupButton) {
  onDialogOK({ clicked: btnType });
}
</script>

<style lang="scss" scoped>
.neo_popup {
  border-left: 6px solid;
  border-left-color: v-bind(borderColor);
  width: 600px;
  .popup_footer {
    background-color: #97a2b1;
    border-radius: 0;
  }
}
</style>
