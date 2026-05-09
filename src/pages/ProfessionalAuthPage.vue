<template>
  <main class="authPage">
    <HomewiseNavbar
      :left-links="[
        { label: 'Services', to: '/app' },
        { label: 'Customer site', to: '/' },
        { label: 'About', to: '/' }
      ]"
      :right-links="[
        { label: 'Help', to: '#' }
      ]"
      :primary-action="{ label: mode === 'login' ? 'Join as pro' : 'Pro login', to: '#' }"
      @click="toggleMode"
    />

    <section class="authSection">
      <div class="authText">
        <p class="eyebrow">For professionals</p>

        <h1>Get repair jobs from local homeowners.</h1>

        <p>
          Review customer requests, see AI repair summaries, accept jobs, update status,
          and manage your Homewise work from one clean dashboard.
        </p>

        <div class="featureGrid">
          <div>
            <span>📥</span>
            <strong>Incoming requests</strong>
            <p>See issue details, photos, urgency, and customer notes.</p>
          </div>

          <div>
            <span>🗓️</span>
            <strong>Manage jobs</strong>
            <p>Accept, mark on the way, and complete jobs.</p>
          </div>

          <div>
            <span>💵</span>
            <strong>Future payouts</strong>
            <p>Stripe payouts can be added later for the full MVP.</p>
          </div>
        </div>
      </div>

      <div class="authCard">
        <div class="modeTabs">
          <button :class="{ active: mode === 'login' }" @click="mode = 'login'">
            Log in
          </button>

          <button :class="{ active: mode === 'signup' }" @click="mode = 'signup'">
            Sign up
          </button>
        </div>

        <h2>{{ mode === "login" ? "Pro login" : "Create pro account" }}</h2>

        <div v-if="mode === 'signup'">
          <label>Business name</label>
          <input v-model="businessName" type="text" placeholder="Example: Mike R. Plumbing" />

          <label>Trade</label>
          <select v-model="trade">
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>HVAC</option>
            <option>Appliance repair</option>
            <option>Handyman</option>
            <option>Roofing</option>
          </select>

          <label>Service area</label>
          <input v-model="serviceArea" type="text" placeholder="Example: Bellevue, WA" />
        </div>

        <label>Email</label>
        <input v-model="email" type="email" placeholder="pro@example.com" />

        <label>Password</label>
        <input v-model="password" type="password" placeholder="Enter password" />

        <button class="primaryButton" @click="continueToDashboard">
          {{ mode === "login" ? "Log in as pro" : "Create pro account" }}
        </button>

        <p class="switchText">
          {{ mode === "login" ? "New to Homewise Pro?" : "Already have a pro account?" }}

          <button @click="toggleMode">
            {{ mode === "login" ? "Create account" : "Log in" }}
          </button>
        </p>

        <div class="mvpNote">
          <strong>MVP note</strong>
          <p>
            This uses localStorage for now. Later, this connects to Clerk for real pro accounts.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import HomewiseNavbar from "../components/HomewiseNavbar.vue";

export default {
  name: "ProfessionalAuthPage",

  components: {
    HomewiseNavbar,
  },

  data() {
    return {
      mode: "login",
      businessName: localStorage.getItem("homewiseProBusinessName") || "",
      trade: localStorage.getItem("homewiseProTrade") || "Plumbing",
      serviceArea: localStorage.getItem("homewiseProServiceArea") || "Bellevue, WA",
      email: localStorage.getItem("homewiseProEmail") || "",
      password: "",
    };
  },

  methods: {
    toggleMode() {
      this.mode = this.mode === "login" ? "signup" : "login";
    },

    continueToDashboard() {
      if (!this.email.trim() || !this.password.trim()) {
        alert("Please enter an email and password.");
        return;
      }

      if (this.mode === "signup") {
        if (!this.businessName.trim() || !this.serviceArea.trim()) {
          alert("Please enter your business name and service area.");
          return;
        }

        localStorage.setItem("homewiseProBusinessName", this.businessName);
        localStorage.setItem("homewiseProTrade", this.trade);
        localStorage.setItem("homewiseProServiceArea", this.serviceArea);
      }

      if (!localStorage.getItem("homewiseProBusinessName")) {
        localStorage.setItem("homewiseProBusinessName", "Mike R. Plumbing");
      }

      if (!localStorage.getItem("homewiseProTrade")) {
        localStorage.setItem("homewiseProTrade", "Plumbing");
      }

      if (!localStorage.getItem("homewiseProServiceArea")) {
        localStorage.setItem("homewiseProServiceArea", "Bellevue, WA");
      }

      localStorage.setItem("homewiseProLoggedIn", "true");
      localStorage.setItem("homewiseProEmail", this.email);

      this.$router.push("/pro");
    },
  },
};
</script>

<style scoped>
.authPage {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(22, 163, 115, 0.1), transparent 30%),
    transparent;
  font-family: Arial, Helvetica, sans-serif;
  color: #111;
}

.authSection {
  width: min(1440px, calc(100% - 80px));
  min-height: calc(100vh - 86px);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 460px;
  gap: 70px;
  align-items: center;
  padding: 38px 0 70px;
}

.eyebrow {
  color: #16a373;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 13px;
  margin: 0 0 14px;
}

h1 {
  font-size: clamp(48px, 5vw, 82px);
  line-height: 0.97;
  letter-spacing: -3px;
  margin: 0 0 20px;
  max-width: 850px;
}

.authText > p {
  color: #56615c;
  font-size: 20px;
  line-height: 1.55;
  max-width: 700px;
}

.featureGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 32px;
}

.featureGrid div,
.authCard {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  box-shadow: 0 24px 65px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.featureGrid div {
  padding: 20px;
}

.featureGrid span {
  width: 46px;
  height: 46px;
  background: #e5f7ef;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 23px;
  margin-bottom: 14px;
}

.featureGrid strong {
  display: block;
  font-size: 17px;
  margin-bottom: 8px;
}

.featureGrid p {
  color: #56615c;
  line-height: 1.45;
  margin: 0;
}

.authCard {
  padding: 32px;
}

.modeTabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(246, 248, 247, 0.85);
  border-radius: 999px;
  padding: 5px;
  margin-bottom: 24px;
}

.modeTabs button {
  border: none;
  background: transparent;
  border-radius: 999px;
  padding: 12px;
  font-weight: 900;
  cursor: pointer;
  color: #56615c;
}

.modeTabs button.active {
  background: white;
  color: #111;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.08);
}

.authCard h2 {
  font-size: 34px;
  letter-spacing: -0.8px;
  margin: 0 0 22px;
}

label {
  display: block;
  font-weight: 900;
  margin: 18px 0 8px;
}

input,
select {
  width: 100%;
  height: 58px;
  border: 1px solid #e1e6e3;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 18px;
  padding: 0 16px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
}

input:focus,
select:focus {
  border-color: #16a373;
}

.primaryButton {
  width: 100%;
  background: #111;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 17px;
  font-size: 17px;
  font-weight: 900;
  cursor: pointer;
  margin-top: 24px;
  box-shadow: 0 14px 32px rgba(17, 17, 17, 0.14);
}

.switchText {
  color: #555;
  margin-bottom: 0;
  text-align: center;
}

.switchText button {
  border: none;
  background: transparent;
  text-decoration: underline;
  font-weight: 900;
  cursor: pointer;
  color: #111;
}

.mvpNote {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 18px;
  padding: 16px;
  margin-top: 20px;
}

.mvpNote p {
  color: #56615c;
  line-height: 1.45;
  margin: 6px 0 0;
}

@media (max-width: 1100px) {
  .authSection {
    width: min(100% - 48px, 1440px);
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .featureGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .authSection {
    width: min(100% - 32px, 1440px);
  }

  h1 {
    font-size: 42px;
    letter-spacing: -1.5px;
  }
}
</style>