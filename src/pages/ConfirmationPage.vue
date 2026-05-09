<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Dashboard', to: '/app/dashboard' },
        { label: 'Repair details', to: '/app/job' },
        { label: 'For pros', to: '/pro' }
      ]"
      :right-links="[
        { label: 'Help', to: '#' },
        { label: 'Log in', to: '/sign-in' }
      ]"
      :primary-action="{ label: 'New request', to: '/app' }"
    />

    <section class="onboarding">
      <div class="wideContainer">
        <div class="confirmationHero">
          <div class="successIcon">✓</div>

          <p class="eyebrow">Step 6 of 6</p>

          <h1>Your repair request is booked.</h1>

          <p class="subtitle">
            {{ selectedPro.name }} is scheduled for {{ bookingTime }}. You can now
            track the full repair request from your Homewise dashboard.
          </p>

          <div class="heroActions">
            <button class="primaryButton" @click="$router.push('/app/dashboard')">
              View dashboard
            </button>

            <button class="secondaryButton" @click="$router.push('/app/job')">
              View repair details
            </button>

            <button class="secondaryButton" @click="$router.push('/app')">
              Start another request
            </button>
          </div>
        </div>

        <div class="contentGrid">
          <section class="mainPanel">
            <div class="statusCard">
              <div class="fieldHeader">
                <div>
                  <p class="cardLabel">What happens next?</p>
                  <h2>Track the repair from your dashboard</h2>
                </div>

                <span class="softBadge">Pro reviewing</span>
              </div>

              <div class="timelineGrid">
                <div class="timelineStep active">
                  <span>✓</span>
                  <strong>Request submitted</strong>
                  <p>Homewise saved your repair details.</p>
                </div>

                <div class="timelineStep active">
                  <span>2</span>
                  <strong>Pro reviews the job</strong>
                  <p>The contractor reviews your issue, time, and access notes.</p>
                </div>

                <div class="timelineStep">
                  <span>3</span>
                  <strong>Visit confirmed</strong>
                  <p>You’ll see the status update when the pro accepts.</p>
                </div>

                <div class="timelineStep">
                  <span>4</span>
                  <strong>Pro on the way</strong>
                  <p>The pro heads to your location during the selected window.</p>
                </div>

                <div class="timelineStep">
                  <span>5</span>
                  <strong>Repair completed</strong>
                  <p>The job is completed and saved to repair history.</p>
                </div>
              </div>
            </div>

            <div class="nextPanel">
              <div class="nextIcon">📍</div>

              <div>
                <p class="cardLabel">Dashboard tracking</p>
                <h2>Your active repair is ready to track</h2>
                <p>
                  Go to the dashboard to see repair status, selected pro, cost estimate,
                  booking time, and job details. The pro dashboard can update the status
                  to accepted, on the way, and completed.
                </p>
              </div>
            </div>
          </section>

          <aside class="sidePanel">
            <div class="summaryCard">
              <p class="cardLabel">Booking summary</p>

              <div class="proMini">
                <div class="avatar">{{ selectedPro.initials || "HW" }}</div>

                <div>
                  <h2>{{ selectedPro.name }}</h2>
                  <p>{{ selectedPro.trade || "Home repair pro" }}</p>
                </div>
              </div>

              <div class="summaryBox">
                <span>Repair issue</span>
                <strong>{{ diagnosis.likelyIssue }}</strong>
              </div>

              <div class="summaryBox">
                <span>Category</span>
                <strong>{{ category }}</strong>
              </div>

              <div class="summaryBox">
                <span>Time window</span>
                <strong>{{ bookingTime }}</strong>
              </div>

              <div class="summaryBox">
                <span>Location</span>
                <strong>{{ location }}</strong>
              </div>

              <div class="summaryBox">
                <span>Estimated cost</span>
                <strong>{{ diagnosis.cost }}</strong>
              </div>

              <div class="summaryBox">
                <span>Diagnostic fee</span>
                <strong>{{ selectedPro.price || "$99" }}</strong>
              </div>

              <div class="summaryBox">
                <span>Phone</span>
                <strong>{{ phone || "Not added" }}</strong>
              </div>

              <div v-if="imagePreview" class="photoPreview">
                <p class="cardLabel">Uploaded photo</p>
                <img :src="imagePreview" alt="Uploaded repair issue" />
              </div>

              <div class="descriptionBox">
                <strong>Your issue description</strong>
                <p>{{ description }}</p>
              </div>
            </div>

            <div class="mvpCard">
              <div class="tipIcon">✨</div>

              <div>
                <strong>MVP note</strong>
                <p>
                  This is currently front-end data. Later this will save to Supabase,
                  notify the contractor, and connect to Stripe.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import HomewiseNavbar from "../components/HomewiseNavbar.vue";

export default {
  name: "ConfirmationPage",

  components: {
    HomewiseNavbar,
  },

  data() {
    const savedPro = localStorage.getItem("homewiseSelectedPro");

    return {
      selectedPro: savedPro
        ? JSON.parse(savedPro)
        : {
            initials: "MR",
            name: "Mike R. Plumbing",
            trade: "Plumber · Leak repair",
            price: "$99",
          },

      category: localStorage.getItem("homewiseCategory") || "Plumbing",
      bookingTime: localStorage.getItem("homewiseBookingTime") || "Today 3–5 PM",
      location: localStorage.getItem("homewiseLocation") || "Bellevue, WA",
      phone: localStorage.getItem("homewisePhone") || "",
      imagePreview: localStorage.getItem("homewiseImagePreview") || "",
      description:
        localStorage.getItem("homewiseDescription") ||
        "My kitchen sink is leaking under the cabinet and water is pooling on the floor.",

      diagnosis: {
        likelyIssue: "Possible under-sink leak",
        cost: "$150–$400",
      },
    };
  },

  mounted() {
    if (!localStorage.getItem("homewiseProJobStatus")) {
      localStorage.setItem("homewiseProJobStatus", "pending");
    }
  },
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(22, 163, 115, 0.12), transparent 30%),
    transparent;
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
}

.wideContainer {
  width: min(1440px, calc(100% - 80px));
  margin: 0 auto;
}

.onboarding {
  padding: 38px 0 70px;
}

.confirmationHero {
  max-width: 950px;
  margin-bottom: 32px;
}

.successIcon {
  width: 84px;
  height: 84px;
  background: #16a373;
  color: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 46px;
  font-weight: 900;
  box-shadow: 0 18px 45px rgba(22, 163, 115, 0.24);
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #16a373;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

h1 {
  max-width: 900px;
  font-size: clamp(48px, 5vw, 82px);
  line-height: 0.97;
  letter-spacing: -3px;
  margin: 0 0 18px;
}

.subtitle {
  max-width: 780px;
  color: #56615c;
  font-size: 20px;
  line-height: 1.55;
  margin: 0;
}

.heroActions {
  display: flex;
  gap: 12px;
  margin-top: 26px;
  flex-wrap: wrap;
}

.primaryButton,
.secondaryButton {
  border: none;
  border-radius: 15px;
  padding: 17px 26px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
}

.primaryButton {
  background: #111;
  color: white;
  box-shadow: 0 14px 32px rgba(17, 17, 17, 0.14);
}

.secondaryButton {
  background: #e5f7ef;
  color: #067a53;
}

.contentGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 390px;
  gap: 24px;
  align-items: start;
}

.mainPanel,
.summaryCard,
.mvpCard {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  box-shadow: 0 24px 65px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.mainPanel {
  padding: 26px;
}

.statusCard,
.nextPanel {
  background: rgba(249, 251, 250, 0.78);
  border: 1px solid rgba(237, 240, 239, 0.9);
  border-radius: 24px;
  padding: 22px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.statusCard {
  margin-bottom: 18px;
}

.fieldHeader {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 20px;
}

.cardLabel {
  margin: 0 0 8px;
  color: #7b827f;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
}

.fieldHeader h2,
.nextPanel h2,
.summaryCard h2 {
  margin: 0;
  font-size: 26px;
  letter-spacing: -0.5px;
}

.softBadge {
  background: rgba(229, 247, 239, 0.9);
  color: #067a53;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 900;
  white-space: nowrap;
  height: fit-content;
}

.timelineGrid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.timelineStep {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 18px;
  opacity: 0.62;
}

.timelineStep.active {
  opacity: 1;
}

.timelineStep span {
  width: 34px;
  height: 34px;
  background: #d8dddb;
  color: #5d6662;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-bottom: 14px;
}

.timelineStep.active span {
  background: #16a373;
  color: white;
}

.timelineStep strong {
  display: block;
  font-size: 15px;
}

.timelineStep p {
  color: #5f6864;
  line-height: 1.45;
  margin: 8px 0 0;
  font-size: 13px;
}

.nextPanel {
  display: flex;
  gap: 16px;
}

.nextIcon {
  width: 58px;
  height: 58px;
  background: #e5f7ef;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.nextPanel p {
  color: #5f6864;
  line-height: 1.5;
  margin-bottom: 0;
}

.sidePanel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summaryCard,
.mvpCard {
  padding: 22px;
}

.proMini {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #111;
  color: white;
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 16px;
}

.avatar {
  width: 54px;
  height: 54px;
  background: #1769aa;
  color: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 18px;
  flex-shrink: 0;
}

.proMini h2 {
  color: white;
  margin: 0 0 4px;
}

.proMini p {
  color: #d8d8d8;
  margin: 0;
}

.summaryBox {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 16px;
  padding: 15px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
}

.summaryBox span {
  color: #6c7470;
}

.summaryBox strong {
  text-align: right;
}

.photoPreview {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 16px;
  padding: 15px;
  margin-top: 14px;
}

.photoPreview img {
  width: 100%;
  max-height: 220px;
  object-fit: cover;
  border-radius: 14px;
}

.descriptionBox {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 16px;
  padding: 15px;
  margin-top: 14px;
}

.descriptionBox p {
  color: #5f6864;
  line-height: 1.45;
  margin-bottom: 0;
}

.mvpCard {
  display: flex;
  gap: 14px;
}

.tipIcon {
  width: 46px;
  height: 46px;
  background: #e5f7ef;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mvpCard p {
  color: #5f6864;
  line-height: 1.45;
  margin: 6px 0 0;
}

@media (max-width: 1150px) {
  .wideContainer {
    width: min(100% - 48px, 1440px);
  }

  .contentGrid {
    grid-template-columns: 1fr;
  }

  .timelineGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .wideContainer {
    width: min(100% - 32px, 1440px);
  }

  h1 {
    font-size: 42px;
    letter-spacing: -1.5px;
  }

  .timelineGrid {
    grid-template-columns: 1fr;
  }

  .fieldHeader,
  .summaryBox,
  .nextPanel,
  .mvpCard,
  .proMini {
    flex-direction: column;
    align-items: flex-start;
  }

  .summaryBox strong {
    text-align: left;
  }
}
</style>