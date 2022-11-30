<!-- <base-expandable-item>
    <template #header>
      <div class="col-4 text-left">{{ props.reponse?.test.titre }}</div>
      <div class="col-4 text-center">{{ props.reponse?.test.categorie }}</div>
      <div class="col-1 text-center">{{ props.reponse?.test.type }}</div>
      <div class="col-1 text-center">{{ props.reponse?.test.bareme }}</div>
      <div class="col-2 text-center">
        {{ msToTime(props.reponse?.test.duree || 0) }}
      </div>
    </template>

    <template #body>
      <q-card-section class="row" style="padding-bottom: 0.5rem">
        <div class="col-3 q-pr-lg">
          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Id :</span>
            <span class="text-justify">{{ props.reponse?.test.id }}</span>
          </div>

          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Titre :</span>
            <span class="text-justify">{{ props.reponse?.test.titre }}</span>
          </div>
        </div>

        <div class="col-3 q-pr-lg">
          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Type :</span>
            <span class="text-justify">{{ props.reponse?.test.type }}</span>
          </div>

          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Categorie :</span>
            <span class="text-justify">{{
              props.reponse?.test.categorie
            }}</span>
          </div>
        </div>

        <div class="col-4 q-pr-lg">
          <div class="text-weight-bold q-mr-lg q-mb-sm">Description :</div>
          <div>{{ props.reponse?.test.description }}</div>
        </div>

        <div class="col-2">
          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Point :</span>
            <span class="text-justify">{{ props.reponse?.test.bareme }}</span>
          </div>

          <div class="q-mb-sm">
            <span class="text-weight-bold q-mr-lg">Durée :</span>
            <span class="text-justify">{{
              msToTime(props.reponse?.test.duree || 0)
            }}</span>
          </div>
        </div>
      </q-card-section>
    </template>
  </base-expandable-item> -->
