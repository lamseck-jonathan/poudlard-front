<template>
  <q-expansion-item
    bordered
    switch-toggle-side
    expand-separator
    icon="quiz"
    :label="test.id + '. ' + test.test_libelle"
    style="border: 1px solid #ababab; border-radius: 5px"
  >
    <q-card style="border-radius: 0 0 5px 5px; border-top: 1px solid #ababab">
      <q-card-section>
        <div class="row">
          <p class="col-3">
            {{ test?.test_categorie }}
          </p>
          <p class="col-9">
            {{ test?.test_bareme }}
          </p>
        </div>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import Test from 'src/models/Test';
import { PropType } from 'vue';
defineProps({
  test: { type: Object as PropType<Test>, required: true },
});
</script>
