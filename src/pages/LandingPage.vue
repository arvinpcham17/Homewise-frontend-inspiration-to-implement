<template>
  <main class="page">
    <HomewiseNavbar />

    <!-- HERO -->
    <section class="hero">
      <div class="heroOverlay"></div>
      <div class="heroGlow heroGlowOne"></div>
      <div class="heroGlow heroGlowTwo"></div>

      <div class="wideContainer heroGrid">
        <!-- LEFT -->
        <div class="heroLeft">

          <h1>Something wrong at home? Let’s get it fixed.</h1>

          

          <div class="requestCard">
            <div class="requestHeader">
              <div>
                <p class="eyebrow">Start a repair request</p>
                <h2>What needs fixing?</h2>
                <p class="helperText">
                  Describe it simply with a few words and pictures.
                </p>
              </div>

              <div class="estimatePill">⚡ Takes about 2 min</div>
            </div>

            <div class="fieldGrid">
              <div class="fieldGroup">
                <label>Repair issue</label>
                <div class="inputBox">
                  <span class="inputIcon">●</span>
                  <input
                    v-model="issue"
                    type="text"
                    placeholder="Leaking sink, broken outlet, heater not working..."
                  />
                </div>
              </div>

              <div class="fieldGroup">
                <label>Location</label>
                <div class="inputBox">
                  <span class="inputIcon">■</span>
                  <input
                    v-model="location"
                    type="text"
                    placeholder="Bellevue, WA"
                  />
                </div>
              </div>
            </div>

            <div class="heroActions">
              <button class="primaryButton" @click="goToApp">
                Get this fixed
              </button>

              <button class="ghostButton" @click="goToApp">
                Upload photo instead
              </button>
            </div>

            <div class="trustLine">
              <span>No exact diagnosis needed</span>
              <span>Estimated cost first</span>
              <span>Trusted local pros</span>
            </div>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="heroRight">
          <div class="illustrationCard">
            <div class="illustrationBackdropOne"></div>
            <div class="illustrationBackdropTwo"></div>

            <div class="houseScene">
              <div class="sun"></div>

              <div class="cloud cloudOne"></div>
              <div class="cloud cloudTwo"></div>

              <div class="tree treeLeft">
                <div class="treeTop"></div>
                <div class="treeTrunk"></div>
              </div>

              <div class="tree treeRight">
                <div class="treeTop"></div>
                <div class="treeTrunk"></div>
              </div>

              <div class="houseWrap">
                <div class="roof"></div>
                <div class="chimney"></div>
                <div class="houseBody">
                  <div class="window windowLeft"></div>
                  <div class="window windowRight"></div>
                  <div class="door"></div>
                </div>
              </div>

              <div class="path"></div>
            </div>

            <div class="visualBottomBar">
              <div>
                <strong>Need help now?</strong>
                <p>Start a repair request in minutes</p>
              </div>

              <button @click="goToApp">See steps</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DASHBOARD PREVIEW SECTION -->
    <section class="previewSection">
      <div class="wideContainer previewGrid">
        <div class="previewCopy">
          <p class="eyebrow green">What happens next</p>
          <h2>Clear repair guidance before you book anyone.</h2>
          <p>
            After you describe the issue, Homewise gives you a repair summary,
            estimated cost range, recommended pro type, and matched local professionals.
          </p>

          <div class="previewPoints">
            <div class="previewPoint">
              <span>🔍</span>
              <strong>Likely issue</strong>
              <p>Understand what might be wrong before calling someone.</p>
            </div>

            <div class="previewPoint">
              <span>💵</span>
              <strong>Cost range</strong>
              <p>See an estimated repair range before booking.</p>
            </div>

            <div class="previewPoint">
              <span>📍</span>
              <strong>Status tracking</strong>
              <p>Track the repair from request to completion.</p>
            </div>
          </div>
        </div>

        <div class="dashboardMock">
          <div class="mockTop">
            <div>
              <p class="eyebrow">Dashboard preview</p>
              <h3>Active repair</h3>
            </div>

            <span class="statusBadge">Pro reviewing</span>
          </div>

          <div class="mockHeroCard">
            <div class="mockIcon">🛠️</div>

            <div>
              <p class="eyebrow">AI repair summary</p>
              <h2>Possible under-sink leak</h2>
              <p>
                Likely P-trap, supply line, or drain connection issue.
              </p>
            </div>
          </div>

          <div class="progressBar">
            <div class="progressFill"></div>
          </div>

          <div class="mockSteps">
            <div class="mockStep active">
              <span>✓</span>
              <strong>Request</strong>
            </div>

            <div class="mockStep active">
              <span>2</span>
              <strong>Summary</strong>
            </div>

            <div class="mockStep">
              <span>3</span>
              <strong>Pro match</strong>
            </div>

            <div class="mockStep">
              <span>4</span>
              <strong>Booked</strong>
            </div>
          </div>

          <div class="mockBottomGrid">
            <div class="miniCard">
              <p>Estimated repair range</p>
              <strong>$150–$400</strong>
            </div>

            <div class="miniCard">
              <p>Next visit</p>
              <strong>Today 3–5 PM</strong>
            </div>
          </div>

          <div class="proCard">
            <div class="proAvatar">MR</div>

            <div>
              <strong>Mike R. Plumbing</strong>
              <p>4.9 ⭐ · Leak repair specialist</p>
            </div>

            <button @click="goToApp">Book</button>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="how" class="section">
      <div class="wideContainer">
        <div class="sectionHeader">
          <h1 class="eyebrow green">How it works</h1>
        </div>

        <div class="stepsGrid">
          <article class="stepCard">
            <div class="number">1</div>
            <h3>Tell us what happened</h3>
            <p>Write a quick description or add a photo. Simple is enough.</p>
          </article>

          <article class="stepCard">
            <div class="number">2</div>
            <h3>Get a repair summary</h3>
            <p>See the likely issue, urgency, cost range, safety notes, and best pro type.</p>
          </article>

          <article class="stepCard">
            <div class="number">3</div>
            <h3>Choose a trusted local pro</h3>
            <p>Compare availability, rating, diagnostic fee, and specialty before booking.</p>
          </article>

          <article class="stepCard">
            <div class="number">4</div>
            <h3>Track every step</h3>
            <p>Follow the job from request submitted to pro accepted, on the way, and completed.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- TRUST -->
    <section class="trustSection">
      <div class="wideContainer trustPanel">
        <div class="trustCopy">
          <p class="eyebrow green">Why it feels different</p>
          <h2>More clarity before you let someone into your home.</h2>
          <p>
            Homewise helps homeowners understand what might be wrong, what it may cost,
            who can fix it, and what happens next.
          </p>
        </div>

        <div class="trustCards">
          <article class="trustCard">
            <div class="trustIcon">🔍</div>
            <h3>Know the likely issue</h3>
            <p>Get a clearer starting point before booking a professional.</p>
          </article>

          <article class="trustCard">
            <div class="trustIcon">💵</div>
            <h3>See estimated cost</h3>
            <p>Understand the expected repair range before the final quote.</p>
          </article>

          <article class="trustCard">
            <div class="trustIcon">✅</div>
            <h3>Compare trusted pros</h3>
            <p>Review rating, diagnostic fee, availability, and specialty.</p>
          </article>

          <article class="trustCard">
            <div class="trustIcon">📍</div>
            <h3>Track every step</h3>
            <p>Follow the repair like a ride, delivery, or service request.</p>
          </article>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="finalSection">
      <div class="wideContainer finalCard">
        <div>
          <p class="eyebrow">Ready when something goes wrong</p>
          <h2>Start with a photo or a quick description.</h2>
          <p>
            Test the full Homewise flow from repair summary to booking to dashboard tracking.
          </p>
        </div>

        <button @click="goToApp">Get this fixed</button>
      </div>
    </section>
  </main>
</template>

<script>
import HomewiseNavbar from "../components/HomewiseNavbar.vue";

export default {
  name: "LandingPage",

  components: {
    HomewiseNavbar,
  },

  data() {
    return {
      issue: localStorage.getItem("homewiseDescription") || "",
      location: localStorage.getItem("homewiseLocation") || "",
    };
  },

  methods: {
    goToApp() {
      if (this.issue && this.issue.trim()) {
        localStorage.setItem("homewiseDescription", this.issue);
      }

      if (this.location && this.location.trim()) {
        localStorage.setItem("homewiseLocation", this.location);
      }

      this.$router.push("/app");
    },
  },
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: transparent;
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
}

.wideContainer {
  width: min(1440px, calc(100% - 80px));
  margin: 0 auto;
}

/* HERO */
.hero {
  position: relative;
  overflow: hidden;
  padding: 34px 0 58px;
}

.heroOverlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.42);
  pointer-events: none;
}

.heroGlow {
  position: absolute;
  border-radius: 999px;
  filter: blur(24px);
  pointer-events: none;
}

.heroGlowOne {
  width: 430px;
  height: 430px;
  background: rgba(22, 163, 115, 0.08);
  top: 70px;
  right: 8%;
}

.heroGlowTwo {
  width: 260px;
  height: 260px;
  background: rgba(23, 105, 170, 0.05);
  bottom: 10px;
  left: 6%;
}

.heroGrid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(460px, 0.85fr);
  gap: 54px;
  align-items: center;
}

.heroLeft {
  max-width: 780px;
}

.locationLine {
  width: fit-content;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 999px;
  padding: 10px 14px;
  color: #111;
  font-weight: 900;
  margin: 0 0 18px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.locationLine button {
  border: none;
  background: transparent;
  text-decoration: underline;
  font-weight: 900;
  cursor: pointer;
  margin-left: 8px;
}

.heroLeft h1 {
  max-width: 760px;
  font-size: clamp(52px, 5.2vw, 82px);
  line-height: 0.95;
  letter-spacing: -3.5px;
  margin: 0 0 16px;
}

.heroSubtitle {
  max-width: 720px;
  color: #4f5a55;
  font-size: 19px;
  line-height: 1.5;
  margin: 0 0 22px;
}

.requestCard {
  max-width: 780px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 30px;
  padding: 24px;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.requestHeader {
  display: flex;
  justify-content: space-between;
  gap: 22px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #7b827f;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.green {
  color: #16a373;
}

.requestHeader h2 {
  margin: 0;
  font-size: 30px;
  letter-spacing: -0.6px;
}

.helperText {
  color: #56615c;
  margin: 8px 0 0;
  line-height: 1.45;
  font-weight: 700;
}

.estimatePill,
.statusBadge {
  background: rgba(229, 247, 239, 0.94);
  color: #067a53;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 900;
  white-space: nowrap;
}

.fieldGrid {
  display: grid;
  grid-template-columns: 1.4fr 0.9fr;
  gap: 14px;
}

.fieldGroup label {
  display: block;
  font-size: 15px;
  font-weight: 900;
  margin-bottom: 8px;
}

.inputBox {
  min-height: 60px;
  background: rgba(246, 248, 247, 0.95);
  border: 1px solid #e2e6e4;
  border-radius: 17px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.inputIcon {
  color: #4e5753;
  font-size: 11px;
}

.inputBox input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 17px;
}

.heroActions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.primaryButton,
.ghostButton {
  border: none;
  border-radius: 15px;
  padding: 16px 22px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
}

.primaryButton {
  background: #111;
  color: white;
  box-shadow: 0 14px 32px rgba(17, 17, 17, 0.12);
}

.ghostButton {
  background: #e5f7ef;
  color: #067a53;
}

.trustLine {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.trustLine span {
  background: rgba(246, 248, 247, 0.95);
  color: #4f5a55;
  border-radius: 999px;
  padding: 8px 11px;
  font-size: 13px;
  font-weight: 900;
}

/* HERO RIGHT VISUAL */
.heroRight {
  display: flex;
  justify-content: center;
}

.illustrationCard {
  width: 100%;
  max-width: 590px;
  height: 620px;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 34px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 35px 90px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.illustrationBackdropOne {
  position: absolute;
  top: 0;
  right: 0;
  width: 68%;
  height: 78%;
  background: #22b07d;
  clip-path: polygon(24% 0, 100% 0, 100% 100%, 0 100%);
}

.illustrationBackdropTwo {
  position: absolute;
  top: 0;
  left: 0;
  width: 72%;
  height: 78%;
  background: #dff1ea;
  clip-path: polygon(0 0, 100% 0, 58% 100%, 0 100%);
}

.houseScene {
  position: absolute;
  inset: 40px 36px 130px 36px;
  border-radius: 28px;
  overflow: hidden;
}

.sun {
  position: absolute;
  top: 20px;
  right: 26px;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  background: #ffd56b;
}

.cloud {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  height: 24px;
}

.cloud::before,
.cloud::after {
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
}

.cloudOne {
  top: 34px;
  left: 36px;
  width: 82px;
}

.cloudOne::before {
  width: 34px;
  height: 34px;
  left: 12px;
  top: -12px;
}

.cloudOne::after {
  width: 28px;
  height: 28px;
  right: 12px;
  top: -8px;
}

.cloudTwo {
  top: 84px;
  right: 98px;
  width: 70px;
}

.cloudTwo::before {
  width: 28px;
  height: 28px;
  left: 8px;
  top: -9px;
}

.cloudTwo::after {
  width: 26px;
  height: 26px;
  right: 8px;
  top: -7px;
}

.tree {
  position: absolute;
  bottom: 40px;
}

.treeLeft {
  left: 28px;
}

.treeRight {
  right: 26px;
}

.treeTop {
  width: 74px;
  height: 92px;
  background: #8ccf98;
  border-radius: 46px;
}

.treeTrunk {
  width: 14px;
  height: 52px;
  background: #7d5a44;
  margin: -6px auto 0;
  border-radius: 10px;
}

.houseWrap {
  position: absolute;
  left: 50%;
  bottom: 54px;
  transform: translateX(-50%);
  width: 280px;
  height: 250px;
}

.roof {
  position: absolute;
  top: 0;
  left: 30px;
  width: 220px;
  height: 110px;
  background: #111;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}

.chimney {
  position: absolute;
  top: 26px;
  right: 56px;
  width: 26px;
  height: 42px;
  background: #111;
  border-radius: 6px;
}

.houseBody {
  position: absolute;
  bottom: 0;
  left: 36px;
  width: 208px;
  height: 148px;
  background: #fffdfb;
  border-radius: 18px;
  box-shadow: inset 0 0 0 2px rgba(17, 17, 17, 0.04);
}

.window {
  position: absolute;
  top: 44px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #dff1ea;
}

.windowLeft {
  left: 34px;
}

.windowRight {
  left: 90px;
}

.door {
  position: absolute;
  right: 32px;
  bottom: 0;
  width: 42px;
  height: 92px;
  border-radius: 12px 12px 0 0;
  background: #22b07d;
}

.path {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 88px;
  height: 110px;
  transform: translateX(-50%);
  background: #e8d4a8;
  clip-path: polygon(40% 0, 60% 0, 100% 100%, 0 100%);
}

.visualBottomBar {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  background: #111;
  color: white;
  border-radius: 22px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.visualBottomBar strong {
  display: block;
  font-size: 18px;
  margin-bottom: 4px;
}

.visualBottomBar p {
  margin: 0;
  color: #dadada;
  font-size: 14px;
}

.visualBottomBar button {
  border: none;
  background: white;
  color: #111;
  border-radius: 999px;
  padding: 14px 18px;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;
}

/* PREVIEW SECTION */
.previewSection {
  padding: 16px 0 56px;
}

.previewGrid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(520px, 1fr);
  gap: 48px;
  align-items: center;
}

.previewCopy h2,
.sectionHeader h2,
.trustCopy h2,
.finalCard h2 {
  font-size: clamp(42px, 4vw, 66px);
  line-height: 1;
  letter-spacing: -2.5px;
  margin: 0 0 18px;
}

.previewCopy p,
.trustCopy p,
.finalCard p {
  color: #56615c;
  line-height: 1.5;
  font-size: 18px;
}

.previewPoints {
  display: grid;
  gap: 14px;
  margin-top: 26px;
}

.previewPoint {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.previewPoint span {
  width: 44px;
  height: 44px;
  background: #e5f7ef;
  color: #067a53;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.previewPoint strong {
  display: block;
  font-size: 19px;
  margin-bottom: 6px;
}

.previewPoint p {
  margin: 0;
  font-size: 15px;
}

/* DASHBOARD MOCK */
.dashboardMock {
  width: 100%;
  max-width: 620px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 34px;
  padding: 24px;
  box-shadow: 0 35px 90px rgba(15, 23, 42, 0.12);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.dashboardMock::before {
  content: "";
  position: absolute;
  top: -120px;
  right: -90px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(22, 163, 115, 0.18), transparent 65%);
}

.mockTop,
.mockHeroCard,
.mockSteps,
.mockBottomGrid,
.proCard {
  position: relative;
}

.mockTop {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 22px;
}

.mockTop h3 {
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.7px;
}

.mockHeroCard {
  background: rgba(246, 248, 247, 0.92);
  border-radius: 24px;
  padding: 22px;
  display: flex;
  gap: 16px;
  margin-bottom: 18px;
}

.mockIcon {
  width: 54px;
  height: 54px;
  background: #e5f7ef;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  flex-shrink: 0;
}

.mockHeroCard h2 {
  margin: 0 0 6px;
  font-size: 24px;
}

.mockHeroCard p {
  color: #5f6864;
  line-height: 1.4;
  margin: 0;
}

.progressBar {
  height: 12px;
  background: rgba(238, 241, 240, 0.95);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 18px;
}

.progressFill {
  width: 58%;
  height: 100%;
  background: linear-gradient(90deg, #16a373, #97ead0);
}

.mockSteps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.mockStep {
  background: rgba(246, 248, 247, 0.9);
  border-radius: 17px;
  padding: 14px;
  color: #7b827f;
}

.mockStep span {
  width: 30px;
  height: 30px;
  background: #d9dfdc;
  color: #66706b;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-bottom: 10px;
}

.mockStep.active {
  color: #111;
}

.mockStep.active span {
  background: #16a373;
  color: white;
}

.mockBottomGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.miniCard {
  background: rgba(246, 248, 247, 0.92);
  border-radius: 18px;
  padding: 16px;
}

.miniCard p {
  color: #6c7470;
  margin: 0 0 6px;
}

.miniCard strong {
  font-size: 21px;
}

.proCard {
  background: #111;
  color: white;
  border-radius: 22px;
  padding: 16px;
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
}

.proAvatar {
  width: 52px;
  height: 52px;
  background: #1769aa;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.proCard p {
  color: #d8d8d8;
  margin: 5px 0 0;
}

.proCard button {
  border: none;
  background: white;
  color: #111;
  border-radius: 999px;
  padding: 12px 18px;
  font-weight: 900;
  cursor: pointer;
}

/* HOW IT WORKS */
.section {
  padding: 72px 0;
}

.sectionHeader {
  max-width: 920px;
  margin-bottom: 28px;
}

.stepsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.stepCard,
.trustCard,
.trustPanel,
.finalCard {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 28px;
  box-shadow: 0 24px 65px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.stepCard {
  padding: 26px;
}

.number,
.trustIcon {
  width: 46px;
  height: 46px;
  background: #16a373;
  color: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-bottom: 22px;
}

.stepCard h3,
.trustCard h3 {
  font-size: 22px;
  margin: 0 0 10px;
}

.stepCard p,
.trustCard p {
  color: #56615c;
  line-height: 1.5;
}

/* TRUST */
.trustSection {
  padding: 0 0 72px;
}

.trustPanel {
  padding: 38px;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 32px;
  align-items: start;
}

.trustCards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.trustCard {
  padding: 24px;
}

.trustIcon {
  background: #e5f7ef;
  color: #067a53;
}

/* FINAL CTA */
.finalSection {
  padding: 0 0 80px;
}

.finalCard {
  background: #111;
  color: white;
  padding: 42px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
}

.finalCard .eyebrow {
  color: #97ead0;
}

.finalCard p {
  color: #d8d8d8;
  max-width: 700px;
}

.finalCard button {
  border: none;
  background: white;
  color: #111;
  border-radius: 16px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .heroGrid,
  .previewGrid,
  .trustPanel {
    grid-template-columns: 1fr;
  }

  .heroRight {
    justify-content: flex-start;
  }

  .illustrationCard {
    max-width: 700px;
    height: 560px;
  }

  .stepsGrid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 760px) {
  .wideContainer {
    width: min(100% - 32px, 1440px);
  }

  .hero {
    padding: 28px 0 48px;
  }

  .heroLeft h1 {
    font-size: 44px;
    letter-spacing: -1.8px;
  }

  .heroSubtitle,
  .previewCopy p,
  .trustCopy p {
    font-size: 17px;
  }

  .requestHeader,
  .fieldGrid,
  .finalCard,
  .visualBottomBar {
    flex-direction: column;
    align-items: flex-start;
  }

  .fieldGrid,
  .stepsGrid,
  .trustCards,
  .mockBottomGrid,
  .previewGrid {
    grid-template-columns: 1fr;
  }

  .illustrationCard {
    height: 480px;
  }

  .houseScene {
    inset: 26px 22px 118px 22px;
  }

  .visualBottomBar button,
  .primaryButton,
  .ghostButton,
  .finalCard button {
    width: 100%;
  }

  .mockSteps {
    grid-template-columns: 1fr 1fr;
  }

  .proCard {
    grid-template-columns: 1fr;
  }

  .trustPanel,
  .finalCard,
  .dashboardMock {
    padding: 28px;
  }

  .previewCopy h2,
  .sectionHeader h2,
  .trustCopy h2,
  .finalCard h2 {
    font-size: 38px;
    letter-spacing: -1.4px;
  }
}
</style>