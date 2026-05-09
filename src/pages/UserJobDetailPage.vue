<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Dashboard', to: '/app/dashboard' },
        { label: 'Repair history', to: '/app/dashboard' },
        { label: 'For pros', to: '/pro' }
      ]"
      :right-links="[
        { label: 'Help', to: '#' },
        { label: 'Log in', to: '/sign-in' }
      ]"
      :primary-action="{ label: 'New request', to: '/app' }"
    />

    <section class="jobPage">
      <button class="backButton" @click="$router.push('/app/dashboard')">
        ← Back to dashboard
      </button>

      <div class="header">
        <div>
          <p class="eyebrow">Repair details</p>
          <h1>{{ diagnosis.likelyIssue }}</h1>
          <p class="subtitle">
            Track your repair status, view your uploaded photo, and review your pro and booking details.
          </p>
        </div>

        <span class="statusBadge">{{ dashboardStatus }}</span>
      </div>

      <div class="jobGrid">
        <section class="mainColumn">
          <div v-if="imagePreview" class="photoCard">
            <p class="cardLabel">Uploaded photo</p>
            <img :src="imagePreview" alt="Uploaded repair issue" />
          </div>

          <div class="card">
            <div class="cardHeader">
              <div>
                <p class="cardLabel">Live status</p>
                <h2>Status timeline</h2>
              </div>

              <span class="softBadge">{{ dashboardStatus }}</span>
            </div>

            <div class="timeline">
              <div class="timelineItem done">
                <span>✓</span>
                <div>
                  <strong>Request submitted</strong>
                  <p>Your issue and booking details were saved.</p>
                </div>
              </div>

              <div class="timelineItem" :class="{ active: proStatus === 'pending' }">
                <span>2</span>
                <div>
                  <strong>Pro reviewing</strong>
                  <p>The professional is reviewing your request.</p>
                </div>
              </div>

              <div
                class="timelineItem"
                :class="{ active: proStatus === 'accepted' || proStatus === 'on_the_way' || proStatus === 'completed' }"
              >
                <span>3</span>
                <div>
                  <strong>Visit confirmed</strong>
                  <p>The professional accepted the job.</p>
                </div>
              </div>

              <div
                class="timelineItem"
                :class="{ active: proStatus === 'on_the_way' || proStatus === 'completed' }"
              >
                <span>4</span>
                <div>
                  <strong>Pro on the way</strong>
                  <p>The professional is heading to your home.</p>
                </div>
              </div>

              <div class="timelineItem" :class="{ active: proStatus === 'completed' }">
                <span>5</span>
                <div>
                  <strong>Completed</strong>
                  <p>The repair has been marked complete.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="cardHeader">
              <div>
                <p class="cardLabel">AI repair summary</p>
                <h2>Issue overview</h2>
              </div>
            </div>

            <div class="detailGrid">
              <div class="detailBox">
                <p class="cardLabel">Likely issue</p>
                <strong>{{ diagnosis.likelyIssue }}</strong>
              </div>

              <div class="detailBox">
                <p class="cardLabel">Estimated cost</p>
                <strong>{{ diagnosis.cost }}</strong>
              </div>

              <div class="detailBox">
                <p class="cardLabel">Category</p>
                <strong>{{ category }}</strong>
              </div>

              <div class="detailBox">
                <p class="cardLabel">Urgency</p>
                <strong>{{ urgency }}</strong>
              </div>
            </div>

            <div class="descriptionBox">
              <strong>Your description</strong>
              <p>{{ description }}</p>
            </div>
          </div>
        </section>

        <aside class="sideColumn">
          <div class="card">
            <p class="cardLabel">Selected pro</p>

            <div class="proHeader">
              <div class="avatar">{{ selectedPro.initials || "HW" }}</div>

              <div>
                <h2>{{ selectedPro.name }}</h2>
                <p>{{ selectedPro.trade || "Home repair pro" }}</p>
              </div>
            </div>

            <div class="sideRow">
              <span>Time</span>
              <strong>{{ bookingTime }}</strong>
            </div>

            <div class="sideRow">
              <span>Location</span>
              <strong>{{ location }}</strong>
            </div>

            <div class="sideRow">
              <span>Phone</span>
              <strong>{{ phone || "Not added" }}</strong>
            </div>

            <div class="sideRow">
              <span>Status</span>
              <strong>{{ dashboardStatus }}</strong>
            </div>

            <button class="blackButton">Message pro</button>
            <button class="lightButton">Cancel or reschedule</button>
          </div>

          <div class="card">
            <p class="cardLabel">Access instructions</p>
            <p class="instructionsText">
              {{ instructions || "No instructions added." }}
            </p>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<script>
import HomewiseNavbar from "../components/HomewiseNavbar.vue";

export default {
  name: "UserJobDetailPage",

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

      proStatus: localStorage.getItem("homewiseProJobStatus") || "pending",
      category: localStorage.getItem("homewiseCategory") || "Plumbing",
      urgency: localStorage.getItem("homewiseUrgency") || "Today",
      bookingTime: localStorage.getItem("homewiseBookingTime") || "Today 3–5 PM",
      phone: localStorage.getItem("homewisePhone") || "",
      location: localStorage.getItem("homewiseLocation") || "Bellevue, WA",
      instructions: localStorage.getItem("homewiseInstructions") || "",
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

  computed: {
    dashboardStatus() {
      if (this.proStatus === "accepted") {
        return "Pro confirmed";
      }

      if (this.proStatus === "on_the_way") {
        return "Pro is on the way";
      }

      if (this.proStatus === "completed") {
        return "Repair completed";
      }

      if (this.proStatus === "declined") {
        return "Finding another pro";
      }

      return "Pro reviewing";
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

.jobPage {
  width: min(1440px, calc(100% - 80px));
  margin: 0 auto;
  padding: 38px 0 70px;
}

.backButton {
  border: none;
  background: rgba(255, 255, 255, 0.72);
  color: #111;
  border-radius: 999px;
  padding: 11px 16px;
  font-weight: 900;
  cursor: pointer;
  margin-bottom: 30px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.04);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: flex-start;
  margin-bottom: 34px;
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
  max-width: 900px;
  font-size: clamp(44px, 5vw, 76px);
  line-height: 0.97;
  letter-spacing: -3px;
  margin: 0 0 18px;
}

.subtitle {
  color: #56615c;
  font-size: 20px;
  line-height: 1.55;
  max-width: 780px;
  margin: 0;
}

.statusBadge,
.softBadge {
  background: rgba(229, 247, 239, 0.9);
  color: #067a53;
  border-radius: 999px;
  padding: 12px 16px;
  font-weight: 900;
  white-space: nowrap;
}

.jobGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 390px;
  gap: 24px;
  align-items: start;
}

.mainColumn,
.sideColumn {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.card,
.photoCard {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  padding: 26px;
  box-shadow: 0 24px 65px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.photoCard img {
  width: 100%;
  max-height: 460px;
  object-fit: cover;
  border-radius: 20px;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 22px;
}

.cardLabel {
  color: #7b827f;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0 0 8px;
}

.card h2 {
  font-size: 28px;
  letter-spacing: -0.6px;
  margin: 0;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.timelineItem {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 16px;
  opacity: 0.65;
}

.timelineItem span {
  width: 38px;
  height: 38px;
  background: #d8dddb;
  color: #5d6662;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.timelineItem.done,
.timelineItem.active {
  opacity: 1;
}

.timelineItem.done span,
.timelineItem.active span {
  background: #16a373;
  color: white;
}

.timelineItem p {
  color: #56615c;
  line-height: 1.45;
  margin: 6px 0 0;
}

.detailGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.detailBox,
.descriptionBox {
  background: rgba(249, 251, 250, 0.78);
  border: 1px solid rgba(237, 240, 239, 0.9);
  border-radius: 18px;
  padding: 18px;
}

.descriptionBox {
  margin-top: 18px;
}

.descriptionBox p,
.instructionsText {
  color: #56615c;
  line-height: 1.5;
  margin-bottom: 0;
}

.proHeader {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #111;
  color: white;
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 18px;
}

.avatar {
  width: 58px;
  height: 58px;
  background: #1769aa;
  color: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 19px;
  flex-shrink: 0;
}

.proHeader h2 {
  color: white;
  margin: 0 0 4px;
}

.proHeader p {
  color: #d8d8d8;
  margin: 0;
}

.sideRow {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  background: rgba(246, 248, 247, 0.85);
  border-radius: 16px;
  padding: 15px;
  margin-top: 12px;
}

.sideRow span {
  color: #6c7470;
}

.sideRow strong {
  text-align: right;
}

.blackButton,
.lightButton {
  width: 100%;
  border: none;
  border-radius: 15px;
  padding: 16px;
  font-weight: 900;
  cursor: pointer;
  margin-top: 12px;
  font-size: 15px;
}

.blackButton {
  background: #111;
  color: white;
  box-shadow: 0 14px 32px rgba(17, 17, 17, 0.14);
}

.lightButton {
  background: #e5f7ef;
  color: #067a53;
}

@media (max-width: 1100px) {
  .jobPage {
    width: min(100% - 48px, 1440px);
  }

  .jobGrid {
    grid-template-columns: 1fr;
  }

  .detailGrid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 700px) {
  .jobPage {
    width: min(100% - 32px, 1440px);
  }

  .header,
  .cardHeader,
  .proHeader,
  .sideRow {
    flex-direction: column;
    align-items: flex-start;
  }

  h1 {
    font-size: 42px;
    letter-spacing: -1.5px;
  }

  .detailGrid {
    grid-template-columns: 1fr;
  }

  .sideRow strong {
    text-align: left;
  }
}
</style>