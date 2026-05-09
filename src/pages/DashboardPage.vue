<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Overview', to: '/app/dashboard' },
        { label: 'Active repair', to: '/app/job' },
        { label: 'New repair', to: '/app' }
      ]"
      :right-links="[
        { label: 'Help', to: '#' },
        { label: 'Log in', to: '/sign-in' }
      ]"
      :primary-action="{ label: 'New repair', to: '/app' }"
    />

    <section class="dashboardPage">
      <div class="dashboardTopbar">
        <div>
          <p class="eyebrow">Homeowner dashboard</p>
          <h1>Dashboard Overview</h1>
          <p class="subtitle">
            Track your active repair, selected pro, booking status, and next steps.
          </p>
        </div>

        <div class="topbarActions">
          <button class="lightButton" @click="$router.push('/app/job')">
            View repair
          </button>

          <button class="blackButton" @click="$router.push('/app')">
            New repair
          </button>
        </div>
      </div>

      <section class="statsGrid">
        <StatCard
          icon="🛠️"
          label="Active Repair"
          :value="diagnosis.likelyIssue"
          :note="category"
        />

        <StatCard
          icon="📍"
          label="Current Status"
          :value="dashboardStatus"
          :note="bookingTime"
        />

        <StatCard
          icon="💵"
          label="Estimated Cost"
          :value="diagnosis.cost"
          note="Final quote by pro"
        />

        <StatCard
          icon="👷"
          label="Selected Pro"
          :value="selectedPro.name"
          :note="selectedPro.trade || 'Home repair pro'"
        />
      </section>

      <section class="mainGrid">
        <div class="largeCard">
          <div class="cardHeader">
            <div>
              <p class="cardLabel">Repair progress</p>
              <h2>{{ diagnosis.likelyIssue }}</h2>
            </div>

            <span class="statusBadge">{{ dashboardStatus }}</span>
          </div>

          <div class="progressTrack">
            <div class="progressFill" :style="{ width: progressPercent + '%' }"></div>
          </div>

          <div class="timeline">
            <div class="timelineItem done">
              <span>✓</span>
              <div>
                <strong>Request submitted</strong>
                <p>Your repair request was created.</p>
              </div>
            </div>

            <div class="timelineItem" :class="{ active: proStatus === 'pending' }">
              <span>2</span>
              <div>
                <strong>Pro reviewing</strong>
                <p>The professional is reviewing your issue.</p>
              </div>
            </div>

            <div
              class="timelineItem"
              :class="{ active: ['accepted', 'on_the_way', 'completed'].includes(proStatus) }"
            >
              <span>3</span>
              <div>
                <strong>Visit confirmed</strong>
                <p>Your selected pro accepted the visit.</p>
              </div>
            </div>

            <div
              class="timelineItem"
              :class="{ active: ['on_the_way', 'completed'].includes(proStatus) }"
            >
              <span>4</span>
              <div>
                <strong>Pro on the way</strong>
                <p>The pro is heading to your home.</p>
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

        <aside class="sideCard proCard">
          <div class="softGlow"></div>

          <div class="avatar">{{ selectedPro.initials || "HW" }}</div>

          <h2>{{ selectedPro.name }}</h2>
          <p>{{ selectedPro.trade || "Home repair pro" }}</p>

          <div class="sideMetric">
            <span>Rating</span>
            <strong>{{ selectedPro.rating || "4.9" }} ⭐</strong>
          </div>

          <div class="sideMetric">
            <span>Time window</span>
            <strong>{{ bookingTime }}</strong>
          </div>

          <div class="sideMetric">
            <span>Status</span>
            <strong>{{ dashboardStatus }}</strong>
          </div>

          <button class="blackButton fullButton" @click="$router.push('/app/job')">
            View job details
          </button>
        </aside>
      </section>

      <section class="bottomGrid">
        <div class="panelCard">
          <p class="cardLabel">Repair details</p>
          <h2>Your request</h2>

          <div class="detailGrid">
            <div>
              <span>Category</span>
              <strong>{{ category }}</strong>
            </div>

            <div>
              <span>Location</span>
              <strong>{{ location }}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{{ phone || "Not added" }}</strong>
            </div>

            <div>
              <span>Diagnostic fee</span>
              <strong>{{ selectedPro.price || "$99" }}</strong>
            </div>
          </div>

          <div class="descriptionBox">
            <strong>Description</strong>
            <p>{{ description }}</p>
          </div>
        </div>

        <div class="panelCard">
          <p class="cardLabel">Next steps</p>
          <h2>Before the pro arrives</h2>

          <div class="nextItem">
            <span>1</span>
            Keep your phone nearby for confirmation.
          </div>

          <div class="nextItem">
            <span>2</span>
            Clear the area around the repair issue.
          </div>

          <div class="nextItem">
            <span>3</span>
            Take another photo if the problem gets worse.
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script>
import HomewiseNavbar from "../components/HomewiseNavbar.vue";
import StatCard from "../components/dashboard/StatCard.vue";

export default {
  name: "DashboardPage",

  components: {
    HomewiseNavbar,
    StatCard,
  },

  data() {
    const savedPro = localStorage.getItem("homewiseSelectedPro");
    const userName = localStorage.getItem("homewiseUserName") || "Homewise User";

    return {
      userName,

      selectedPro: savedPro
        ? JSON.parse(savedPro)
        : {
            initials: "MR",
            name: "Mike R. Plumbing",
            trade: "Plumber · Leak repair",
            price: "$99",
            rating: "4.9",
          },

      proStatus: localStorage.getItem("homewiseProJobStatus") || "pending",
      category: localStorage.getItem("homewiseCategory") || "Plumbing",
      bookingTime: localStorage.getItem("homewiseBookingTime") || "Today 3–5 PM",
      phone: localStorage.getItem("homewisePhone") || "",
      location: localStorage.getItem("homewiseLocation") || "Bellevue, WA",
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
    userInitials() {
      return this.userName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    },

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

    progressPercent() {
      if (this.proStatus === "completed") return 100;
      if (this.proStatus === "on_the_way") return 78;
      if (this.proStatus === "accepted") return 56;
      if (this.proStatus === "pending") return 32;
      return 20;
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

.dashboardPage {
  width: min(1440px, calc(100% - 80px));
  margin: 0 auto;
  padding: 38px 0 70px;
}

.dashboardTopbar {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: flex-start;
  margin-bottom: 24px;
}

.eyebrow {
  color: #16a373;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 13px;
  margin: 0 0 12px;
}

h1 {
  font-size: clamp(42px, 4vw, 68px);
  line-height: 0.98;
  letter-spacing: -2.5px;
  margin: 0 0 12px;
}

.subtitle {
  color: #56615c;
  font-size: 19px;
  line-height: 1.5;
  max-width: 720px;
  margin: 0;
}

.topbarActions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 18px;
}

.mainGrid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 330px;
  gap: 18px;
  margin-bottom: 18px;
}

.largeCard,
.sideCard,
.panelCard {
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 28px;
  padding: 26px;
  box-shadow: 0 24px 65px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 26px;
}

.cardLabel {
  margin: 0 0 8px;
  color: #7b827f;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  font-size: 26px;
  letter-spacing: -0.5px;
}

.statusBadge {
  background: rgba(229, 247, 239, 0.9);
  color: #067a53;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 900;
  white-space: nowrap;
}

.progressTrack {
  height: 12px;
  background: rgba(238, 241, 240, 0.9);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 28px;
}

.progressFill {
  height: 100%;
  background: linear-gradient(90deg, #16a373, #97ead0);
  border-radius: 999px;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}

.timelineItem {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 18px;
  padding: 16px;
  opacity: 0.58;
}

.timelineItem.done,
.timelineItem.active {
  opacity: 1;
}

.timelineItem span {
  width: 32px;
  height: 32px;
  background: #d9dfdc;
  color: #66706b;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-bottom: 14px;
}

.timelineItem.done span,
.timelineItem.active span {
  background: #16a373;
  color: white;
}

.timelineItem strong {
  display: block;
  font-size: 15px;
}

.timelineItem p {
  color: #6c7470;
  line-height: 1.4;
  margin: 6px 0 0;
  font-size: 13px;
}

.proCard {
  position: relative;
  overflow: hidden;
}

.softGlow {
  position: absolute;
  top: -80px;
  right: -70px;
  width: 210px;
  height: 210px;
  background: radial-gradient(circle, rgba(22, 163, 115, 0.32), transparent 65%);
}

.avatar {
  width: 72px;
  height: 72px;
  background: #1769aa;
  color: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 24px;
  margin-bottom: 16px;
  position: relative;
}

.proCard p {
  color: #6c7470;
}

.sideMetric {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(231, 233, 232, 0.9);
  padding: 15px 0;
  gap: 16px;
}

.sideMetric span {
  color: #6c7470;
}

.blackButton,
.lightButton {
  border: none;
  border-radius: 15px;
  padding: 15px 20px;
  font-weight: 900;
  cursor: pointer;
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

.fullButton {
  width: 100%;
  margin-top: 14px;
}

.bottomGrid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;
}

.detailGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 22px;
}

.detailGrid div {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 16px;
  padding: 16px;
}

.detailGrid span {
  display: block;
  color: #6c7470;
  margin-bottom: 8px;
}

.descriptionBox {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 16px;
  padding: 18px;
  margin-top: 16px;
}

.descriptionBox p {
  color: #6c7470;
  line-height: 1.5;
  margin-bottom: 0;
}

.nextItem {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 16px;
  padding: 16px;
  margin-top: 12px;
  color: #4c5551;
  font-weight: 700;
  display: flex;
  gap: 12px;
  align-items: center;
}

.nextItem span {
  width: 28px;
  height: 28px;
  background: #16a373;
  color: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

@media (max-width: 1100px) {
  .dashboardPage {
    width: min(100% - 48px, 1440px);
  }

  .dashboardTopbar {
    flex-direction: column;
  }

  .statsGrid {
    grid-template-columns: 1fr 1fr;
  }

  .mainGrid,
  .bottomGrid {
    grid-template-columns: 1fr;
  }

  .timeline {
    grid-template-columns: 1fr;
  }

  .detailGrid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 650px) {
  .dashboardPage {
    width: min(100% - 32px, 1440px);
  }

  .statsGrid,
  .detailGrid {
    grid-template-columns: 1fr;
  }

  .topbarActions,
  .blackButton,
  .lightButton {
    width: 100%;
  }
}
</style>