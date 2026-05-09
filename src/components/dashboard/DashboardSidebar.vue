<template>
  <aside class="sidebar">
    <div class="brand">
      <div class="brandMark">H</div>
      <div>
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>
      </div>
    </div>

    <nav class="navList">
      <button
        v-for="item in items"
        :key="item.label"
        :class="{ active: item.active }"
        @click="handleClick(item)"
      >
        <span>{{ item.icon }}</span>
        {{ item.label }}
      </button>
    </nav>

    <div class="sidebarBottom">
      <button class="bottomButton" @click="$router.push('/')">
        ← Back to website
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: "DashboardSidebar",

  props: {
    title: {
      type: String,
      default: "Homewise",
    },
    subtitle: {
      type: String,
      default: "Home repair platform",
    },
    items: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleClick(item) {
      if (item.to) {
        this.$router.push(item.to);
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 270px;
  min-height: 100vh;
  background: #ffffff;
  border-right: 1px solid #e9eceb;
  padding: 28px 22px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 42px;
}

.brandMark {
  width: 46px;
  height: 46px;
  background: #16a373;
  color: white;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 24px;
}

.brand h2 {
  margin: 0;
  font-size: 22px;
}

.brand p {
  margin: 3px 0 0;
  color: #7a817d;
  font-size: 13px;
}

.navList {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.navList button {
  border: none;
  background: transparent;
  color: #5b625f;
  font-size: 16px;
  font-weight: 700;
  padding: 14px 14px;
  border-radius: 14px;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
}

.navList button:hover {
  background: #f4f7f6;
}

.navList button.active {
  background: #e4f7ef;
  color: #067a53;
}

.navList span {
  font-size: 19px;
}

.sidebarBottom {
  margin-top: auto;
}

.bottomButton {
  width: 100%;
  border: none;
  background: #f3f3f3;
  color: #111;
  border-radius: 14px;
  padding: 14px;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 950px) {
  .sidebar {
    position: static;
    width: auto;
    min-height: auto;
    border-right: none;
    border-bottom: 1px solid #e9eceb;
  }

  .navList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>