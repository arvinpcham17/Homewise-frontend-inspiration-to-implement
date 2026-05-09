<template>
  <header class="topbar">
    <div>
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
    </div>

    <div class="topActions">
      <button v-if="secondaryLabel" class="secondaryButton" @click="$emit('secondary')">
        {{ secondaryLabel }}
      </button>

      <button class="primaryButton" @click="$emit('primary')">
        {{ primaryLabel }}
      </button>

      <div class="userPill">
        <div class="avatar">{{ initials }}</div>
        <div>
          <strong>{{ userName }}</strong>
          <span>{{ userRole }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "DashboardTopbar",

  props: {
    title: String,
    subtitle: String,
    primaryLabel: {
      type: String,
      default: "New request",
    },
    secondaryLabel: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      default: "Homewise User",
    },
    userRole: {
      type: String,
      default: "Customer",
    },
    initials: {
      type: String,
      default: "HU",
    },
  },

  emits: ["primary", "secondary"],
};
</script>

<style scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 34px;
}

h1 {
  font-size: 34px;
  margin: 0 0 8px;
  letter-spacing: -0.8px;
}

p {
  color: #6b726f;
  margin: 0;
  font-size: 15px;
}

.topActions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.primaryButton,
.secondaryButton {
  border: none;
  border-radius: 999px;
  padding: 13px 18px;
  font-weight: 900;
  cursor: pointer;
  white-space: nowrap;
}

.primaryButton {
  background: #111;
  color: white;
}

.secondaryButton {
  background: #e4f7ef;
  color: #067a53;
}

.userPill {
  background: white;
  border: 1px solid #e7e9e8;
  border-radius: 999px;
  padding: 8px 14px 8px 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: #16a373;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.userPill strong {
  display: block;
  font-size: 14px;
}

.userPill span {
  display: block;
  color: #7a817d;
  font-size: 12px;
}

@media (max-width: 950px) {
  .topbar {
    flex-direction: column;
  }

  .topActions {
    flex-wrap: wrap;
  }
}
</style>