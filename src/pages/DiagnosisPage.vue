<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Back to details', to: '/app/describe' },
        { label: 'Dashboard', to: '/app/dashboard' },
        { label: 'For pros', to: '/pro' }
      ]"
      :right-links="[
        { label: 'Help', to: '#' },
        { label: 'Log in', to: '/sign-in' }
      ]"
      :primary-action="{ label: 'See pros', to: '/app/pros' }"
    />

    <section class="onboarding">
      <div class="wideContainer">
        <div class="stepHeader">
          <div>
            <button class="backButton" @click="$router.push('/app/describe')">
              ← Back
            </button>

            <p class="eyebrow">Step 3 of 6</p>

            <h1>Your repair summary is ready.</h1>

            <p class="subtitle">
              Based on your issue details, Homewise created an AI-style repair summary
              with likely problem, urgency, cost range, safety notes, and recommended pro type.
            </p>
          </div>

          <div class="progressCard">
            <div class="progressTop">
              <span>Repair request</span>
              <strong>50%</strong>
            </div>

            <div class="progressTrack">
              <div class="progressFill"></div>
            </div>

            <p>Next: compare matched local professionals.</p>
          </div>
        </div>

        <div class="contentGrid">
          <section class="mainPanel">
            <div class="analysisBanner">
              <div class="sparkIcon">✨</div>

              <div>
                <p class="cardLabel">AI-style analysis complete</p>
                <h2>{{ diagnosis.likelyIssue }}</h2>
                <p>{{ diagnosis.summary }}</p>
              </div>
            </div>

            <div v-if="imagePreview" class="photoCard">
              <div class="fieldHeader">
                <div>
                  <p class="cardLabel">Uploaded photo</p>
                  <h2>Issue image</h2>
                </div>

                <span class="softBadge">Photo added</span>
              </div>

              <img :src="imagePreview" alt="Uploaded issue" />
            </div>

            <div class="diagnosisGrid">
              <article class="diagnosisCard largeCard">
                <div class="cardIcon">🔍</div>
                <p class="cardLabel">Likely issue</p>
                <h2>{{ diagnosis.likelyIssue }}</h2>
                <p>{{ diagnosis.summary }}</p>
              </article>

              <article class="diagnosisCard">
                <div class="cardIcon warning">⚠️</div>
                <p class="cardLabel">Urgency</p>
                <h2 class="orange">{{ diagnosis.urgency }}</h2>
                <p>{{ diagnosis.urgencyNote }}</p>
              </article>

              <article class="diagnosisCard">
                <div class="cardIcon">💵</div>
                <p class="cardLabel">Estimated cost</p>
                <h2 class="green">{{ diagnosis.cost }}</h2>
                <p>AI-style estimate. Final price depends on inspection and parts.</p>
              </article>

              <article class="diagnosisCard">
                <div class="cardIcon">👷</div>
                <p class="cardLabel">Recommended pro</p>
                <h2>{{ diagnosis.proType }}</h2>
                <p>{{ diagnosis.proNote }}</p>
              </article>

              <article class="diagnosisCard">
                <div class="cardIcon warning">🛡️</div>
                <p class="cardLabel">Safety note</p>
                <h2>{{ diagnosis.safetyTitle }}</h2>
                <p>{{ diagnosis.safetyNote }}</p>
              </article>

              <article class="diagnosisCard">
                <div class="cardIcon">✅</div>
                <p class="cardLabel">What to do now</p>
                <h2>{{ diagnosis.actionTitle }}</h2>
                <p>{{ diagnosis.actionNote }}</p>
              </article>
            </div>

            <div class="actionRow">
              <button class="primaryButton" @click="$router.push('/app/pros')">
                See matched pros
              </button>

              <button class="secondaryButton" @click="$router.push('/app/describe')">
                Edit issue details
              </button>
            </div>
          </section>

          <aside class="sidePanel">
            <div class="summaryCard">
              <p class="cardLabel">Your request</p>
              <h2>{{ category }}</h2>

              <div class="summaryBox">
                <span>Location</span>
                <strong>{{ location }}</strong>
              </div>

              <div class="summaryBox">
                <span>Urgency selected</span>
                <strong>{{ urgency }}</strong>
              </div>

              <div class="summaryBox">
                <span>Preferred timing</span>
                <strong>{{ preferredTiming }}</strong>
              </div>

              <div class="descriptionBox">
                <strong>Description</strong>
                <p>{{ description }}</p>
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

              <div class="timelineItem active">
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

            <div class="tipCard">
              <div class="tipIcon">💡</div>
              <div>
                <strong>This is not a final diagnosis.</strong>
                <p>
                  A professional should confirm the issue in person before repair work begins.
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

function createDiagnosis(category, description) {
  const text = description.toLowerCase();

  if (category === "Plumbing") {
    return {
      likelyIssue: text.includes("sink")
        ? "Possible under-sink leak"
        : "Possible plumbing leak or drain issue",
      summary:
        "The issue may be coming from a loose fitting, P-trap, supply line, drain connection, or pipe leak.",
      urgency:
        text.includes("flood") || text.includes("burst") ? "Emergency" : "Medium-high",
      urgencyNote:
        "Because water damage can spread quickly, same-day or next-day service is recommended.",
      cost: "$150–$400",
      proType: "Plumber",
      proNote:
        "A plumber is the best match for leak detection, drain repairs, and supply line issues.",
      safetyTitle: "Watch for water near outlets",
      safetyNote:
        "If water is near electrical outlets or appliances, stop using the area and call for help sooner.",
      actionTitle: "Reduce water damage",
      actionNote:
        "Place a bucket under the leak, avoid using the fixture, and turn off nearby water valves if needed.",
    };
  }

  if (category === "Electrical") {
    return {
      likelyIssue: "Possible outlet, breaker, or wiring issue",
      summary:
        "The problem may involve a tripped breaker, failed outlet, overloaded circuit, or loose wiring connection.",
      urgency:
        text.includes("spark") || text.includes("burn") || text.includes("smell")
          ? "Emergency"
          : "Medium",
      urgencyNote:
        "Electrical issues should be checked quickly, especially if there is heat, smell, sparks, or power loss.",
      cost: "$120–$500",
      proType: "Electrician",
      proNote:
        "A licensed electrician is the safest match for outlet, breaker, and wiring problems.",
      safetyTitle: "Avoid using the outlet",
      safetyNote:
        "If you smell burning, see sparks, or the outlet feels hot, stop using it immediately.",
      actionTitle: "Turn off unsafe power",
      actionNote:
        "Avoid using the affected outlet or switch. Turn off the breaker if there is heat, smoke, or sparks.",
    };
  }

  if (category === "HVAC") {
    return {
      likelyIssue: "Possible heating or cooling system issue",
      summary:
        "The issue may involve airflow, thermostat settings, dirty filters, refrigerant problems, or a failing unit component.",
      urgency:
        text.includes("no heat") || text.includes("no ac") || text.includes("not working")
          ? "High"
          : "Medium",
      urgencyNote:
        "If your home has no heat or cooling during extreme weather, same-day service is recommended.",
      cost: "$150–$800",
      proType: "HVAC technician",
      proNote:
        "An HVAC technician can inspect the unit, thermostat, airflow, and system components.",
      safetyTitle: "Check airflow and smells",
      safetyNote:
        "If you smell gas or burning, turn off the system and call for emergency help.",
      actionTitle: "Check the basics",
      actionNote:
        "Check the thermostat, filter, and breaker, but avoid opening the unit unless you know what you are doing.",
    };
  }

  if (category === "Appliance") {
    return {
      likelyIssue: "Possible appliance malfunction",
      summary:
        "The issue may involve a worn part, clogged drain, failed motor, loose connection, or sensor problem.",
      urgency: "Medium",
      urgencyNote:
        "Most appliance issues are not emergencies, but they can get worse if water, heat, or electrical parts are involved.",
      cost: "$100–$450",
      proType: "Appliance repair technician",
      proNote:
        "An appliance technician can diagnose the specific model and replace failed parts.",
      safetyTitle: "Unplug if unsafe",
      safetyNote:
        "If the appliance smells burnt, leaks water, or makes loud unusual noises, stop using it.",
      actionTitle: "Stop using it if worsening",
      actionNote:
        "Avoid continuing to run the appliance if it is leaking, overheating, smoking, or making loud noises.",
    };
  }

  if (category === "Roof") {
    return {
      likelyIssue: "Possible roof leak or exterior water issue",
      summary:
        "The issue may involve damaged shingles, flashing, gutters, vents, or water entering through a weak point.",
      urgency: text.includes("leak") ? "High" : "Medium",
      urgencyNote:
        "Roof leaks should be handled quickly because water damage can spread into ceilings and walls.",
      cost: "$250–$1,200",
      proType: "Roofer",
      proNote:
        "A roofer can inspect the leak source, flashing, shingles, and water entry points.",
      safetyTitle: "Avoid climbing on the roof",
      safetyNote:
        "Do not climb onto a wet or steep roof. Wait for a professional inspection.",
      actionTitle: "Protect the interior",
      actionNote:
        "Move valuables away from the leak and place a bucket or towel under active dripping.",
    };
  }

  return {
    likelyIssue: "General home repair issue",
    summary:
      "Homewise found a repair issue that may need a handyman or specialist depending on the details.",
    urgency: "Medium",
    urgencyNote:
      "A professional should review the issue and decide the best next step.",
    cost: "$100–$500",
    proType: "Handyman or specialist",
    proNote:
      "A general home repair professional can inspect the issue and recommend next steps.",
    safetyTitle: "Use caution",
    safetyNote:
      "If there is water, electricity, gas, or structural damage involved, treat the issue as more urgent.",
    actionTitle: "Document the issue",
    actionNote:
      "Take clear photos, avoid making the issue worse, and prepare access instructions for the pro.",
  };
}

export default {
  name: "DiagnosisPage",

  components: {
    HomewiseNavbar,
  },

  data() {
    const category = localStorage.getItem("homewiseCategory") || "Plumbing";
    const description =
      localStorage.getItem("homewiseDescription") ||
      "My kitchen sink is leaking under the cabinet and water is pooling on the floor.";

    return {
      category,
      description,
      urgency: localStorage.getItem("homewiseUrgency") || "Today",
      preferredTiming:
        localStorage.getItem("homewisePreferredTiming") || "Today or tomorrow",
      location: localStorage.getItem("homewiseLocation") || "Bellevue, WA",
      imagePreview: localStorage.getItem("homewiseImagePreview") || "",
      diagnosis: createDiagnosis(category, description),
    };
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
  max-width: 880px;
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
  width: 50%;
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

.analysisBanner {
  background:
    radial-gradient(circle at top right, rgba(22, 163, 115, 0.14), transparent 40%),
    #111;
  color: white;
  border-radius: 28px;
  padding: 28px;
  display: flex;
  gap: 18px;
  margin-bottom: 20px;
}

.sparkIcon {
  width: 58px;
  height: 58px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.analysisBanner .cardLabel {
  color: #97ead0;
}

.analysisBanner h2 {
  margin: 0 0 8px;
  font-size: 32px;
}

.analysisBanner p {
  color: #d8d8d8;
  line-height: 1.5;
  margin-bottom: 0;
}

.cardLabel {
  margin: 0 0 8px;
  color: #7b827f;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
}

.photoCard {
  background: rgba(249, 251, 250, 0.78);
  border: 1px solid rgba(237, 240, 239, 0.9);
  border-radius: 24px;
  padding: 22px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.fieldHeader {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
}

.fieldHeader h2 {
  margin: 0;
  font-size: 24px;
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

.photoCard img {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 20px;
}

.diagnosisGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.diagnosisCard {
  background: rgba(249, 251, 250, 0.78);
  border: 1px solid rgba(237, 240, 239, 0.9);
  border-radius: 24px;
  padding: 22px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.largeCard {
  grid-column: span 3;
}

.cardIcon {
  width: 48px;
  height: 48px;
  background: #e5f7ef;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
}

.cardIcon.warning {
  background: #fff3df;
}

.diagnosisCard h2 {
  margin: 0 0 10px;
  font-size: 24px;
  letter-spacing: -0.4px;
}

.diagnosisCard p {
  color: #5f6864;
  line-height: 1.5;
  margin: 0;
}

.orange {
  color: #c76c00;
}

.green {
  color: #067a53;
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

.summaryCard h2 {
  margin: 0;
  font-size: 26px;
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

  .diagnosisGrid {
    grid-template-columns: repeat(2, 1fr);
  }

  .largeCard {
    grid-column: span 2;
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

  .diagnosisGrid {
    grid-template-columns: 1fr;
  }

  .largeCard {
    grid-column: span 1;
  }

  .analysisBanner,
  .fieldHeader,
  .summaryBox {
    flex-direction: column;
  }
}
</style>