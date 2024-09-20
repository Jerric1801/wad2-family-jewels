import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "./store/auth";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const authStore = useAuthStore(pinia);

let appMounted = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    authStore.setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    });
  } else {
    authStore.clearUser();
  }

  if (!appMounted) {
    app.mount("#app");
    appMounted = true;
  }
});
