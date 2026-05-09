<template>
  <header class="navWrap">
    <div class="navInner">
      <div class="leftSide">
        <div class="logo" @click="$router.push('/')">
          Homewise
        </div>

        <nav class="mainNav">
          <a
            v-for="link in leftLinks"
            :key="link.label"
            class="navPill"
            href="#"
            @click.prevent="goTo(link)"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>

      <div class="rightSide">
        <button v-if="showLanguage" class="navPill buttonLike languageButton">
          <span>🌐</span>
          EN
        </button>

        <a
          v-for="link in rightLinks"
          :key="link.label"
          class="navPill"
          href="#"
          @click.prevent="goTo(link)"
        >
          {{ link.label }}
        </a>

        <button class="signupButton" @click="goTo(primaryAction)">
          {{ primaryAction.label }}
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HomewiseNavbar",

  props: {
    leftLinks: {
      type: Array,
      default: () => [
        { label: "Services", to: "/app" },
        { label: "For pros", to: "/pro/auth" },
        { label: "Business", to: "#" },
        { label: "About", to: "#trust" },
      ],
    },

    rightLinks: {
      type: Array,
      default: () => [
        { label: "Help", to: "#" },
        { label: "Log in", to: "/sign-in" },
      ],
    },

    primaryAction: {
      type: Object,
      default: () => ({
        label: "Sign up",
        to: "/sign-up",
      }),
    },

    showLanguage: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    goTo(link) {
      if (!link || !link.to) {
        return;
      }

      if (link.to.startsWith("#")) {
        const element = document.querySelector(link.to);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      this.$router.push(link.to);
    },
  },
};
</script>

<style scoped>
.navWrap {
  width: 100%;
  height: 86px;
  background: transparent;
  position: sticky;
  top: 0;
  z-index: 100;
}

.navInner {
  width: 100%;
  height: 100%;
  padding: 0 34px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.leftSide,
.rightSide,
.mainNav {
  display: flex;
  align-items: center;
}

.leftSide {
  gap: 28px;
}

.mainNav {
  gap: 12px;
}

.rightSide {
  gap: 12px;
}

.logo {
  color: #1f1b17;
  font-size: 34px;
  font-weight: 650;
  letter-spacing: -1.6px;
  cursor: pointer;
  line-height: 1;
  margin-right: 8px;
}

.navPill,
.buttonLike,
.signupButton {
  border-radius: 999px;
  white-space: nowrap;
  transition: all 0.18s ease;
}

.navPill {
  color: #1f1b17;
  text-decoration: none;
  font-size: 16px;
  font-weight: 850;
  line-height: 1;
  padding: 13px 18px;
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.58);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow:
    0 6px 18px rgba(31, 27, 23, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
}

.navPill:hover {
  background: rgba(255, 255, 255, 0.62);
  transform: translateY(-1px);
}

.buttonLike {
  border: none;
  cursor: pointer;
}

.languageButton {
  display: flex;
  align-items: center;
  gap: 8px;
}

.languageButton span {
  font-size: 14px;
}

.signupButton {
  background: rgba(255, 255, 255, 0.82);
  color: #111;
  border: 1px solid rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 13px 22px;
  font-size: 16px;
  font-weight: 850;
  cursor: pointer;
  box-shadow:
    0 8px 20px rgba(31, 27, 23, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.signupButton:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-1px);
}

@media (max-width: 1100px) {
  .navInner {
    padding: 0 24px;
  }

  .logo {
    font-size: 30px;
  }

  .navPill,
  .signupButton {
    font-size: 15px;
    padding: 12px 16px;
  }
}

@media (max-width: 950px) {
  .mainNav {
    display: none;
  }

  .rightSide {
    gap: 10px;
  }
}

@media (max-width: 640px) {
  .navWrap {
    height: 76px;
  }

  .navInner {
    padding: 0 16px;
  }

  .logo {
    font-size: 28px;
  }

  .rightSide a:first-of-type,
  .languageButton {
    display: none;
  }

  .navPill,
  .signupButton {
    font-size: 14px;
    padding: 11px 14px;
  }
}
</style>