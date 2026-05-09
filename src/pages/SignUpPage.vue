<template>
  <main class="authPage">
    <HomewiseNavbar
      :left-links="[
        { label: 'Services', to: '/app' },
        { label: 'For pros', to: '/pro' },
        { label: 'About', to: '/' }
      ]"
      :right-links="[
        { label: 'Help', to: '#' }
      ]"
      :primary-action="{ label: 'Log in', to: '/sign-in' }"
    />

    <section class="authSection">
      <div class="authText">
        <p class="eyebrow">Create your account</p>
        <h1>Start using Homewise</h1>
        <p>
          Save repair requests, track bookings, and manage your home repair history.
        </p>
      </div>

      <div class="authCard">
        <h2>Create account</h2>

        <label>Name</label>
        <input v-model="name" type="text" placeholder="Your name" />

        <label>Email</label>
        <input v-model="email" type="email" placeholder="you@example.com" />

        <label>Password</label>
        <input v-model="password" type="password" placeholder="Create password" />

        <button class="primaryButton" @click="signUp">
          Create account
        </button>

        <p class="switchText">
          Already have an account?
          <button @click="$router.push('/sign-in')">Log in</button>
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import HomewiseNavbar from "../components/HomewiseNavbar.vue";

export default {
  name: "SignUpPage",

  components: {
    HomewiseNavbar,
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    signUp() {
      if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
        alert("Please fill out all fields.");
        return;
      }

      localStorage.setItem("homewiseLoggedIn", "true");
      localStorage.setItem("homewiseUserName", this.name);
      localStorage.setItem("homewiseUserEmail", this.email);

      this.$router.push("/app");
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
  min-height: calc(100vh - 86px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) 430px;
  gap: 70px;
  align-items: center;
  padding: 42px 11% 70px;
}

.eyebrow {
  color: #16a373;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 13px;
  margin-bottom: 14px;
}

h1 {
  font-size: clamp(48px, 5vw, 76px);
  line-height: 0.97;
  letter-spacing: -3px;
  margin: 0 0 20px;
  max-width: 760px;
}

.authText p {
  color: #56615c;
  font-size: 20px;
  line-height: 1.55;
  max-width: 620px;
}

.authCard {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  padding: 32px;
  box-shadow: 0 24px 65px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
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

input {
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

input:focus {
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

@media (max-width: 950px) {
  .authSection {
    grid-template-columns: 1fr;
    padding: 36px 24px 56px;
    gap: 32px;
  }

  h1 {
    font-size: 42px;
    letter-spacing: -1.5px;
  }
}
</style>