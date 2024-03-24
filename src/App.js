import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import UserGuide from "./Components/UserGuide";
import Feedback from "./Components/Feedback";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Home />
      <About />
      <UserGuide />
      <Feedback />
      <Footer />
    </div>
  );
}

export default App;