<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Services', to: '/app' },
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
            <p class="eyebrow">Step 1 of 6</p>
            <h1>What problem are you having at home?</h1>
            <p class="subtitle">
              Choose the repair category that best matches your issue. Homewise will use this to create a better repair summary and match you with the right professional.
            </p>
          </div>

          <div class="progressCard">
            <div class="progressTop">
              <span>Repair request</span>
              <strong>16%</strong>
            </div>

            <div class="progressTrack">
              <div class="progressFill"></div>
            </div>

            <p>Next: describe the issue and upload a photo.</p>
          </div>
        </div>

        <div class="contentGrid">
          <section class="mainPanel">
            <div class="panelTop">
              <div>
                <p class="cardLabel">Choose category</p>
                <h2>Select the closest match</h2>
              </div>

              <span class="softBadge">{{ selectedCategory || "Not selected" }}</span>
            </div>

            <div class="categoryGrid">
              <button
                v-for="category in categories"
                :key="category.name"
                class="categoryCard"
                :class="{ active: selectedCategory === category.name }"
                @click="selectedCategory = category.name"
              >
                <div class="categoryIcon">{{ category.icon }}</div>

                <div>
                  <strong>{{ category.name }}</strong>
                  <p>{{ category.description }}</p>
                </div>
              </button>
            </div>

            <div class="actionRow">
              <button class="primaryButton" @click="continueNext">
                Continue
              </button>

              <button class="secondaryButton" @click="selectedCategory = 'Other'">
                I am not sure
              </button>
            </div>
          </section>

          <aside class="sidePanel">
            <div class="summaryCard">
              <p class="cardLabel">Your request</p>
              <h2>{{ selectedCategory || "Choose a category" }}</h2>

              <div class="summaryBox">
                <span>Current step</span>
                <strong>Issue type</strong>
              </div>

              <div class="summaryBox">
                <span>Next step</span>
                <strong>Description + photo</strong>
              </div>

              <div class="miniTimeline">
                <div class="timelineItem active">
                  <span>1</span>
                  Choose issue
                </div>

                <div class="timelineItem">
                  <span>2</span>
                  Describe problem
                </div>

                <div class="timelineItem">
                  <span>3</span>
                  AI summary
                </div>

                <div class="timelineItem">
                  <span>4</span>
                  Match pro
                </div>

                <div class="timelineItem">
                  <span>5</span>
                  Book repair
                </div>
              </div>
            </div>

            <div class="tipCard">
              <div class="tipIcon">💡</div>
              <div>
                <strong>Not sure what category?</strong>
                <p>
                  Pick the closest one. Homewise can still recommend the right type of professional later.
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
  name: "AppHomePage",

  components: {
    HomewiseNavbar,
  },

  data() {
    return {
      selectedCategory: localStorage.getItem("homewiseCategory") || "",
      categories: [
        {
          name: "Plumbing",
          icon: "🔧",
          description: "Leaks, drains, toilets, sinks, pipes",
        },
        {
          name: "Electrical",
          icon: "⚡",
          description: "Outlets, lights, breakers, wiring",
        },
        {
          name: "HVAC",
          icon: "❄️",
          description: "Heating, cooling, airflow, thermostat",
        },
        {
          name: "Appliance",
          icon: "🏠",
          description: "Fridge, washer, dryer, dishwasher",
        },
        {
          name: "Handyman",
          icon: "🔨",
          description: "Small fixes, installs, general repairs",
        },
        {
          name: "Roof",
          icon: "🏚️",
          description: "Roof leaks, shingles, gutters, exterior",
        },
        {
          name: "Other",
          icon: "📋",
          description: "Something else or not sure yet",
        },
      ],
    };
  },

  methods: {
    continueNext() {
      if (!this.selectedCategory) {
        alert("Please choose a repair category first.");
        return;
      }

      localStorage.setItem("homewiseCategory", this.selectedCategory);
      this.$router.push("/app/describe");
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
  max-width: 760px;
  color: #56615c;
  font-size: 20px;
  line-height: 1.55;
  margin: 0;
}

.progressCard,
.mainPanel,
.sidePanel .summaryCard,
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
  width: 16%;
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
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
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
}

.categoryGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.categoryCard {
  background: rgba(248, 250, 249, 0.78);
  border: 1px solid rgba(228, 232, 230, 0.85);
  border-radius: 22px;
  padding: 18px;
  min-height: 156px;
  text-align: left;
  cursor: pointer;
  transition: 0.18s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.categoryCard:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.06);
}

.categoryCard.active {
  background: rgba(229, 247, 239, 0.9);
  border-color: #16a373;
  box-shadow: 0 18px 45px rgba(22, 163, 115, 0.16);
}

.categoryIcon {
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 16px;
}

.categoryCard strong {
  display: block;
  font-size: 18px;
  margin-bottom: 8px;
}

.categoryCard p {
  color: #5f6864;
  line-height: 1.4;
  margin: 0;
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
  padding: 16px 24px;
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
.tipCard {
  padding: 22px;
}

.summaryBox {
  background: rgba(246, 248, 247, 0.85);
  border-radius: 16px;
  padding: 16px;
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.summaryBox span {
  color: #6c7470;
}

.miniTimeline {
  margin-top: 22px;
  display: grid;
  gap: 12px;
}

.timelineItem {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #6c7470;
  font-weight: 800;
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

.timelineItem.active {
  color: #067a53;
}

.timelineItem.active span {
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

  .categoryGrid {
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

  .categoryGrid {
    grid-template-columns: 1fr;
  }

  .panelTop,
  .summaryBox {
    flex-direction: column;
  }
}
</style>