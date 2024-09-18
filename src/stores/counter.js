import { ref } from 'vue'
import { defineStore } from 'pinia'

export const sidebarToggle = defineStore({
  id: "toggle",
  state: () => ({ toggle: ref(true) }),
  actions: {
    isToggle() {
      this.toggle = !this.toggle;
    },
  },
  getters: {
    Check: (state) => {
      if (state.toggle === false) return "Tutup";
      return "Buka";
    },
  },
});
