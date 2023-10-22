import { fireEvent, render } from "@testing-library/react";
import Header from "../components/Header";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { sleep } from "./utils";

test("must switch between dark and light mode", async () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Provider store={store}>
        <Header></Header>
      </Provider>
    </BrowserRouter>
  );
  const Navbar = getByTestId("navbar");
  const Switch = getByTestId("switch");
  let className = Navbar.className;
  //isLightMode is false by default
  sleep(500).then(() => {
    expect(Navbar.style.backgroundColor).toEqual("black");
    expect(className).toEqual("navbar");
  });

  fireEvent.click(Switch);

  className = Navbar.className;
  sleep(500).then(() => {
    expect(Navbar.style.backgroundColor).toEqual("white");
    expect(className).toEqual("navbar-l");
  });
});
