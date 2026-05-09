<template>
  <div class="statCard">
    <div class="iconBox">{{ icon }}</div>

    <div>
      <p>{{ label }}</p>
      <h2>{{ value }}</h2>
      <span v-if="note">{{ note }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatCard",

  props: {
    icon: String,
    label: String,
    value: String,
    note: String,
  },
};
</script>

<style scoped>
.statCard {
  background: white;
  border: 1px solid #e7e9e8;
  border-radius: 24px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 126px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.04);
}

.iconBox {
  width: 52px;
  height: 52px;
  background: #e4f7ef;
  color: #067a53;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

p {
  margin: 0 0 8px;
  color: #747b78;
  font-weight: 800;
  font-size: 13px;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  font-size: 28px;
  letter-spacing: -0.8px;
}

span {
  color: #6b726f;
  display: block;
  margin-top: 6px;
  font-size: 14px;
}
</style>