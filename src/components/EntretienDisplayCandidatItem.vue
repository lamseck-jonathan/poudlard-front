<template>
  <div class="row q-mb-md">
    <div class="col-3 candidat-label">Nom :</div>
    <div class="col">{{ candidatModel.nom }}</div>
  </div>

  <div class="row q-mb-md">
    <div class="col-3 candidat-label">Prénom(s) :</div>
    <div class="col">{{ candidatModel.prenom }}</div>
  </div>

  <div class="row q-mb-md">
    <div class="col-3 candidat-label">Email :</div>
    <div class="col">{{ candidatModel.email }}</div>
  </div>

  <div class="row q-mb-md">
    <div class="col-3 candidat-label">Téléphone :</div>
    <div class="col">{{ candidatModel.telephone }}</div>
  </div>
</template>

<script lang="ts" setup>
import { Role } from 'src/enums/Role.enum';
import { User } from 'src/model/User.interface';
import { onMounted, PropType, ref, watch } from 'vue';

const candidatModel = ref<User>({
  id: '',
  nom: '',
  prenom: '',
  adresse: '',
  email: '',
  telephone: '',
  role: Role.CANDIDAT,
  actif: true,
});

const props = defineProps({
  candidat: {
    type: Object as PropType<User>,
    required: false,
  },
});

onMounted(() => {
  if (props.candidat) candidatModel.value = props.candidat;
});

watch(
  () => props.candidat,
  () => {
    console.log('props candidat', props.candidat);
    if (props.candidat) candidatModel.value = props.candidat;
  }
);
</script>

<style lang="scss" scoped>
.candidat-label {
  font-weight: bolder;
  text-transform: uppercase;
  margin-right: 1rem;
}
</style>
