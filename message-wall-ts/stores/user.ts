import { defineStore } from "pinia";

export const useCounterStore = defineStore("user", {
  state: () => {
    return {
      avatar: "https://3yya.com/logo-mini.png",
    };
  },
});
