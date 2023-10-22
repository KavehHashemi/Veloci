import { render } from "@testing-library/react";
import Footer from "../components/Footer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { sleep } from "./utils";

test("footer must be blue while connecting", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Footer connectionStatus="Connecting"></Footer>
      </Provider>
    </BrowserRouter>
  );
  const footer = getByTestId("footer");
  sleep(500).then(() => {
    expect(footer.style.backgroundColor).toEqual("rgba(27, 164, 255, 0.5)");
  });
});

test("footer must be green while connected", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Footer connectionStatus="Open"></Footer>
      </Provider>
    </BrowserRouter>
  );
  const footer = getByTestId("footer");
  sleep(500).then(() => {
    expect(footer.style.backgroundColor).toEqual("rgba(19, 255, 128, 0.8)");
  });
});

test("footer must be red while disconnected", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Footer connectionStatus="Closed"></Footer>
      </Provider>
    </BrowserRouter>
  );
  const footer = getByTestId("footer");
  sleep(500).then(() => {
    expect(footer.style.backgroundColor).toEqual("rgba(255, 78, 78, 0.9)");
  });
});
