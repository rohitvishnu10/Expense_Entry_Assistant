import "../Homepage.css";
import Home from "../components/Homepage/Home";
import About from "../components/Homepage/About";
import UserGuide from "../components/Homepage/UserGuide";
import Feedback from "../components/Homepage/Feedback";
import Footer from "../components/Homepage/Footer";

function HomeApp() {
  return (
    <div className="App" sx={{ display: "flex",bgcolor:"#292c37" }} >
      <Home />
      <About />
      <UserGuide />
      <Feedback />
      <Footer />
    </div>
  );
}

export default HomeApp;