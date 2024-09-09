import { createRouter, createWebHistory } from 'vue-router'

// Marketing Views
import HomeView from '../views/marketing/HomeView.vue'
import PricingView from '../views/marketing/PricingView.vue'
import ContactView from '../views/marketing/ContactView.vue'

// Auth Views
import LoginView from '../views/auth/LoginView.vue'
import SignUpView from '../views/auth/SignUpView.vue'

// Dashboard Views
import DashboardView from '../views/dashboard/DashboardView.vue'
import UserProfileView from '../views/dashboard/UserProfileView.vue'

// Jewelry Views
import JewelryUploadView from '../views/jewelry/JewelryUploadView.vue'
import JewelryPlacementView from '../views/jewelry/JewelryPlacementView.vue'
import ImageRefinementView from '../views/jewelry/ImageRefinementView.vue'
import ModelSelectionView from '../views/jewelry/ModelSelectionView.vue'

// Legal Views
import TermsOfServiceView from '../views/legal/TermsOfServiceView.vue'
import PrivacyPolicyView from '../views/legal/PrivacyPolicyView.vue'

// Help & Error Views
import FAQView from '../views/help/FAQView.vue'
import Error404View from '../views/errors/Error404View.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Marketing Routes
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: PricingView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },

    // Auth Routes
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },

    // Dashboard Routes
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfileView,
    },

    // Jewelry Routes
    {
      path: '/upload',
      name: 'jewelry-upload',
      component: JewelryUploadView,
    },
    {
      path: '/placement',
      name: 'jewelry-placement',
      component: JewelryPlacementView,
    },
    {
      path: '/refinement',
      name: 'image-refinement',
      component: ImageRefinementView,
    },
    {
      path: '/models',
      name: 'model-selection',
      component: ModelSelectionView,
    },

    // Legal Routes
    {
      path: '/terms',
      name: 'terms-of-service',
      component: TermsOfServiceView,
    },
    {
      path: '/privacy',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
    },

    // Help and Error Routes
    {
      path: '/faq',
      name: 'faq',
      component: FAQView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: Error404View,
    },
  ],
})

export default router