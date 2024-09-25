import localFont from "next/font/local";

const trap300 = localFont({
  src: "./fonts/Trap-Light.otf",
  style: "normal",
  variable: "--trap",
  weight: "300",
});
const trap400 = localFont({
  src: "./fonts/Trap-Regular.otf",
  style: "normal",
  variable: "--trap",
  weight: "400",
});
const trap500 = localFont({
  src: "./fonts/Trap-Medium.otf",
  style: "normal",
  variable: "--trap",
  weight: "500",
});
const trap600 = localFont({
  src: "./fonts/Trap-SemiBold.otf",
  style: "normal",
  variable: "--trap",
  weight: "600",
});
const trap700 = localFont({
  src: "./fonts/Trap-Bold.otf",
  style: "normal",
  variable: "--trap",
  weight: "700",
});
const trap800 = localFont({
  src: "./fonts/Trap-ExtraBold.otf",
  style: "normal",
  variable: "--trap",
  weight: "800",
});



const Inter = localFont({
  src: "./fonts/Inter-VariableFont_opsz,wght.ttf",
  style: "",
  variable: "--inter",
});



const Lato = localFont({
  src: "./fonts/Assistant-VariableFont_wght.ttf",
  style: "",
  variable: "--inter",
});

export { trap300, trap400, trap500, trap600, trap700, trap800, Inter, Lato };
