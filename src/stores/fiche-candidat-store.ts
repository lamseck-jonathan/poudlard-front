import { defineStore } from 'pinia';
import { fakeFicheCandidats } from 'src/data/ficheCandidats.fake';
import { CrudAction } from 'src/enums/CrudAction.enum';
import { FicheCandidat } from 'src/model/FicheCandidat.interface';
import { UserListing } from 'src/model/User.interface';

export const useFicheCandidatStore = defineStore('ficheCandidat', {
  state: () => ({
    crudAction: CrudAction.READ,
    ficheCandidats: <FicheCandidat[]>[],
    selectedCandidat: <UserListing>{},
    formFicheCandidat: <FicheCandidat>{},
  }),

  getters: {
    isInReadMode: (state) => state.crudAction === CrudAction.READ,
    isInUpdateMode: (state) => state.crudAction === CrudAction.UPDATE,
  },

  actions: {
    initFormFicheCandidat() {
      const idx = this.ficheCandidats.findIndex(
        (el) => el.id === this.selectedCandidat.id
      );

      if (idx > -1) {
        this.formFicheCandidat = this.ficheCandidats[idx];
      } else {
        this.formFicheCandidat = {
          ...this.selectedCandidat,
          niveauAcademique: {},
          niveauFrancais: {},
          niveauAnglais: {},
        };
      }
    },

    updateFicheCandidat() {
      console.log('ficheCandidat : ', this.formFicheCandidat);
    },

    getAllFicheCandidats() {
      this.ficheCandidats = fakeFicheCandidats;
    },
  },
});
