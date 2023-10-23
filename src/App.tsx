import useWebSocket, { ReadyState } from "react-use-websocket";
import { Routes, Route } from "react-router-dom";
import Isins from "./components/Isins";
import "./styles/style.scss";
import Footer from "./components/Footer";
import { useAppDispatch } from "./store/hooks";
import { initiateLocalStorage } from "./store/isins";
import Header from "./components/Header";
import Chart from "./components/Chart";

function App() {
  const dispatch = useAppDispatch();
  dispatch(initiateLocalStorage());

  // const { readyState } = useWebSocket("ws://localhost:8425/", {
  const { readyState } = useWebSocket("ws://veloci.netlify.app:8425", {
    //here we connect to the websocket and pass down the connection status to footer component
    onOpen: (event) => {
      console.log("WebSocket connection established.");
      console.log(event);
    },
    onError: (err) => {
      console.log(err);
    },
    onClose: (event) => {
      console.log(event);
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Isins></Isins>}></Route>
        <Route path="/chart" element={<Chart></Chart>}></Route>
      </Routes>
      <Footer connectionStatus={connectionStatus}></Footer>
    </>
  );
}

export default App;
