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
    let screen = undefined;
    switch (this.state.mode) {
      case 0:
        screen = <Welcome />;
        break;
      case 1:
        screen = <Main showing="Main"/>;
        break;
      default:
        screen = <div></div>;
        break;
    }
    return <ErrorScreen>{screen}</ErrorScreen>;
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

class ErrorScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { has_error: false, errInfo: "" };
  }

  componentDidCatch(error, errInfo) {
    this.setState({ has_error: true, errInfo: errInfo });
  }

  render() {
    if (this.state.has_error) {
      return (
        <div>
          <h1 className="m-1 p-4">Sorry, an error occured</h1>
        </div>
      );
    }
    return this.props.children;
  }
}

const app_handle = React.createRef<App>();

ReactDOM.render(
  <App ref={app_handle} mode={1} />,
  document.getElementById("root")
);
