<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Back to dashboard', to: '/pro' },
        { label: 'Jobs', to: '/pro' },
        { label: 'Customer site', to: '/' }
      ]"
      :right-links="[
        { label: 'Help', to: '#' },
        { label: 'Log in', to: '/sign-in' }
      ]"
      :primary-action="{ label: 'Dashboard', to: '/pro' }"
    />

    <section class="jobPage">
      <button class="backButton" @click="$router.push('/pro')">
        ← Back to pro dashboard
      </button>

      <div class="header">
        <div>
          <p class="eyebrow">Professional job view</p>
          <h1>{{ job.issue }}</h1>
          <p class="subtitle">
            Review the customer request, AI repair summary, photo, location, and booking details.
          </p>
        </div>

        <span class="statusBadge">{{ statusText }}</span>
      </div>

      <div class="jobGrid">
        <section class="mainColumn">
          <div v-if="imagePreview" class="photoCard">
            <div class="cardHeader">
              <div>
                <p class="cardLabel">Customer uploaded photo</p>
                <h2>Issue photo</h2>
              </div>

              <span class="softBadge">Photo attached</span>
            </div>

            <img :src="imagePreview" alt="Customer uploaded repair issue" />
          </div>

          <div class="card">
            <div class="cardHeader">
              <div>
                <p class="cardLabel">Customer issue</p>
                <h2>Repair request summary</h2>
              </div>

              <span class="softBadge">{{ job.category }}</span>
            </div>

            <p class="description">{{ job.description }}</p>

            <div class="detailGrid">
              <div class="detailBox">
                <p class="cardLabel">Category</p>
                <strong>{{ job.category }}</strong>
              </div>

              <div class="detailBox">
                <p class="cardLabel">Urgency</p>
                <strong>{{ job.urgency }}</strong>
              </div>

              <div class="detailBox">
                <p class="cardLabel">Estimated cost</p>
                <strong>{{ job.estimatedCost }}</strong>
              </div>

              <div class="detailBox">
                <p class="cardLabel">Diagnostic fee</p>
                <strong>{{ job.diagnosticFee }}</strong>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="cardHeader">
              <div>
                <p class="cardLabel">Access instructions</p>
                <h2>Before arriving</h2>
              </div>
            </div>

            <p class="description">{{ job.instructions }}</p>
          </div>

          <div class="actionPanel">
            <div>
              <p class="cardLabel">Job actions</p>
              <h2>Update job status</h2>
            </div>

            <div class="actionButtons">
              <button v-if="jobStatus === 'pending'" class="acceptButton" @click="acceptJob">
                Accept job
              </button>

              <button v-if="jobStatus === 'pending'" class="declineButton" @click="declineJob">
                Decline job
              </button>

              <button v-if="jobStatus === 'accepted'" class="acceptButton" @click="markOnTheWay">
                Mark on the way
              </button>

              <button
                v-if="jobStatus === 'accepted' || jobStatus === 'on_the_way'"
                class="acceptButton"
                @click="markComplete"
              >
                Mark complete
              </button>

              <button class="lightButton" @click="$router.push('/pro')">
                Back to dashboard
              </button>
            </div>
          </div>
        </section>

        <aside class="sideColumn">
          <div class="card">
            <p class="cardLabel">Customer details</p>

            <div class="customerHeader">
              <div class="customerIcon">🏠</div>

              <div>
                <h2>{{ job.customerName }}</h2>
                <p>Home repair customer</p>
              </div>
            </div>

            <div class="sideRow">
              <span>Location</span>
              <strong>{{ job.location }}</strong>
            </div>

            <div class="sideRow">
              <span>Phone</span>
              <strong>{{ job.phone }}</strong>
            </div>

            <div class="sideRow">
              <span>Time window</span>
              <strong>{{ job.time }}</strong>
            </div>

            <div class="sideRow">
              <span>Status</span>
              <strong>{{ statusText }}</strong>
            </div>

            <div class="mapBox">
              <span>📍</span>
              <p>Google Maps preview later</p>
            </div>
          </div>

          <div class="card">
            <p class="cardLabel">Pro notes</p>
            <h2>Private notes</h2>

            <textarea
              v-model="proNotes"
              placeholder="Add private notes before accepting or completing the job..."
            ></textarea>

            <button class="blackButton" @click="saveNotes">
              Save notes
            </button>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<script>
import HomewiseNavbar from "../components/HomewiseNavbar.vue";

export default {
  name: "ProfessionalJobDetailPage",

  components: {
    HomewiseNavbar,
  },

  data() {
    return {
      jobStatus: localStorage.getItem("homewiseProJobStatus") || "pending",
      imagePreview: localStorage.getItem("homewiseImagePreview") || "",
      proNotes: localStorage.getItem("homewiseProNotes") || "",

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
        instructions:
          localStorage.getItem("homewiseInstructions") ||
          "Ring the doorbell. Please check under the kitchen sink.",
      },
    };
  },

  computed: {
    statusText() {
      if (this.jobStatus === "accepted") {
        return "Accepted";
      }

      if (this.jobStatus === "declined") {
        return "Declined";
      }

      if (this.jobStatus === "on_the_way") {
        return "On the way";
      }

      if (this.jobStatus === "completed") {
        return "Completed";
      }

      return "Pending";
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

    saveNotes() {
      localStorage.setItem("homewiseProNotes", this.proNotes);
      alert("Notes saved.");
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
  max-width: 950px;
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
.photoCard,
.actionPanel {
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
  max-height: 520px;
  object-fit: cover;
  border-radius: 20px;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 18px;
}

.cardLabel {
  color: #7b827f;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0 0 8px;
}

.card h2,
.photoCard h2,
.actionPanel h2 {
  font-size: 28px;
  letter-spacing: -0.6px;
  margin: 0;
}

.description {
  color: #56615c;
  font-size: 18px;
  line-height: 1.55;
  margin: 0;
}

.detailGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 22px;
}

.detailBox {
  background: rgba(249, 251, 250, 0.78);
  border: 1px solid rgba(237, 240, 239, 0.9);
  border-radius: 18px;
  padding: 18px;
}

.customerHeader {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #111;
  color: white;
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 18px;
}

.customerIcon {
  width: 54px;
  height: 54px;
  background: #16a373;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.customerHeader h2 {
  color: white;
  margin: 0 0 4px;
}

.customerHeader p {
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

.mapBox {
  background: rgba(229, 247, 239, 0.9);
  color: #067a53;
  border-radius: 18px;
  padding: 30px;
  text-align: center;
  margin-top: 16px;
}

.mapBox span {
  font-size: 36px;
}

textarea {
  width: 100%;
  min-height: 160px;
  border: 1px solid #e1e6e3;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 18px;
  padding: 16px;
  font-size: 16px;
  box-sizing: border-box;
  resize: vertical;
  outline: none;
  margin-top: 14px;
  font-family: Arial, Helvetica, sans-serif;
}

textarea:focus {
  border-color: #16a373;
}

.actionPanel {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  align-items: center;
}

.actionButtons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.acceptButton,
.declineButton,
.lightButton,
.blackButton {
  border: none;
  border-radius: 15px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
}

.acceptButton,
.blackButton {
  background: #111;
  color: white;
  box-shadow: 0 14px 32px rgba(17, 17, 17, 0.14);
}

.declineButton,
.lightButton {
  background: #e5f7ef;
  color: #067a53;
}

.blackButton {
  width: 100%;
  margin-top: 14px;
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

  .header,
  .actionPanel {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 700px) {
  .jobPage {
    width: min(100% - 32px, 1440px);
  }

  h1 {
    font-size: 42px;
    letter-spacing: -1.5px;
  }

  .detailGrid {
    grid-template-columns: 1fr;
  }

  .cardHeader,
  .customerHeader,
  .sideRow {
    flex-direction: column;
    align-items: flex-start;
  }

  .sideRow strong {
    text-align: left;
  }

  .actionButtons,
  .acceptButton,
  .declineButton,
  .lightButton {
    width: 100%;
  }
}
</style>