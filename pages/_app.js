import "tailwindcss/tailwind.css";
import "../styles/global.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

// To show progress bar in the application. ProgressBar object details are available
// in the library documentation 'badrap/bar-of-progress'
const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});

//Connecting progress bar to next js router
Router.events.on("routeChangeStart", progress.start);      //On Change start progress should start
Router.events.on("routeChangeComplete", progress.finish); // On Complete progress should finish
Router.events.on("routeChangeComplete", progress.finish);  // On Error progress should finish

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
