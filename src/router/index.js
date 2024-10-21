import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "@/store/auth";

// Marketing Views
import HomeView from "../views/marketing/HomeView.vue";
import PricingView from "../views/marketing/PricingView.vue";
import ContactView from "../views/marketing/ContactView.vue";

// Auth Views
import LoginView from "../views/auth/LoginView.vue";
import SignUpView from "../views/auth/SignUpView.vue";
import PasswordResetView from "../views/auth/PasswordResetView.vue";

// Dashboard Views
import DashboardView from "../views/dashboard/DashboardView.vue";
import UserProfileView from "../views/dashboard/UserProfileView.vue";
import UserLibraryView from "../views/dashboard/UserLibraryView.vue";


// Jewelry Views
import JewelryUploadView from "../views/jewelry/JewelryUploadView.vue";
import JewelryPlacementView from "../views/jewelry/JewelryPlacementView.vue";
import ImageRefinementView from "../views/jewelry/ImageRefinementView.vue";
import ModelSelectionView from "../views/jewelry/ModelSelectionView.vue";

// Legal Views
import TermsOfServiceView from "../views/legal/TermsOfServiceView.vue";
import PrivacyPolicyView from "../views/legal/PrivacyPolicyView.vue";

// Marketplace Views
import MainMarketView from "../views/marketplace/MainMarketView.vue";

// Help & Error Views
import FAQView from "../views/help/FAQView.vue";
import Error404View from "../views/errors/Error404View.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Marketing Routes
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pricing",
      name: "pricing",
      component: PricingView,
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactView,
    },

    // Auth Routes
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/password-reset",
      name: "password-reset",
      component: PasswordResetView,
    },

    // Dashboard Routes
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: "/library",
      name: "library",
      component: UserLibraryView,
      meta: { requiresAuth: true },
    },

    // Jewelry Routes
    {
      path: "/upload",
      name: "jewelry-upload",
      component: JewelryUploadView,
      meta: { requiresAuth: true },
    },
    {
      path: "/placement",
      name: "jewelry-placement",
      component: JewelryPlacementView,
      meta: { requiresAuth: true },
    },
    {
      path: "/refinement",
      name: "image-refinement",
      component: ImageRefinementView,
      meta: { requiresAuth: true },
    },
    {
      path: "/models",
      name: "model-selection",
      component: ModelSelectionView,
      meta: { requiresAuth: true },
    },

    // Legal Routes
    {
      path: "/terms",
      name: "terms-of-service",
      component: TermsOfServiceView,
    },
    {
      path: "/privacy",
      name: "privacy-policy",
      component: PrivacyPolicyView,
    },

    // Marketplace Routes
    {
      path: "/marketplace",
      name: "marketplace",
      component: MainMarketView,
    },

    // Help and Error Routes
    {
      path: "/faq",
      name: "faq",
      component: FAQView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: Error404View,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !user) {
      next("/login");
    } else {
      next();
    }
  });
});

export default router;
