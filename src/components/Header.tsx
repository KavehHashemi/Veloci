import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setLightMode } from "../store/mode";

const Header = () => {
  const dispatch = useAppDispatch();
  const { currentISIN } = useAppSelector((state) => state.isin);
  const { isLightMode } = useAppSelector((state) => state.mode);

  ///header contains the logo which also works as home button,
  ///current ISIN which is being displayed in chart page,
  ///and the switch for dark/light mode.

  return (
    <nav
      data-testid="navbar"
      id="navbar"
      aria-label="navbar"
      className={isLightMode ? "navbar-l" : "navbar"}
    >
      {/* <a aria-label="home" href="/" style={{ display: "flex" }}>
       
      </a> */}
      {currentISIN ? <h4 aria-label="current-ISIN">{currentISIN}</h4> : null}
      <button
        data-testid="switch"
        className="switch"
        onClick={() => dispatch(setLightMode(!isLightMode))}
        aria-label="dark-light-switch"
      >
        {isLightMode ? (
          <img
            aria-label="dark-mode"
            alt="dark-mode"
            width={18}
            src="public/icons/dark.svg"
          ></img>
        ) : (
          <img
            aria-label="light-mode"
            alt="light-mode"
            width={18}
            src="public/icons/light.svg"
          ></img>
        )}
      </button>
    </nav>
  );
};

export default Header;
