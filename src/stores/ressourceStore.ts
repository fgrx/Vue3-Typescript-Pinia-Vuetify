import IRessource from "@/interfaces/iRessource";
import { defineStore } from "pinia";
import ressourceService from "@/services/ressourceService";
import { computed, ref } from "vue";

const useRessourceStore = defineStore("ressourceStore", () => {

  const ressources = ref<IRessource[]>([])

  const validRessources = computed(() => ressources.value.filter((ressource) => ressource.isValid))
  const invalidRessources = computed(() => ressources.value.filter((ressource) => !ressource.isValid))




  const loadRessources = async () => {
    // const ressourcesLoaded = await ressourceService.getRessources();
    // this.ressources = ressourcesLoaded;

    ressourceService
      .getRessources()
      .then((results) => (ressources.value = results));
  }

  const addRessource = async (ressource: IRessource): Promise<IRessource | false> => {
    const newRessource = await ressourceService.addRessource(ressource);
    if (newRessource) {
      ressources.value.unshift(newRessource);
    }
    return newRessource;
  }


  const deleteRessource = async (ressourceToDelete: IRessource) => {
    const res = await ressourceService.deleteRessource(ressourceToDelete);

    if (res) {
      ressources.value = ressources.value.filter(
        (ressource) => ressource.id !== ressourceToDelete.id
      );
    }
  }


  const updateRessource = async (ressource: IRessource) => {
    const res = await ressourceService.updateRessource(ressource);

    if (res) {
      const index = ressources.value.indexOf(ressource);
      ressources.value[index] = ressource;
    }
  }

  return { ressources, invalidRessources, validRessources, addRessource, deleteRessource, updateRessource, loadRessources }

});

export default useRessourceStore;
