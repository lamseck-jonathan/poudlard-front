<template>
  <q-card>
    <q-card-section class="row">
      <div class="col">
        <span class="text-weight-bold text-primary q-mr-md">Nom : </span>
        <span>{{ props.candidat?.nom }}</span>
      </div>

      <div class="col">
        <span class="text-weight-bold text-primary q-mr-md">Email : </span>
        <span>{{ props.candidat?.email }}</span>
      </div>
    </q-card-section>

    <q-card-section class="row">
      <div class="col">
        <span class="text-weight-bold text-primary q-mr-md">Prénom : </span>
        <span>{{ props.candidat?.prenom }}</span>
      </div>

      <div class="col">
        <span class="text-weight-bold text-primary q-mr-md">Contact : </span>
        <span>{{ props.candidat?.telephone }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { User } from 'src/model/User.interface';
import { PropType } from 'vue';

const props = defineProps({
  candidat: {
    type: Object as PropType<User>,
    required: false,
  },
});
</script>
