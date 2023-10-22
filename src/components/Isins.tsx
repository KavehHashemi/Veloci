import { useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { checkISINUniqueness, checkISINValidity } from "../utils";
import "../styles/style.scss";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addIsin,
  removeIsin,
  setCurrentISIN,
  updateLastRelevantResponses,
} from "../store/isins";
import { setCurrentMessage } from "../store/messages";
import { Link } from "react-router-dom";

export type JsonResponse = {
  isin: string;
  price: number;
  bid: number;
  ask: number;
};
const Isins = () => {
  const dispatch = useAppDispatch();
  const { isins, lastRelevantResponses } = useAppSelector(
    (state) => state.isin
  );
  const { isLightMode } = useAppSelector((state) => state.mode);
  const [enteredISIN, setEnteredISIN] = useState<string>("");
  ///number of the displayed decimal points of the prices depends on the width of the viewport;
  ///in larger screens the decimal points is '15', while in small screens it is reduced to '7'.
  const [decimalNumbers, setDecimalNumbers] = useState<number>(15);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://localhost:8425/"
  );

  ///currentISIN is displayed in header in Chart page,
  ///so when the user comes back to this page, it must be cleared
  useEffect(() => {
    dispatch(setCurrentISIN(undefined));
  }, []);

  ///when isins list is updated in redux, we subscribe to them
  useEffect(() => {
    for (let i = 0; i < isins.length; i++) {
      sendJsonMessage({ subscribe: isins[i] });
    }
  }, [isins]);

  useEffect(() => {
    ///after recieving each new JsonMessage, we store them in redux state
    /// to be used when we have no new JsonMessage for that particular instrument
    dispatch(updateLastRelevantResponses(lastJsonMessage));
    ///here we set the decimal numbers based on screen width
    if (window.innerWidth < 480) {
      setDecimalNumbers(7);
    } else {
      setDecimalNumbers(15);
    }
  }, [lastJsonMessage]);

  const handleSubscribe = useCallback((isin: string) => {
    ///the new entered instrument ISIN is checked for its validity
    if (checkISINValidity(isin)) {
      ///the duplicity of the new entered instrument ISIN is also checked
      if (checkISINUniqueness(isin)) {
        ///if the enetered instrument is valid and, in fact, new, then it will be added
        dispatch(addIsin(isin));
        setEnteredISIN("");
      } else {
        ///if the enetered ISIN fails the duplicity test, a proper error is emitted
        dispatch(setCurrentMessage("Duplicate ISIN"));
        ///the message is then displayed in the footer for 3 seconds before it disappears
        setTimeout(() => {
          dispatch(setCurrentMessage(""));
        }, 3000);
        console.log("duplicate ISIN");
      }
    } else {
      ///if the enetered ISIN fails the validity test, a proper error is emitted
      dispatch(setCurrentMessage("Invalid ISIN"));
      ///the message is then displayed in the footer for 3 seconds before it disappears
      setTimeout(() => {
        dispatch(setCurrentMessage(""));
      }, 3000);
      console.log("invalid ISIN");
    }
  }, []);

  const handleUnsubscribe = useCallback((isin: string) => {
    ///a confirmation is asked from the user before removing the ISIN from the list of subscriptions
    const text = `Are you sure you want to unsubscribe from ${isin}`;
    if (confirm(text) == true) {
      dispatch(removeIsin(isin));
    }
    ///nothing will happen if the user cancels unsubscription
  }, []);

  return (
    <section
      data-testid="isins-container"
      className={isLightMode ? "isins-container-l" : "isins-container"}
    >
      <table
        data-testid="isins-subscribe"
        className={isLightMode ? "isins-subscribe-l" : "isins-subscribe"}
        aria-label="isins-subscribe"
      >
        <tbody>
          <tr>
            <td colSpan={4}>
              <input
                value={enteredISIN}
                onChange={(e) => setEnteredISIN(e.target.value)}
                type="text"
                placeholder="Add New ISIN"
                aria-label="Add New ISIN"
                className={isLightMode ? "input-l" : "input"}
              ></input>
            </td>
            <td colSpan={2}>
              <button
                className={isLightMode ? "button-l" : "button"}
                onClick={() => {
                  handleSubscribe(enteredISIN);
                }}
                style={{ width: "80%" }}
                aria-label="subscribe-button"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        data-testid="isins-table"
        className={isLightMode ? "isins-table-l" : "isins-table"}
        aria-label="isins-table"
      >
        <tbody>
          {/* if the user has not subscribed to any ISINS, a message will be
          displayed */}
          {isins.length > 0 ? (
            <tr
              style={{
                borderBottom: "1px solid #000",
                paddingBlock: "0.5rem",
              }}
            >
              <td aria-label="instrument">Instrument</td>
              <td aria-label="price">Price</td>
              <td aria-label="bid" className="responsive">
                Bid
              </td>
              <td aria-label="ask" className="responsive">
                Ask
              </td>
              <td id="func"></td>
              <td id="func"></td>
            </tr>
          ) : (
            <>
              <tr
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#646cff",
                }}
              >
                <td>Add a new instrument to begin!</td>
              </tr>
              <tr>
                <td>
                  <sub>
                    An ISIN is a 12-character alphanumeric code. It consists of
                    three parts: A two letter country code, a nine character
                    alpha-numeric national security identifier, and a single
                    check digit. Example:- US0378331005.
                  </sub>
                </td>
              </tr>
            </>
          )}

          {/* here we create a row for each subscribed intrument */}
          {isins.map((singleSubscribedISIN, i) => {
            return (
              <tr key={i}>
                <td aria-label={singleSubscribedISIN}>
                  {singleSubscribedISIN}
                </td>
                <td aria-label="price">
                  {/* if the isin property of the newly recieved message matches the 
                  isin property of our current subscribed instrument, it will be displayed here.
                  Otherwise, the last existing price for our instrument will
                  be read from the redux state and will be displayed*/}
                  {(lastJsonMessage as JsonResponse)?.isin ===
                  singleSubscribedISIN
                    ? (lastJsonMessage as JsonResponse).price.toFixed(
                        decimalNumbers
                      )
                    : lastRelevantResponses[
                        singleSubscribedISIN
                      ]?.price.toFixed(decimalNumbers)}
                </td>
                <td aria-label="bid" className="responsive">
                  {(lastJsonMessage as JsonResponse)?.isin ===
                  singleSubscribedISIN
                    ? (lastJsonMessage as JsonResponse).bid
                    : lastRelevantResponses[singleSubscribedISIN]?.bid}
                </td>
                <td aria-label="ask" className="responsive">
                  {(lastJsonMessage as JsonResponse)?.isin ===
                  singleSubscribedISIN
                    ? (lastJsonMessage as JsonResponse).ask
                    : lastRelevantResponses[singleSubscribedISIN]?.ask}
                </td>

                <td aria-label="open-chart" id="func">
                  <Link
                    to={"/chart"}
                    className={isLightMode ? "a-l" : "a"}
                    onClick={() =>
                      dispatch(setCurrentISIN(singleSubscribedISIN))
                    }
                  >
                    <img
                      alt="chart"
                      src="src/assets/chart.svg"
                      width={18}
                      aria-label="chart"
                    ></img>
                  </Link>
                </td>
                <td aria-label="unsubscribe" id="func">
                  <button
                    className={isLightMode ? "button-l" : "button"}
                    id="unsubscribe"
                    onClick={() => handleUnsubscribe(singleSubscribedISIN)}
                  >
                    <img
                      alt="unsubscribe"
                      src="src/assets/delete.svg"
                      width={18}
                      aria-label="unsubscribe"
                    ></img>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Isins;
