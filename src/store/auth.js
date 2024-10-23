import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
