import IRessource from "@/interfaces/iRessource";
import useRessourceStore from "@/stores/ressourceStore";
import { computed } from "vue";

export default function () {
  const ressourceStore = useRessourceStore();

  const validRessources = computed(() => ressourceStore.validRessources);

  const invalidRessources = computed(() => ressourceStore.invalidRessources);

  const deleteRessourceAction = (ressource: IRessource) =>
    ressourceStore.deleteRessource(ressource);

  const validateRessourceAction = (ressource: IRessource) => {
    ressource.isValid = true;
    ressourceStore.updateRessource(ressource);
  };

  return {
    invalidRessources,
    validRessources,
    validateRessourceAction,
    deleteRessourceAction,
  };
}
