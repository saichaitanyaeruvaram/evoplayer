import React, { Component } from "react";
import Script from "react-load-script";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  handleScriptCreate() {
    console.log("hola im in script create");
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    console.log("hola im in script err");
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    console.log("hola im in script load");
    this.setState({ scriptLoaded: true });
    const streamUrl =
      "rtsp://10.102.10.80:5544/75036224-f0db-45e4-82d6-8255288c3c9d";
    const isWss = false;
    const playerID = "video_1";

    const streamID = streamUrl.substring(streamUrl.lastIndexOf("/") + 1);
    let host = streamUrl.split("//")[1];
    host = host.substring(0, host.indexOf("/"));
    const streamIp = host.split(":")[0];
    const streamPort = host.split(":")[1];
    const opts = {
      emsIp: streamIp,
      emsPort: isWss ? 8420 : 8410,
      port: streamPort ? streamPort : 5544,
      useSsl: isWss,
      streamName: streamID,
      videoTagId: playerID
    };
    const evoWsPlayer = new window.EvoWsPlayer(opts);
    evoWsPlayer.play();
  }

  render() {
    return (
      <div>
        <Script
          // url="https://github.com/saichaitanyaeruvaram/chat-app-react-redux-saga-websockets/releases/download/v1/evohtml5player.js"
          url="../Libs/evohtml5player.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
          attributes={{ type: "text/javascript" }}
        />

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>

          <br />
          <video id="video_1" width="480" height="270" controls autoPlay />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
