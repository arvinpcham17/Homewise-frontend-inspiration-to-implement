<template>
  <main class="page">
    <HomewiseNavbar
      :left-links="[
        { label: 'Back to categories', to: '/app' },
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
            <button class="backButton" @click="$router.push('/app')">← Back</button>

            <p class="eyebrow">Step 2 of 6</p>
            <h1>Tell us what is happening.</h1>
            <p class="subtitle">
              Add a clear description, upload a photo, and confirm the location. This helps Homewise create a stronger repair summary.
            </p>
          </div>

          <div class="progressCard">
            <div class="progressTop">
              <span>Repair request</span>
              <strong>32%</strong>
            </div>

            <div class="progressTrack">
              <div class="progressFill"></div>
            </div>

            <p>Next: Homewise creates your AI-style repair summary.</p>
          </div>
        </div>

        <div class="contentGrid">
          <section class="mainPanel">
            <div class="selectedCategory">
              <span>Selected category</span>
              <strong>{{ category }}</strong>
            </div>

            <div class="fieldBlock">
              <div class="fieldHeader">
                <div>
                  <p class="cardLabel">Issue details</p>
                  <h2>Describe the problem</h2>
                </div>

                <span class="softBadge">{{ description ? "Added" : "Required" }}</span>
              </div>

              <textarea
                v-model="description"
                placeholder="Example: My kitchen sink is leaking under the cabinet and water is pooling on the floor..."
              ></textarea>
            </div>

            <div class="fieldBlock">
              <div class="fieldHeader">
                <div>
                  <p class="cardLabel">Photo</p>
                  <h2>Add a picture</h2>
                </div>

                <span class="softBadge">{{ imagePreview ? "Photo added" : "Optional" }}</span>
              </div>

              <label class="uploadBox">
                <input type="file" accept="image/*" @change="handleImageUpload" />

                <div v-if="!imagePreview" class="uploadEmpty">
                  <div class="uploadIcon">📷</div>
                  <strong>Upload a photo of the issue</strong>
                  <p>A clear photo makes the repair summary feel much more useful.</p>
                </div>

                <div v-else class="previewWrap">
                  <img :src="imagePreview" alt="Uploaded repair issue" />
                  <p>Photo added. Click here to replace it.</p>
                </div>
              </label>
            </div>

            <div class="twoColumn">
              <div class="fieldBlock compact">
                <p class="cardLabel">Location</p>
                <h2>Home location</h2>

                <input
                  v-model="location"
                  class="textInput"
                  placeholder="Example: Bellevue, WA"
                />
              </div>

              <div class="fieldBlock compact">
                <p class="cardLabel">Urgency</p>
                <h2>How soon?</h2>

                <div class="pillGroup">
                  <button
                    v-for="option in urgencyOptions"
                    :key="option"
                    :class="{ active: urgency === option }"
                    @click="urgency = option"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>

            <div class="fieldBlock">
              <p class="cardLabel">Preferred timing</p>
              <h2>When would you like help?</h2>

              <div class="pillGroup">
                <button
                  v-for="time in timingOptions"
                  :key="time"
                  :class="{ active: preferredTiming === time }"
                  @click="preferredTiming = time"
                >
                  {{ time }}
                </button>
              </div>
            </div>

            <button class="primaryButton" @click="continueNext">
              Analyze my issue
            </button>
          </section>

          <aside class="sidePanel">
            <div class="summaryCard">
              <p class="cardLabel">Repair request</p>
              <h2>{{ category }}</h2>

              <div class="summaryBox">
                <span>Description</span>
                <strong>{{ description ? "Added" : "Missing" }}</strong>
              </div>

              <div class="summaryBox">
                <span>Photo</span>
                <strong>{{ imagePreview ? "Added" : "Not added" }}</strong>
              </div>

              <div class="summaryBox">
                <span>Location</span>
                <strong>{{ location || "Missing" }}</strong>
              </div>

              <div class="summaryBox">
                <span>Urgency</span>
                <strong>{{ urgency }}</strong>
              </div>

              <div class="summaryBox">
                <span>Timing</span>
                <strong>{{ preferredTiming }}</strong>
              </div>
            </div>

            <div class="tipCard">
              <div class="tipIcon">✨</div>
              <div>
                <strong>Better details create better matches.</strong>
                <p>
                  Mention what changed, when it started, and whether it is getting worse.
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
  name: "DescribeIssuePage",

  components: {
    HomewiseNavbar,
  },

  data() {
    return {
      category: localStorage.getItem("homewiseCategory") || "Other",
      description: localStorage.getItem("homewiseDescription") || "",
      location: localStorage.getItem("homewiseLocation") || "",
      imagePreview: localStorage.getItem("homewiseImagePreview") || "",
      urgency: localStorage.getItem("homewiseUrgency") || "Today",
      preferredTiming:
        localStorage.getItem("homewisePreferredTiming") || "Today or tomorrow",
      urgencyOptions: ["Not urgent", "Today", "Emergency"],
      timingOptions: ["Today", "Today or tomorrow", "This week", "Flexible"],
    };
  },

  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
        localStorage.setItem("homewiseImagePreview", this.imagePreview);
      };

      reader.readAsDataURL(file);
    },

    continueNext() {
      if (!this.description.trim()) {
        alert("Please describe the issue first.");
        return;
      }

      if (!this.location.trim()) {
        alert("Please add the home location.");
        return;
      }

      localStorage.setItem("homewiseDescription", this.description);
      localStorage.setItem("homewiseUrgency", this.urgency);
      localStorage.setItem("homewisePreferredTiming", this.preferredTiming);
      localStorage.setItem("homewiseLocation", this.location);

      this.$router.push("/app/diagnosis");
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
  max-width: 760px;
  color: #56615c;
  font-size: 20px;
  line-height: 1.55;
  margin: 0;
}

.progressCard,
.mainPanel,
.summaryCard,
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
  width: 32%;
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

.selectedCategory {
  background: rgba(229, 247, 239, 0.9);
  border-radius: 20px;
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  color: #067a53;
  margin-bottom: 22px;
}

.selectedCategory span {
  font-weight: 800;
}

.fieldBlock {
  background: rgba(249, 251, 250, 0.78);
  border: 1px solid rgba(237, 240, 239, 0.9);
  border-radius: 24px;
  padding: 22px;
  margin-bottom: 18px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.fieldBlock.compact {
  margin-bottom: 0;
}

.fieldHeader {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 16px;
}

.cardLabel {
  margin: 0 0 8px;
  color: #7b827f;
  font-size: 13px;
  font-weight: 900;
  text-transform: uppercase;
}

.fieldHeader h2,
.fieldBlock h2,
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

textarea,
.textInput {
  width: 100%;
  border: 1px solid #e1e6e3;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 18px;
  padding: 16px;
  font-size: 17px;
  box-sizing: border-box;
  outline: none;
}

textarea {
  min-height: 170px;
  resize: vertical;
  font-family: Arial, Helvetica, sans-serif;
}

.textInput {
  height: 58px;
}

textarea:focus,
.textInput:focus {
  border-color: #16a373;
}

.uploadBox {
  display: block;
  border: 2px dashed #d4dcd8;
  background: rgba(255, 255, 255, 0.78);
  border-radius: 22px;
  padding: 28px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.uploadBox input {
  display: none;
}

.uploadEmpty {
  text-align: center;
}

.uploadIcon {
  width: 58px;
  height: 58px;
  background: #e5f7ef;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
  font-size: 28px;
}

.uploadBox p {
  color: #5f6864;
  margin-bottom: 0;
}

.previewWrap img {
  width: 100%;
  max-height: 340px;
  object-fit: cover;
  border-radius: 18px;
  margin-bottom: 12px;
}

.previewWrap p {
  color: #067a53;
  font-weight: 900;
}

.twoColumn {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.pillGroup {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pillGroup button {
  border: none;
  background: rgba(255, 255, 255, 0.86);
  border-radius: 999px;
  padding: 12px 16px;
  font-weight: 900;
  cursor: pointer;
  color: #3e4743;
}

.pillGroup button.active {
  background: #111;
  color: white;
}

.primaryButton {
  border: none;
  background: #111;
  color: white;
  border-radius: 15px;
  padding: 17px 26px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 14px 32px rgba(17, 17, 17, 0.14);
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
  padding: 15px;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
}

.summaryBox span {
  color: #6c7470;
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
}

@media (max-width: 700px) {
  .wideContainer {
    width: min(100% - 32px, 1440px);
  }

  h1 {
    font-size: 42px;
    letter-spacing: -1.5px;
  }

  .fieldHeader,
  .selectedCategory,
  .summaryBox {
    flex-direction: column;
  }
}
</style>