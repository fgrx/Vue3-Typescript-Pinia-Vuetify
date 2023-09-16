import { defineStore } from "pinia";
import IAuth from "@/interfaces/iAuth";
import axios from "axios";
import { AxiosError } from "axios";
import eventBus from "@/plugins/eventBus";
import { computed, ref } from "vue";

interface ICredentials {
  email: string;
  password: string;
}

export default defineStore("AuthStore", () => {

  const auth = ref<IAuth>({ email: "", accessToken: "" })

  const isConnected = computed(() => auth.value.accessToken ? true : false)

  const headers = computed(() => {
    return {
      headers: {
        Authorization: `Bearer ${auth.value.accessToken}`,
      },
    };
  })

  const connect = async (credentials: ICredentials): Promise<Boolean> => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_SERVER}/signin`,
        credentials
      );

      auth.value = {
        email: res.data.user.email,
        accessToken: res.data.accessToken,
      };

      return true;
    } catch (error) {
      const msg = error as AxiosError;
      console.log(msg.response?.data);
      eventBus.emit("show-message", {
        text: "Connexion impossible : Mauvais couple login/mot de passe",
        color: "error",
      });
      return false;
    }
  }

  const disconnect = () => {
    auth.value.accessToken = "";
    auth.value.email = "";
  }

  return { auth, connect, disconnect, isConnected, headers }

}, { persist: true });
