<template>
  <main class="shell">
    <DashboardSidebar
      :title="sidebarTitle"
      :subtitle="sidebarSubtitle"
      :items="items"
    />

    <section class="content">
      <slot />
    </section>
  </main>
</template>

<script>
import DashboardSidebar from "./DashboardSidebar.vue";

export default {
  name: "DashboardShell",

  components: {
    DashboardSidebar,
  },

  props: {
    sidebarTitle: String,
    sidebarSubtitle: String,
    items: Array,
  },
};
</script>

<style scoped>
.shell {
  min-height: 100vh;
  background: #f6f8f7;
  color: #111;
  font-family: Arial, Helvetica, sans-serif;
}

.content {
  margin-left: 270px;
  padding: 32px;
}

@media (max-width: 950px) {
  .content {
    margin-left: 0;
    padding: 24px;
  }
}
</style>