import React, { Component } from "react";
import Tracks from "./components/tracks";
import Footer from "./components/footer";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Site">
          <div className="Main">
            <Tracks />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
