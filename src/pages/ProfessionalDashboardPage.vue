<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Overview', to: '/pro' },
        { label: 'New requests', to: '/pro/job' },
        { label: 'Customer site', to: '/' }
      ]"
      :right-links="[
        { label: 'Help', to: '#' },
        { label: 'Log in', to: '/sign-in' }
      ]"
      :primary-action="{ label: 'Review job', to: '/pro/job' }"
    />

    <section class="dashboardPage">
      <div class="dashboardTopbar">
        <div>
          <p class="eyebrow">Professional dashboard</p>
          <h1>Professional Overview</h1>
          <p class="subtitle">
            Manage incoming requests, active jobs, and customer visits.
          </p>
        </div>

        <div class="topbarActions">
          <button class="lightButton" @click="$router.push('/')">
            Customer site
          </button>

          <button class="blackButton" @click="$router.push('/pro/job')">
            Review request
          </button>
        </div>
      </div>

      <section class="statsGrid">
        <StatCard
          icon="📥"
          label="New Requests"
          value="1"
          note="Needs review"
        />

        <StatCard
          icon="🗓️"
          label="Jobs Today"
          :value="jobsToday"
          :note="statusText"
        />

        <StatCard
          icon="💵"
          label="Potential Earnings"
          value="$99"
          note="Diagnostic fee"
        />

        <StatCard
          icon="⭐"
          label="Rating"
          value="4.9"
          note="182 completed jobs"
        />
      </section>

      <section class="mainGrid">
        <div class="largeCard">
          <div class="cardHeader">
            <div>
              <p class="cardLabel">Incoming job request</p>
              <h2>{{ job.issue }}</h2>
            </div>

            <span class="statusBadge">{{ statusText }}</span>
          </div>

          <p class="description">{{ job.description }}</p>

          <div class="jobMetrics">
            <div>
              <span>Category</span>
              <strong>{{ job.category }}</strong>
            </div>

            <div>
              <span>Urgency</span>
              <strong>{{ job.urgency }}</strong>
            </div>

            <div>
              <span>Estimated cost</span>
              <strong>{{ job.estimatedCost }}</strong>
            </div>

            <div>
              <span>Time window</span>
              <strong>{{ job.time }}</strong>
            </div>
          </div>

          <div class="customerPanel">
            <div>
              <p class="cardLabel">Customer</p>
              <h3>{{ job.customerName }}</h3>
              <p>{{ job.location }}</p>
              <p>Phone: {{ job.phone }}</p>
            </div>

            <div class="mapBox">
              <span>📍</span>
              <p>Map preview</p>
            </div>
          </div>

          <div class="actions">
            <button class="blackButton" @click="$router.push('/pro/job')">
              Review full job
            </button>

            <button v-if="jobStatus === 'pending'" class="greenButton" @click="acceptJob">
              Accept job
            </button>

            <button v-if="jobStatus === 'pending'" class="lightButton" @click="declineJob">
              Decline
            </button>

            <button v-if="jobStatus === 'accepted'" class="greenButton" @click="markOnTheWay">
              Mark on the way
            </button>

            <button
              v-if="jobStatus === 'accepted' || jobStatus === 'on_the_way'"
              class="blackButton"
              @click="markComplete"
            >
              Mark complete
            </button>
          </div>
        </div>

        <aside class="sideCard proCard">
          <div class="softGlow"></div>

          <div class="avatar">MR</div>

          <h2>Mike R. Plumbing</h2>
          <p>Plumber · Leak repair specialist</p>

          <div class="sideMetric">
            <span>Status</span>
            <strong>{{ statusText }}</strong>
          </div>

          <div class="sideMetric">
            <span>Response rate</span>
            <strong>96%</strong>
          </div>

          <div class="sideMetric">
            <span>Service area</span>
            <strong>Bellevue</strong>
          </div>

          <div class="sideMetric">
            <span>Completed jobs</span>
            <strong>182</strong>
          </div>
        </aside>
      </section>

      <section class="bottomGrid">
        <div class="panelCard">
          <p class="cardLabel">Active jobs</p>
          <h2>Today’s schedule</h2>

          <div v-if="jobStatus === 'accepted' || jobStatus === 'on_the_way'" class="scheduleCard">
            <div>
              <strong>{{ job.issue }}</strong>
              <p>{{ job.time }} · {{ job.location }}</p>
            </div>

            <span>{{ statusText }}</span>
          </div>

          <div v-else class="emptyState">
            <strong>No accepted active jobs yet</strong>
            <p>Accept the incoming request to add it to today’s schedule.</p>
          </div>
        </div>

        <div class="panelCard">
          <p class="cardLabel">Pro checklist</p>
          <h2>Account readiness</h2>

          <div class="checkItem done">
            <span>✓</span>
            Business profile created
          </div>

          <div class="checkItem done">
            <span>✓</span>
            Service area added
          </div>

          <div class="checkItem">
            <span>3</span>
            Stripe payouts later
          </div>

          <div class="checkItem">
            <span>4</span>
            License verification later
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
  name: "ProfessionalDashboardPage",

  components: {
    HomewiseNavbar,
    StatCard,
  },

  data() {
    return {
      jobStatus: localStorage.getItem("homewiseProJobStatus") || "pending",

      job: {
        issue: "Possible under-sink leak",
        category: localStorage.getItem("homewiseCategory") || "Plumbing",
        description:
          localStorage.getItem("homewiseDescription") ||
          "My kitchen sink is leaking under the cabinet and water is pooling on the floor.",
        urgency: localStorage.getItem("homewiseUrgency") || "Today",
        estimatedCost: "$150–$400",
        diagnosticFee: "$99",
        time: localStorage.getItem("homewiseBookingTime") || "Today 3–5 PM",
        customerName: "Homewise customer",
        location: localStorage.getItem("homewiseLocation") || "Bellevue, WA",
        phone: localStorage.getItem("homewisePhone") || "(425) 555-1234",
      },
    };
  },

  computed: {
    statusText() {
      if (this.jobStatus === "accepted") return "Accepted";
      if (this.jobStatus === "declined") return "Declined";
      if (this.jobStatus === "on_the_way") return "On the way";
      if (this.jobStatus === "completed") return "Completed";
      return "Pending";
    },

    jobsToday() {
      if (this.jobStatus === "accepted" || this.jobStatus === "on_the_way") {
        return "1";
      }

      return "0";
    },
  },

  methods: {
    acceptJob() {
      this.jobStatus = "accepted";
      localStorage.setItem("homewiseProJobStatus", "accepted");
    },

    declineJob() {
      this.jobStatus = "declined";
      localStorage.setItem("homewiseProJobStatus", "declined");
    },

    markOnTheWay() {
      this.jobStatus = "on_the_way";
      localStorage.setItem("homewiseProJobStatus", "on_the_way");
    },

    markComplete() {
      this.jobStatus = "completed";
      localStorage.setItem("homewiseProJobStatus", "completed");
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

.description {
  color: #5f6864;
  font-size: 17px;
  line-height: 1.55;
  margin: 18px 0 24px;
}

.statusBadge {
  background: rgba(229, 247, 239, 0.9);
  color: #067a53;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 900;
  white-space: nowrap;
}

.jobMetrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

.jobMetrics div {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 16px;
  padding: 16px;
}

.jobMetrics span {
  display: block;
  color: #6c7470;
  margin-bottom: 8px;
}

.customerPanel {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 20px;
  padding: 22px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.customerPanel h3 {
  font-size: 24px;
  margin: 6px 0;
}

.customerPanel p {
  color: #5f6864;
}

.mapBox {
  width: 160px;
  background: rgba(229, 247, 239, 0.9);
  color: #067a53;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mapBox span {
  font-size: 32px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.blackButton,
.greenButton,
.lightButton {
  border: none;
  border-radius: 15px;
  padding: 14px 18px;
  font-weight: 900;
  cursor: pointer;
}

.blackButton {
  background: #111;
  color: white;
  box-shadow: 0 14px 32px rgba(17, 17, 17, 0.14);
}

.greenButton {
  background: #16a373;
  color: white;
  box-shadow: 0 14px 32px rgba(22, 163, 115, 0.18);
}

.lightButton {
  background: #e5f7ef;
  color: #067a53;
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

.bottomGrid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;
}

.scheduleCard,
.emptyState {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 18px;
  padding: 18px;
  margin-top: 18px;
}

.scheduleCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
}

.scheduleCard p,
.emptyState p {
  color: #6c7470;
  margin-bottom: 0;
}

.scheduleCard span {
  background: rgba(229, 247, 239, 0.9);
  color: #067a53;
  border-radius: 999px;
  padding: 8px 12px;
  font-weight: 900;
}

.checkItem {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #777;
  font-weight: 700;
  margin-top: 16px;
}

.checkItem span {
  width: 28px;
  height: 28px;
  background: #ddd;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 13px;
  font-weight: 900;
}

.checkItem.done {
  color: #067a53;
}

.checkItem.done span {
  background: #16a373;
  color: white;
}

@media (max-width: 1100px) {
  .dashboardPage {
    width: min(100% - 48px, 1440px);
  }

  .statsGrid {
    grid-template-columns: 1fr 1fr;
  }

  .mainGrid,
  .bottomGrid {
    grid-template-columns: 1fr;
  }

  .jobMetrics {
    grid-template-columns: 1fr 1fr;
  }

  .dashboardTopbar {
    flex-direction: column;
  }
}

@media (max-width: 650px) {
  .dashboardPage {
    width: min(100% - 32px, 1440px);
  }

  .statsGrid,
  .jobMetrics {
    grid-template-columns: 1fr;
  }

  .customerPanel,
  .scheduleCard {
    flex-direction: column;
  }

  .mapBox {
    width: 100%;
    min-height: 130px;
  }
}
</style>