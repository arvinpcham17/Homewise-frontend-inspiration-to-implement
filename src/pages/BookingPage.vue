<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Back to pros', to: '/app/pros' },
        { label: 'Dashboard', to: '/app/dashboard' },
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
        <div class="stepHeader">
          <div>
            <button class="backButton" @click="$router.push('/app/pros')">
              ← Back
            </button>

            <p class="eyebrow">Step 5 of 6</p>

            <h1>Book your repair visit.</h1>

            <p class="subtitle">
              Choose a time window, add access instructions, and confirm the request.
              Your selected pro will review the job before arrival.
            </p>
          </div>

          <div class="progressCard">
            <div class="progressTop">
              <span>Repair request</span>
              <strong>83%</strong>
            </div>

            <div class="progressTrack">
              <div class="progressFill"></div>
            </div>

            <p>Next: confirmation and dashboard tracking.</p>
          </div>
        </div>

        <div class="contentGrid">
          <section class="mainPanel">
            <div class="selectedProCard">
              <div class="avatar">{{ selectedPro.initials || "HW" }}</div>

              <div>
                <p class="cardLabel">Selected professional</p>
                <h2>{{ selectedPro.name }}</h2>
                <p>{{ selectedPro.trade || "Home repair pro" }}</p>
              </div>

              <span class="softBadge">{{ selectedPro.rating || "4.9" }} ⭐</span>
            </div>

            <div class="fieldBlock">
              <div class="fieldHeader">
                <div>
                  <p class="cardLabel">Time window</p>
                  <h2>Choose when they should come</h2>
                </div>

                <span class="softBadge">{{ selectedTime }}</span>
              </div>

              <div class="timeGrid">
                <button
                  v-for="time in timeOptions"
                  :key="time"
                  :class="{ active: selectedTime === time }"
                  @click="selectedTime = time"
                >
                  <strong>{{ time }}</strong>
                  <span>{{ getTimeNote(time) }}</span>
                </button>
              </div>
            </div>

            <div class="twoColumn">
              <div class="fieldBlock compact">
                <p class="cardLabel">Contact</p>
                <h2>Phone number</h2>

                <input
                  v-model="phone"
                  class="textInput"
                  placeholder="Example: (425) 555-1234"
                />
              </div>

              <div class="fieldBlock compact">
                <p class="cardLabel">Location</p>
                <h2>Repair address</h2>

                <input
                  v-model="location"
                  class="textInput"
                  placeholder="Example: Bellevue, WA"
                />
              </div>
            </div>

            <div class="fieldBlock">
              <div class="fieldHeader">
                <div>
                  <p class="cardLabel">Access instructions</p>
                  <h2>Anything the pro should know?</h2>
                </div>

                <span class="softBadge">{{ instructions ? "Added" : "Optional" }}</span>
              </div>

              <textarea
                v-model="instructions"
                placeholder="Example: Ring the doorbell. Dog is friendly. Gate code is 1234."
              ></textarea>
            </div>

            <div class="paymentCard">
              <div class="paymentIcon">💳</div>

              <div>
                <p class="cardLabel">Payment</p>
                <h2>Pay after service</h2>
                <p>
                  For the MVP, no real payment is collected yet. Later this will connect
                  to Stripe for deposits, payments, and contractor payouts.
                </p>
              </div>
            </div>

            <div class="actionRow">
              <button class="primaryButton" @click="confirmBooking">
                Confirm booking
              </button>

              <button class="secondaryButton" @click="$router.push('/app/pros')">
                Change pro
              </button>
            </div>
          </section>

          <aside class="sidePanel">
            <div class="summaryCard">
              <p class="cardLabel">Booking summary</p>

              <h2>{{ selectedPro.name }}</h2>

              <div class="summaryBox">
                <span>Repair issue</span>
                <strong>{{ diagnosis.likelyIssue }}</strong>
              </div>

              <div class="summaryBox">
                <span>Category</span>
                <strong>{{ category }}</strong>
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
                <span>Time window</span>
                <strong>{{ selectedTime }}</strong>
              </div>

              <div class="summaryBox">
                <span>Location</span>
                <strong>{{ location || "Missing" }}</strong>
              </div>

              <div class="nextBox">
                <strong>What happens next?</strong>
                <p>
                  After confirmation, this job appears in the pro dashboard. The pro can
                  accept it, mark on the way, and complete the repair.
                </p>
              </div>
            </div>

            <div class="timelineCard">
              <p class="cardLabel">Repair flow</p>

              <div class="timelineItem done">
                <span>✓</span>
                Choose issue
              </div>

              <div class="timelineItem done">
                <span>✓</span>
                Describe problem
              </div>

              <div class="timelineItem done">
                <span>✓</span>
                AI summary
              </div>

              <div class="timelineItem done">
                <span>✓</span>
                Match pro
              </div>

              <div class="timelineItem active">
                <span>5</span>
                Book repair
              </div>
            </div>

            <div class="tipCard">
              <div class="tipIcon">✅</div>

              <div>
                <strong>You are almost done.</strong>

                <p>
                  Confirming creates the active repair request and sends you to the
                  dashboard for tracking.
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
  name: "BookingPage",

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
            rating: "4.9",
            availability: "Today 3–5 PM",
          },

      category: localStorage.getItem("homewiseCategory") || "Plumbing",
      location: localStorage.getItem("homewiseLocation") || "Bellevue, WA",

      diagnosis: {
        likelyIssue: "Possible under-sink leak",
        cost: "$150–$400",
      },

      selectedTime:
        localStorage.getItem("homewiseBookingTime") ||
        localStorage.getItem("homewisePreferredTiming") ||
        "Today 3–5 PM",

      instructions: localStorage.getItem("homewiseInstructions") || "",
      phone: localStorage.getItem("homewisePhone") || "",

      timeOptions: [
        "Today 3–5 PM",
        "Today 5–7 PM",
        "Tomorrow 8–10 AM",
        "Tomorrow 10 AM–12 PM",
        "Tomorrow 1–3 PM",
        "This week",
      ],
    };
  },

  methods: {
    getTimeNote(time) {
      if (time.includes("Today")) {
        return "Fastest option";
      }

      if (time.includes("Tomorrow")) {
        return "Recommended";
      }

      return "Flexible timing";
    },

    confirmBooking() {
      if (!this.phone.trim()) {
        alert("Please enter a phone number so the pro can contact you.");
        return;
      }

      if (!this.location.trim()) {
        alert("Please enter the repair location.");
        return;
      }

      localStorage.setItem("homewiseBookingTime", this.selectedTime);
      localStorage.setItem("homewiseInstructions", this.instructions);
      localStorage.setItem("homewisePhone", this.phone);
      localStorage.setItem("homewiseLocation", this.location);
      localStorage.setItem("homewiseProJobStatus", "pending");

      this.$router.push("/app/confirmation");
    },
  },
};
</script>

<style scoped>
.page {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(22, 163, 115, 0.1), transparent 30%),
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

.stepHeader {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 40px;
  align-items: end;
  margin-bottom: 30px;
}

.backButton {
  border: none;
  background: rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  padding: 11px 16px;
  font-weight: 900;
  cursor: pointer;
  margin-bottom: 24px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
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
  max-width: 850px;
  font-size: clamp(44px, 5vw, 76px);
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

.progressCard,
.mainPanel,
.summaryCard,
.timelineCard,
.tipCard {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  box-shadow: 0 24px 65px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.progressCard {
  padding: 22px;
}

.progressTop {
  display: flex;
  justify-content: space-between;
  font-weight: 900;
  margin-bottom: 14px;
}

.progressTrack {
  height: 12px;
  background: rgba(237, 241, 239, 0.9);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progressFill {
  width: 83%;
  height: 100%;
  background: linear-gradient(90deg, #16a373, #97ead0);
}

.progressCard p {
  color: #6c7470;
  margin: 0;
}

.contentGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 24px;
  align-items: start;
}

.mainPanel {
  padding: 26px;
}

.selectedProCard,
.fieldBlock,
.paymentCard {
  background: rgba(249, 251, 250, 0.78);
  border: 1px solid rgba(237, 240, 239, 0.9);
  border-radius: 24px;
  padding: 22px;
  margin-bottom: 18px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.selectedProCard {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 64px;
  height: 64px;
  background: #1769aa;
  color: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
  flex-shrink: 0;
}

.selectedProCard h2 {
  margin: 0 0 5px;
  font-size: 26px;
}

.selectedProCard p {
  color: #5f6864;
  margin: 0;
}

.cardLabel {
  margin: 0 0 8px;
  color: #7b827f;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
}

.fieldHeader {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
}

.fieldHeader h2,
.fieldBlock h2,
.paymentCard h2,
.summaryCard h2 {
  margin: 0;
  font-size: 24px;
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

.timeGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.timeGrid button {
  border: 1px solid rgba(228, 232, 230, 0.85);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  padding: 18px;
  min-height: 96px;
  text-align: left;
  cursor: pointer;
  transition: 0.18s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.timeGrid button:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.06);
}

.timeGrid button.active {
  background: rgba(229, 247, 239, 0.9);
  border-color: #16a373;
  box-shadow: 0 18px 45px rgba(22, 163, 115, 0.16);
}

.timeGrid strong {
  display: block;
  font-size: 16px;
  margin-bottom: 8px;
}

.timeGrid span {
  color: #5f6864;
  font-weight: 800;
  font-size: 13px;
}

.twoColumn {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.fieldBlock.compact {
  margin-bottom: 0;
}

.textInput,
textarea {
  width: 100%;
  border: 1px solid #e1e6e3;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 18px;
  padding: 16px;
  font-size: 17px;
  box-sizing: border-box;
  outline: none;
}

.textInput {
  height: 58px;
}

textarea {
  min-height: 150px;
  resize: vertical;
  font-family: Arial, Helvetica, sans-serif;
}

.textInput:focus,
textarea:focus {
  border-color: #16a373;
}

.paymentCard {
  display: flex;
  gap: 16px;
}

.paymentIcon {
  width: 56px;
  height: 56px;
  background: #e5f7ef;
  color: #067a53;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  flex-shrink: 0;
}

.paymentCard p {
  color: #5f6864;
  line-height: 1.5;
  margin-bottom: 0;
}

.actionRow {
  display: flex;
  gap: 12px;
  margin-top: 24px;
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

.sidePanel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summaryCard,
.timelineCard,
.tipCard {
  padding: 22px;
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

.nextBox {
  background: #111;
  color: white;
  border-radius: 18px;
  padding: 18px;
  margin-top: 16px;
}

.nextBox p {
  color: #d8d8d8;
  line-height: 1.45;
  margin-bottom: 0;
}

.timelineItem {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6c7470;
  font-weight: 800;
  margin-top: 14px;
}

.timelineItem span {
  width: 30px;
  height: 30px;
  background: #d8dddb;
  color: #5d6662;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.timelineItem.active,
.timelineItem.done {
  color: #067a53;
}

.timelineItem.active span,
.timelineItem.done span {
  background: #16a373;
  color: white;
}

.tipCard {
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

.tipCard p {
  color: #5f6864;
  line-height: 1.45;
  margin: 6px 0 0;
}

@media (max-width: 1100px) {
  .wideContainer {
    width: min(100% - 48px, 1440px);
  }

  .stepHeader,
  .contentGrid,
  .twoColumn {
    grid-template-columns: 1fr;
  }

  .timeGrid {
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

  .timeGrid {
    grid-template-columns: 1fr;
  }

  .selectedProCard,
  .fieldHeader,
  .summaryBox,
  .paymentCard {
    flex-direction: column;
    align-items: flex-start;
  }

  .summaryBox strong {
    text-align: left;
  }
}
</style>