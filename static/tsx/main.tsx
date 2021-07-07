import * as React from "react";
import "../css/sidebars.css";
import { HomePage, DashPage } from "./page";

class SideBar extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="d-flex flex-column flex-shrink-0 bg-light"
        style={{ width: "4.5rem", height: "100vh" }}
      >
        <a
          href="/"
          className="d-block p-3 link-dark text-decoration-none"
          title="Icon-only"
          data-bs-toggle="tooltip tab"
          data-bs-placement="right"
          data-bs-target="#home-tab"
        >
          <i className="bi bi-cloud" style={{ fontSize: 40 }}></i>
          <i style={{ fontSize: 15 }}>Node-cloud</i>
        </a>
        <ul
          className="nav nav-pills nav-flush flex-column mb-auto text-center"
          role="tablist"
        >
          <li>
            <button
              className="nav-link active container-fluid border-bottom"
              aria-current="page"
              title="Home"
              type="button"
              data-bs-toggle="tab"
              data-bs-placement="right"
              data-bs-target="#home-tab"
              role="tab"
            >
              <i className="bi bi-house" style={{ fontSize: 30 }}></i>
            </button>
          </li>
          <li>
            <button
              className="nav-link container-fluid border-bottom"
              title="Dashboard"
              type="button"
              data-bs-toggle="tab"
              data-bs-placement="right"
              data-bs-target="#dashboard-tab"
              role="tab"
            >
              <i className="bi bi-speedometer2" style={{ fontSize: 30 }}></i>
            </button>
          </li>
        </ul>
        <div className="dropdown border-top">
          <a
            href="#"
            className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-gear" style={{ fontSize: 30 }}></i>
          </a>
          <ul
            className="dropdown-menu text-small shadow"
            aria-labelledby="dropdownUser3"
          >
            <li>
              <a className="dropdown-item" href="#">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

interface Main_state {
  showing: string;
}

class Main extends React.Component<any, Main_state> {
  constructor(props) {
    super(props);
    this.state = { showing: props.showing ? props.showing : "" };
  }

  render() {
    let show = undefined;
    switch (this.state.showing) {
      case "Main":
        show = (
          <div className="horizontal-panel-divider">
            <SideBar />
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <HomePage />
              </div>
              <div
                className="tab-pane fade"
                id="dashboard-tab"
                role="tabpanel"
                aria-labelledby="dashboard-tab"
              >
                <DashPage />
              </div>
              <div
                className="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              ></div>
            </div>
          </div>
        );
        break;
      default:
        show = (
          <div className="horizontal-filler">
            <h1>Nothing here</h1>
          </div>
        );
        break;
    }

    return show;
  }
}

export { Main };
