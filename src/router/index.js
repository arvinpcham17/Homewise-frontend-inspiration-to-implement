import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "../pages/LandingPage.vue";
import AppHomePage from "../pages/AppHomePage.vue";
import DescribeIssuePage from "../pages/DescribeIssuePage.vue";
import DiagnosisPage from "../pages/DiagnosisPage.vue";
import MatchedProsPage from "../pages/MatchedProsPage.vue";
import BookingPage from "../pages/BookingPage.vue";
import ConfirmationPage from "../pages/ConfirmationPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import ProfessionalDashboardPage from "../pages/ProfessionalDashboardPage.vue";
import UserJobDetailPage from "../pages/UserJobDetailPage.vue";
import ProfessionalJobDetailPage from "../pages/ProfessionalJobDetailPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import ProfessionalAuthPage from "../pages/ProfessionalAuthPage.vue";

const routes = [
  {
  path: "/sign-in",
  name: "SignIn",
  component: SignInPage,
  },
  {
  path: "/sign-up",
  name: "SignUp",
  component: SignUpPage,
  },
  {
    path: "/",
    name: "Landing",
    component: LandingPage,
  },
  {
    path: "/app",
    name: "AppHome",
    component: AppHomePage,
  },
  {
    path: "/app/describe",
    name: "DescribeIssue",
    component: DescribeIssuePage,
  },
  {
    path: "/app/diagnosis",
    name: "Diagnosis",
    component: DiagnosisPage,
  },
  {
    path: "/app/pros",
    name: "MatchedPros",
    component: MatchedProsPage,
  },
  {
    path: "/app/booking",
    name: "Booking",
    component: BookingPage,
  },
  {
    path: "/app/confirmation",
    name: "Confirmation",
    component: ConfirmationPage,
  },
  {
    path: "/app/dashboard",
    name: "Dashboard",
    component: DashboardPage,
  },
  {
    path: "/app/job",
    name: "UserJobDetail",
    component: UserJobDetailPage,
  },
  {
    path: "/pro",
    name: "ProfessionalDashboard",
    component: ProfessionalDashboardPage,
  },
  {
    path: "/pro/job",
    name: "ProfessionalJobDetail",
    component: ProfessionalJobDetailPage,
  },
  {
  path: "/pro/auth",
  name: "ProfessionalAuthPage",
  component: ProfessionalAuthPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;