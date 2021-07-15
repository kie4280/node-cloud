import * as React from "react";
import { RealtimeDatabase, getDatabase, NODE } from "../ts/firebase";

function HomePage(props) {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function ComputerNode(props) {
  const n: NODE = props.node;
  return (
    <div>
      <p>Name: {n.node_name}</p>
      <p>Last seen: {n.lastSeen}</p>
      <p>Status: {n.status}</p>
    </div>
  );
}

const db = getDatabase();

interface DashPage_state {
  nodes: Array<React.ReactElement>;
}

function DashPage(props) {
  const [state, setState] = React.useState<DashPage_state>({ nodes: [] });

  React.useEffect(() => {
    const handle = setInterval(() => {
      let ns = new Array();
      db.getNodes().forEach((v, i) => {
        ns = ns.concat([<ComputerNode node={v} key={v.node_name}/>]);
      });
      setState({ nodes: ns });
    }, 5000);

    return () => {
      clearInterval(handle);
    };
  }, []);

  return (
    <div>
      <h1>dash</h1>
      {state.nodes}
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
