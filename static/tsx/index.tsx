import * as React from "react";
import * as ReactDOM from "react-dom";
import { Main } from "./main";
import firebase from "firebase";
import { ui } from "../ts/firebase";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import PropTypes from "prop-types";

interface App_context {
  signin: boolean;
  userCred: firebase.auth.UserCredential;
}

const AppContext = React.createContext<App_context>({
  signin: false,
  userCred: undefined,
});

class PrivateRoute extends React.Component<any, any> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { match, location, history } = this.props;

    if (!this.context.signin) {
      return (
        <Redirect
          push
          to={{ pathname: "/login", state: { from: location.pathname } }}
        />
      );
    }
    return <Route {...this.props}></Route>;
  }
}

const PrivateRouter = withRouter(PrivateRoute);

function App(props) {
  const [state, setState] = React.useState<App_context>({
    signin: false,
    userCred: null,
  });

  function onLogin(cred: firebase.auth.UserCredential) {
    setState({
      signin: true,
      userCred: cred,
    });
    console.log("on login called");
  }

  return (
    <ErrorScreen>
      <AppContext.Provider value={state}>
        <Router>
          <Switch>
            <PrivateRouter path="/home" exact>
              <Main showing="Main" />
            </PrivateRouter>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/about" exact>
              <div>
                <h1>about page</h1>
              </div>
            </Route>
            <Route path="/login" exact>
              <LoginScreenRouter loginCB={onLogin} />
            </Route>

            {/* show if not found */}
            <Route path="/">
              <div className="container-sm align-content-center">
                <h1 className="text-center">Not found</h1>
              </div>
            </Route>
          </Switch>
        </Router>
      </AppContext.Provider>
    </ErrorScreen>
  );
}

interface LoginScreen_state {
  popHistory: boolean;
}

class LoginScreen extends React.Component<any, LoginScreen_state> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;
  private uiConfig;
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      popHistory: this.props.popHistory ? this.props.popHistory : false,
    };
    console.log("login constructed");
    this.uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (
          authResult: firebase.auth.UserCredential
        ) => {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.

          this.props.loginCB(authResult);

          return false;
        },
        uiShown: function () {},
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: "popup",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      // tosUrl: "<your-tos-url>",
      // Privacy policy url.
      // privacyPolicyUrl: "<your-privacy-policy-url>",
    };
  }

  private showLoginUI() {
    if (this.context.signin) {
      return;
    }

    ui.start("#firebaseui-auth-container", this.uiConfig);
  }

  componentDidMount() {
    this.showLoginUI();
  }

  componentDidUpdate() {
    this.showLoginUI();
  }

  render() {
    const { match, location, history } = this.props;
    if (this.context.signin) {
      if (location.state) {
        return <Redirect to={location.state.from} />;
      }
      return <Redirect to="/" />;
    }
    return (
      <div className="container-md">
        <h1 className="text-md-center">Login to continue</h1>
        <div id="firebaseui-auth-container"></div>
      </div>
    );
  }
}

const LoginScreenRouter = withRouter(LoginScreen);

interface LoadWindow_state {}

class LoadWindow extends React.Component<any, LoadWindow_state> {
  static contextType = AppContext;
  context!: React.ContextType<typeof AppContext>;

  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  componentDidUpdate() {}

  render() {
    return (
      <div className="container-fluid bg-primary align-content-center">
        <div className="container-sm position-absolute top-50 start-50 translate-middle">
          <h1 className="position-relative start-50 translate-middle">
            Welcome
          </h1>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-info"
              role="progressbar"
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
              style={{ width: "25%" }}
            />
          </div>
        </div>
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
    this.setState({ has_error: true, errInfo: errInfo, errMsg: error });
  }

  render() {
    if (this.state.has_error) {
      const stack: React.ErrorInfo = this.state.errInfo;
      const msg: string = this.state.errMsg;
      return (
        <div className="container-md">
          <h1 className="m-1 p-4">Sorry, an error occured</h1>
          <div className="accordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#stacktrace-panel"
                  aria-expanded="false"
                  aria-controls="stacktrace-panel"
                >
                  Details
                </button>
              </h2>
              <div
                id="stacktrace-panel"
                className="accordion-collapse collapse"
                aria-labelledby="stacktrace"
              >
                <div className="accordion-body">
                  <pre>{`${msg}\nStacktrace:\n${stack.componentStack}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export { AppContext, App_context };
