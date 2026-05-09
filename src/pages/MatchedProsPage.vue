<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Back to summary', to: '/app/diagnosis' },
        { label: 'Dashboard', to: '/app/dashboard' },
        { label: 'For pros', to: '/pro' }
      ]"
      :right-links="[
        { label: 'Help', to: '#' },
        { label: 'Log in', to: '/sign-in' }
      ]"
      :primary-action="{ label: 'Start over', to: '/app' }"
    />

    <section class="onboarding">
      <div class="wideContainer">
        <div class="stepHeader">
          <div>
            <button class="backButton" @click="$router.push('/app/diagnosis')">
              ← Back
            </button>

            <p class="eyebrow">Step 4 of 6</p>

            <h1>Choose a pro for your repair.</h1>

            <p class="subtitle">
              Homewise matched your repair request with local professionals based on
              category, urgency, estimated issue type, location, and availability.
            </p>
          </div>

          <div class="progressCard">
            <div class="progressTop">
              <span>Repair request</span>
              <strong>66%</strong>
            </div>

            <div class="progressTrack">
              <div class="progressFill"></div>
            </div>

            <p>Next: select a time window and confirm booking.</p>
          </div>
        </div>

        <div class="contentGrid">
          <section class="mainPanel">
            <div class="panelTop">
              <div>
                <p class="cardLabel">Matched professionals</p>
                <h2>{{ pros.length }} pros near {{ location }}</h2>
              </div>

              <span class="softBadge">{{ category }}</span>
            </div>

            <div class="filterBar">
              <button class="activeFilter">Best match</button>
              <button>Soonest available</button>
              <button>Lowest diagnostic fee</button>
              <button>Highest rated</button>
            </div>

            <div class="prosList">
              <button
                v-for="pro in pros"
                :key="pro.id"
                class="proCard"
                :class="{ selected: selectedPro && selectedPro.id === pro.id }"
                @click="selectPro(pro)"
              >
                <div class="avatar">{{ pro.initials }}</div>

                <div class="proContent">
                  <div class="proTop">
                    <div>
                      <div class="proTitleRow">
                        <h2>{{ pro.name }}</h2>
                        <span v-if="pro.badges.includes('Best match')" class="bestBadge">
                          Best match
                        </span>
                      </div>

                      <p class="trade">{{ pro.trade }}</p>
                    </div>

                    <div class="priceBox">
                      <strong>{{ pro.price }}</strong>
                      <span>{{ pro.priceNote }}</span>
                    </div>
                  </div>

                  <div class="metaGrid">
                    <div>
                      <span>Rating</span>
                      <strong>⭐ {{ pro.rating }}</strong>
                    </div>

                    <div>
                      <span>Reviews</span>
                      <strong>{{ pro.reviews }}</strong>
                    </div>

                    <div>
                      <span>Available</span>
                      <strong>{{ pro.availability }}</strong>
                    </div>

                    <div>
                      <span>Trust</span>
                      <strong>{{ pro.license }}</strong>
                    </div>
                  </div>

                  <div class="badgeRow">
                    <span v-for="badge in pro.badges" :key="badge">
                      {{ badge }}
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <div class="actionRow">
              <button class="primaryButton" :disabled="!selectedPro" @click="continueNext">
                Continue to booking
              </button>

              <button class="secondaryButton" @click="$router.push('/app/diagnosis')">
                Review AI summary
              </button>
            </div>
          </section>

          <aside class="sidePanel">
            <div class="summaryCard">
              <p class="cardLabel">Job summary</p>

              <h2>{{ diagnosis.likelyIssue }}</h2>

              <div class="summaryBox">
                <span>Category</span>
                <strong>{{ category }}</strong>
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
                <span>Urgency</span>
                <strong>{{ diagnosis.urgency }}</strong>
              </div>

              <div class="selectedBox">
                <strong>Selected pro</strong>

                <p v-if="selectedPro">
                  {{ selectedPro.name }} · {{ selectedPro.availability }}
                </p>

                <p v-else>
                  Choose a pro to continue.
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

              <div class="timelineItem active">
                <span>4</span>
                Match pro
              </div>

              <div class="timelineItem">
                <span>5</span>
                Book repair
              </div>
            </div>

            <div class="tipCard">
              <div class="tipIcon">🛡️</div>

              <div>
                <strong>Why show multiple pros?</strong>

                <p>
                  Users should be able to compare timing, price, rating, and specialty before booking.
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

function createPros(category) {
  if (category === "Electrical") {
    return [
      {
        id: 1,
        initials: "BE",
        name: "BrightLine Electric",
        trade: "Electrician · Outlets and breakers",
        price: "$125",
        priceNote: "diagnostic",
        rating: "4.9",
        reviews: "143",
        availability: "Today 4–6 PM",
        license: "Licensed",
        badges: ["Best match", "Licensed", "Same-day"],
      },
      {
        id: 2,
        initials: "NE",
        name: "Northstar Electrical",
        trade: "Electrician · Wiring repair",
        price: "$150",
        priceNote: "diagnostic",
        rating: "4.8",
        reviews: "201",
        availability: "Tomorrow AM",
        license: "Licensed",
        badges: ["Highly rated", "Panel work"],
      },
    ];
  }

  if (category === "HVAC") {
    return [
      {
        id: 1,
        initials: "CH",
        name: "Cascade Heating & Air",
        trade: "HVAC · Heating and cooling",
        price: "$129",
        priceNote: "diagnostic",
        rating: "4.9",
        reviews: "188",
        availability: "Today 2–4 PM",
        license: "Licensed",
        badges: ["Best match", "Same-day", "HVAC specialist"],
      },
      {
        id: 2,
        initials: "AC",
        name: "AirCare Pros",
        trade: "HVAC · AC and furnace repair",
        price: "$99",
        priceNote: "diagnostic",
        rating: "4.7",
        reviews: "119",
        availability: "Tomorrow",
        license: "Licensed",
        badges: ["Good value", "Fast response"],
      },
    ];
  }

  if (category === "Roof") {
    return [
      {
        id: 1,
        initials: "ER",
        name: "Evergreen Roofing",
        trade: "Roofer · Leak and flashing repair",
        price: "$149",
        priceNote: "inspection",
        rating: "4.9",
        reviews: "164",
        availability: "Tomorrow 9–11 AM",
        license: "Licensed",
        badges: ["Best match", "Roof leak specialist"],
      },
      {
        id: 2,
        initials: "PN",
        name: "PNW Roof Care",
        trade: "Roofer · Shingles and gutters",
        price: "$99",
        priceNote: "inspection",
        rating: "4.8",
        reviews: "91",
        availability: "This week",
        license: "Licensed",
        badges: ["Good value", "Exterior repair"],
      },
    ];
  }

  if (category === "Appliance") {
    return [
      {
        id: 1,
        initials: "FA",
        name: "FixAll Appliance",
        trade: "Appliance repair · Kitchen and laundry",
        price: "$89",
        priceNote: "diagnostic",
        rating: "4.8",
        reviews: "133",
        availability: "Today 5–7 PM",
        license: "Verified",
        badges: ["Best match", "Appliance specialist"],
      },
      {
        id: 2,
        initials: "RA",
        name: "Reliable Appliance Pros",
        trade: "Appliance repair · Washers, dryers, fridges",
        price: "$109",
        priceNote: "diagnostic",
        rating: "4.7",
        reviews: "107",
        availability: "Tomorrow",
        license: "Verified",
        badges: ["Fast response", "Good value"],
      },
    ];
  }

  return [
    {
      id: 1,
      initials: "MR",
      name: "Mike R. Plumbing",
      trade: "Plumber · Leak repair",
      price: "$99",
      priceNote: "diagnostic",
      rating: "4.9",
      reviews: "182",
      availability: "Today 3–5 PM",
      license: "Licensed",
      badges: ["Best match", "Same-day", "Leak specialist"],
    },
    {
      id: 2,
      initials: "JP",
      name: "J&P Plumbers",
      trade: "Plumber · Drain and pipe repair",
      price: "Free",
      priceNote: "if booked",
      rating: "4.8",
      reviews: "96",
      availability: "Tomorrow AM",
      license: "Licensed",
      badges: ["Free diagnostic", "Good value"],
    },
    {
      id: 3,
      initials: "AE",
      name: "AquaEmergency",
      trade: "Emergency plumbing",
      price: "$180",
      priceNote: "diagnostic",
      rating: "4.7",
      reviews: "244",
      availability: "Tonight",
      license: "Emergency service",
      badges: ["Fastest option", "24/7"],
    },
  ];
}

export default {
  name: "MatchedProsPage",

  components: {
    HomewiseNavbar,
  },

  data() {
    const category = localStorage.getItem("homewiseCategory") || "Plumbing";

    return {
      selectedPro: null,
      category,
      location: localStorage.getItem("homewiseLocation") || "Bellevue, WA",
      diagnosis: {
        likelyIssue: "Possible repair issue",
        cost: localStorage.getItem("homewiseEstimatedCost") || "$150–$400",
        urgency: localStorage.getItem("homewiseUrgency") || "Medium-high",
      },
      pros: createPros(category),
    };
  },

  methods: {
    selectPro(pro) {
      this.selectedPro = pro;
      localStorage.setItem("homewiseSelectedPro", JSON.stringify(pro));
    },

    continueNext() {
      if (!this.selectedPro) {
        alert("Please choose a pro first.");
        return;
      }

      this.$router.push("/app/booking");
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
  width: 66%;
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

.panelTop {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.cardLabel {
  margin: 0 0 8px;
  color: #7b827f;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
}

.panelTop h2,
.summaryCard h2 {
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.6px;
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

.filterBar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 22px;
}

.filterBar button {
  border: none;
  background: rgba(240, 244, 242, 0.85);
  color: #3e4743;
  border-radius: 999px;
  padding: 12px 16px;
  font-weight: 900;
  cursor: pointer;
}

.filterBar .activeFilter {
  background: #111;
  color: white;
}

.prosList {
  display: grid;
  gap: 16px;
}

.proCard {
  width: 100%;
  border: 1px solid rgba(228, 232, 230, 0.85);
  background: rgba(249, 251, 250, 0.78);
  border-radius: 26px;
  padding: 20px;
  display: grid;
  grid-template-columns: 68px minmax(0, 1fr);
  gap: 18px;
  text-align: left;
  cursor: pointer;
  transition: 0.18s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.proCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.07);
}

.proCard.selected {
  border-color: #16a373;
  background: rgba(234, 249, 242, 0.92);
  box-shadow: 0 18px 45px rgba(22, 163, 115, 0.16);
}

.avatar {
  width: 62px;
  height: 62px;
  background: #1769aa;
  color: white;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
}

.proTop {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 14px;
}

.proTitleRow {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.proTitleRow h2 {
  margin: 0;
  font-size: 24px;
}

.bestBadge {
  background: rgba(229, 247, 239, 0.9);
  color: #067a53;
  border-radius: 999px;
  padding: 7px 10px;
  font-weight: 900;
  font-size: 12px;
}

.trade {
  color: #5f6864;
  margin: 6px 0 0;
}

.priceBox {
  text-align: right;
  min-width: 92px;
}

.priceBox strong {
  display: block;
  font-size: 24px;
}

.priceBox span {
  color: #6c7470;
  font-size: 13px;
}

.metaGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.metaGrid div {
  background: rgba(255, 255, 255, 0.82);
  border-radius: 16px;
  padding: 12px;
}

.metaGrid span {
  display: block;
  color: #6c7470;
  font-size: 12px;
  margin-bottom: 5px;
}

.metaGrid strong {
  font-size: 14px;
}

.badgeRow {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.badgeRow span {
  background: rgba(229, 247, 239, 0.9);
  color: #067a53;
  border-radius: 999px;
  padding: 7px 10px;
  font-size: 13px;
  font-weight: 900;
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

.primaryButton:disabled {
  background: #cfd5d2;
  box-shadow: none;
  cursor: not-allowed;
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

.selectedBox {
  background: #111;
  color: white;
  border-radius: 18px;
  padding: 18px;
  margin-top: 16px;
}

.selectedBox p {
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
  .contentGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 800px) {
  .metaGrid {
    grid-template-columns: 1fr 1fr;
  }

  .proTop {
    flex-direction: column;
  }

  .priceBox {
    text-align: left;
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

  .proCard {
    grid-template-columns: 1fr;
  }

  .metaGrid {
    grid-template-columns: 1fr;
  }

  .panelTop,
  .summaryBox {
    flex-direction: column;
  }
}
</style>