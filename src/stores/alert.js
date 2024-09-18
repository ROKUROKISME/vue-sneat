import { ref } from "vue";
import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
    state: () => ({
        isInvalid: false,
        isMessage: ref(null),
    }),
});
