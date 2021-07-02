import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from "./main";

interface App_state {
  mode: number;
}

class App extends React.Component<any, App_state> {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode ? props.mode : 0,
    };
  }

  render() {
    switch (this.state.mode) {
      case 0:
        return <Welcome />;

      case 1:
        return <Main />;
      default:
        return <ErrorScreen />;
        break;
    }
  }

  public changeMode(mode: number) {
    this.setState((state, props) => {
      mode: mode;
    });
  }
}

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>sdfgsg</h1>
      </div>
    );
  }
}

class ErrorScreen extends React.Component {
  render() {
    return (
      <div>
        <h1>Sorry, an error occured</h1>
      </div>
    );
  }
}

const app_handle = React.createRef<App>();

ReactDOM.render(
  <App ref={app_handle} mode={1} />,
  document.getElementById("root")
);
