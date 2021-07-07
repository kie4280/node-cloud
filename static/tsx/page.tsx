import * as React from "react";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
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

class FolderPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>folders</h1>
      </div>
    );
  }
}

export { HomePage, DashPage, FolderPage };
