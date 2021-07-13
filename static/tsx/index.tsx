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
  useHistory,
  useLocation,
} from "react-router-dom";

interface App_context {
  signin: boolean;
  user: firebase.User;
}

const AppContext = React.createContext<App_context>({
  signin: false,
  user: null,
});

function PrivateRoute(props) {
  const location = useLocation();
  const context = React.useContext(AppContext);

  if (!context.signin) {
    return (
      <Redirect to={{ pathname: "/", state: { from: location.pathname } }} />
    );
  }
  return <Route {...props}></Route>;
}

function App(props) {
  const [state, setState] = React.useState<App_context>({
    signin: false,
    user: null,
  });

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setState({ signin: true, user: user });
        console.log("login detected");
      } else {
        setState({ signin: false, user: null });
        console.log("logout detected");
      }
    });
  }, []);

  return (
    <ErrorScreen>
      <AppContext.Provider value={state}>
        <Router>
          <Switch>
            <PrivateRoute path="/home" exact>
              <Main showing="Main" />
            </PrivateRoute>
            <Route path="/" exact>
              <WelcomeScreen />
            </Route>

            <Route path="/about" exact>
              <div>
                <h1>about page</h1>
              </div>
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

interface WelcomeScreen_state {
  stage: number;
}

function WelcomeScreen(props) {
  const context = React.useContext(AppContext);
  const [state, setState] = React.useState<WelcomeScreen_state>({ stage: 0 });
  const location = useLocation<any>();

  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (
        authResult: firebase.auth.UserCredential
      ) => {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.

        // props.loginCB(authResult);
        console.log("user login");

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
  React.useEffect(() => {
    if (!context.signin) {
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  }, [context.signin]);

  if (context.signin) {
    if (location.state) {
      return <Redirect to={location.state.from} />;
    }
    return <Redirect to="/home" />;
  }
  return (
    <div className="container-md">
      <h1 className="text-md-center">Login to continue</h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

interface LoadWindow_state {}

function LoadWindow(props) {
  return (
    <div className="container-fluid bg-primary align-content-center">
      <div className="container-sm position-absolute top-50 start-50 translate-middle">
        <h1 className="position-relative start-50 translate-middle">
          {props.text}
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
