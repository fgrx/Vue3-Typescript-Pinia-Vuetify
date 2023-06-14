import IRessource from "@/interfaces/iRessource";
import useRessourceStore from "@/stores/ressourceStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export default function () {
  const ressourceStore = useRessourceStore();

  const { invalidRessources, validRessources } = storeToRefs(ressourceStore)

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
