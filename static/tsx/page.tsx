import * as React from "react";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    );
  }
}

class DashPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>dash</h1>
      </div>
    );
  }
}

export { HomePage , DashPage};
