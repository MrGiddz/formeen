import { Assistant, Inter, Lato } from "next/font/google";
import localFont from "next/font/local";

const inter100 = Inter({ subsets: ["latin"], weight: ["100"] });
const inter200 = Inter({ subsets: ["latin"], weight: ["200"] });
const inter300 = Inter({ subsets: ["latin"], weight: ["300"] });
const inter400 = Inter({ subsets: ["latin"], weight: ["400"] });
const inter500 = Inter({ subsets: ["latin"], weight: ["500"] });
const inter600 = Inter({ subsets: ["latin"], weight: ["600"] });
const inter700 = Inter({ subsets: ["latin"], weight: ["700"] });
const inter800 = Inter({ subsets: ["latin"], weight: ["800"] });
const inter900 = Inter({ subsets: ["latin"], weight: ["900"] });
const lato100 = Lato({ subsets: ["latin"], weight: ["100"] });
const lato300 = Lato({ subsets: ["latin"], weight: ["300"] });
const lato400 = Lato({ subsets: ["latin"], weight: ["400"] });
const lato700 = Lato({ subsets: ["latin"], weight: ["700"] });
const lato900 = Lato({ subsets: ["latin"], weight: ["900"] });

const assistant200 = Assistant({subsets: ["latin"], weight: ["200"]})
const assistant300 = Assistant({subsets: ["latin"], weight: ["300"]})
const assistant400 = Assistant({subsets: ["latin"], weight: ["400"]})
const assistant500 = Assistant({subsets: ["latin"], weight: ["500"]})
const assistant600 = Assistant({subsets: ["latin"], weight: ["600"]})
const assistant700 = Assistant({subsets: ["latin"], weight: ["700"]})
const assistant800 = Assistant({subsets: ["latin"], weight: ["800"]})

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

export {
  inter100,
  inter200,
  inter300,
  inter400,
  inter500,
  inter600,
  inter700,
  inter800,
  inter900,
  lato100,
  lato300,
  lato400,
  lato700,
  lato900,
  trap300,
  trap400,
  trap500,
  trap600,
  trap700,
  trap800,
  assistant200,
  assistant300,
  assistant400,
  assistant500,
  assistant600,
  assistant700,
  assistant800,
};
