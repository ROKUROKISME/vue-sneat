import { ref } from 'vue'
import { defineStore } from 'pinia'

export const sidebarActive = defineStore({
  id: "active",
  state: () => ({ active: ref('Dashboard') }),
  actions: {
    isActive(val) {
      this.active = val;
    },
  },
  getters: {
    activeNow: (state) => {
      return state.active;
    },
  },
});
