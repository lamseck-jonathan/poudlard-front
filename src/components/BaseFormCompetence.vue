<template>
  <div class="row items-center">
    <div class="col-1 text-center text-weight-bold">
      {{ props.competenceNumber }}
    </div>
    <q-input
      class="col q-pr-sm"
      v-model="competenceModel.langage"
      label="Langage de programmation"
      :readonly="props.readonly"
      hide-bottom-space
      outlined
      dense
    />
    <q-input
      class="col q-pl-sm q-pr-sm"
      v-model="competenceModel.anneeExperience"
      label="Nombre d'année d'expérience"
      type="number"
      :readonly="props.readonly"
      hide-bottom-space
      outlined
      dense
    />
    <q-select
      class="col q-pl-sm"
      v-model="competenceModel.niveau"
      :options="NiveauExperienceOptions"
      label="Niveau d'expérience"
      :readonly="props.readonly"
      hide-bottom-space
      outlined
      dense
    />
  </div>
</template>

<script lang="ts" setup>
import { Niveau } from 'src/enums/Niveau.enum';
import { Competence } from 'src/model/FicheCandidat.interface';
import { computed, PropType } from 'vue';

const NiveauExperienceOptions: Niveau[] = [
  Niveau.DEBUTANT,
  Niveau.INTERMEDIAIRE,
  Niveau.AVANCE,
  Niveau.EXPERT,
];

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  competenceNumber: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Object as PropType<Competence>,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const competenceModel = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>
