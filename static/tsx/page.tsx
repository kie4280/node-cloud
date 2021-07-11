import * as React from "react";
import { RealtimeDatabase, getDatabase } from "../ts/firebase";

function HomePage(props) {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function DashPage(props) {
  const db = getDatabase();
  return (
    <div>
      <h1>dash</h1>
    </div>
  );
}

function FolderPage(props) {
  return (
    <div>
      <h1>folders</h1>
    </div>
  );
}

export { HomePage, DashPage, FolderPage };
