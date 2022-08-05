import { ref } from "vue";
import { mediaListener } from ".";

type ThemeIs = "light" | "dark";

interface Theme {
  current: ThemeIs;
  is: ThemeIs;
  dark: boolean;
  light: boolean;
}

const addHTMLClass = (newVal: ThemeIs, old: ThemeIs) => {
  const html = document.documentElement;

  html.classList.add(old);

  html.classList.replace(old, newVal);
};

const theme = ref<Theme>({
  current: "dark",
  get is() {
    return this.current;
  },
  set is(val: ThemeIs) {
    if (/^(?:light|dark)$/.test(val)) {
      this.current = val;

      addHTMLClass(val, val === "dark" ? "light" : "dark");

      localStorage.setItem("theme", val);
    }
  },
  get dark() {
    return this.is === "dark";
  },
  set dark(val: boolean) {
    if (typeof val == "boolean") {
      this.is = val ? "dark" : "light";
    }
  },
  get light() {
    return this.is === "light";
  },
  set light(val: boolean) {
    if (typeof val == "boolean") {
      this.is = val ? "light" : "dark";
    }
  },
});

let themeInstalled = false;
// start the theme on beforeMount hook in App.vue
export function installTheme() {
  if (themeInstalled) return;

  const currentTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const callback = (isDark: boolean) => {
    if (isDark) {
      theme.value.is = "dark";
    } else {
      theme.value.is = "light";
    }
  };

  const storedTheme = localStorage.getItem("theme");

  if (/^(?:light|dark)$/.test(storedTheme || "")) {
    callback(storedTheme === "dark");
  } else {
    callback(currentTheme.matches);
  }

  mediaListener({
    media: currentTheme,
    callback: (e) => {
      callback(e.matches);
    },
  });

  themeInstalled = true;
}

export default theme;
