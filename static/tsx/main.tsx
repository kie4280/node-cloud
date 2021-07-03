import * as React from "react";
import "../css/sidebars.css";

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
      case "Home":
        show = <h1>hi</h1>;

        break;

      default:
        show = (
          <div className="horizontal-filler">
            <h1>Nothing here</h1>
          </div>
        );
        break;
    }

    return (
      <div className="horizontal-panel-divider">
        <SideBar buttonCB={this.onModeChange.bind(this)} />
        {show}
      </div>
    );
  }

  public onModeChange(e: Event) {
    e.preventDefault();
    console.log(e);
    this.setState((state, props) => {
      return { showing: (e.target as any).title };
    });
  }
}

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
          data-bs-toggle="tooltip"
          data-bs-placement="right"
        >
          <i className="bi bi-cloud" style={{ fontSize: 40 }}></i>
          <i style={{ fontSize: 15 }}>Node-cloud</i>
        </a>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
          <li>
            <a
              href="#"
              className="nav-link py-3 border-bottom"
              aria-current="page"
              title="Home"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              onClick={this.props.buttonCB}
            >
              <i className="bi bi-house" style={{ fontSize: 30 }}></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link py-3 border-bottom"
              title="Dashboard"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              onClick={this.props.buttonCB}
            >
              <i className="bi bi-speedometer2" style={{ fontSize: 30 }}></i>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link py-3 border-bottom"
              title="Orders"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
            >
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Orders"
              >
                <use xlinkHref="#table" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link py-3 border-bottom"
              title="Products"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
            >
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Products"
              >
                <use xlinkHref="#grid" />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link py-3 border-bottom"
              title="Customers"
              data-bs-toggle="tooltip"
              data-bs-placement="right"
            >
              <svg
                className="bi"
                width={24}
                height={24}
                role="img"
                aria-label="Customers"
              >
                <use xlinkHref="#people-circle" />
              </svg>
            </a>
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

export { Main };
