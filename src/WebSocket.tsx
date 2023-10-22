// import { useState, useCallback, useEffect } from "react";
// import useWebSocket, { ReadyState } from "react-use-websocket";
// type ParsedResponse = {
//   isin: string;
//   price: number;
//   bid: number;
//   ask: number;
// };
// export const WebSocketDemo = () => {
//   // const [messageHistory, setMessageHistory] = useState([]);
//   const [enteredISIN, setEnteredISIN] = useState<string>("");

//   const { sendJsonMessage, lastJsonMessage } = useWebSocket(
//     "ws://localhost:8425/"
//   );

// useEffect(() => {
//   if (lastJsonMessage !== null) {
//     setMessageHistory((prev) => prev.concat(lastJsonMessage));
//   }
// }, [lastJsonMessage, setMessageHistory]);

//   const handleClickSendJSONMessage = useCallback(
//     () => sendJsonMessage({ subscribe: "DE000BASF111" }),
//     []
//   );

//   const handleSubmit = useCallback((isin: string) => {
//     sendJsonMessage({ subscribe: isin });
//   }, []);

//   const log = () => {
//     const a = lastJsonMessage;
//     console.log(typeof a);
//     console.log((a as ParsedResponse).isin);
//     console.log((a as ParsedResponse).price);
//     console.log((a as ParsedResponse).ask);
//     console.log((a as ParsedResponse).bid);
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "0.5rem",
//       }}
//     >
//       <button
//         onClick={handleClickSendJSONMessage}
//         // disabled={readyState !== ReadyState.OPEN}
//       >
//         Click Me to subscribe to 'BASF'
//       </button>
//       <button onClick={log}>log</button>
//       <input
//         value={enteredISIN}
//         onChange={(e) => setEnteredISIN(e.target.value)}
//         type="text"
//       ></input>
//       <button
//         onClick={() => {
//           handleSubmit(enteredISIN);
//         }}
//       >
//         subscribe
//       </button>

//       {/* <div>
//         {lastJsonMessage ? (
//           <div>
//             <p>{(lastJsonMessage as ParsedResponse).isin}</p>
//             <p>{(lastJsonMessage as ParsedResponse).price}</p>
//           </div>
//         ) : null}
//       </div> */}
//       {/* <ul>
//         {messageHistory.map((message, idx) => (
//           <span key={idx}>{message ? message.data : null}</span>
//         ))}
//       </ul> */}
//     </div>
//   );
// };
