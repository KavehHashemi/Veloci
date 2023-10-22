import { useAppSelector } from "../store/hooks";

type footerProps = {
  connectionStatus: string;
};

const Footer = ({ connectionStatus }: footerProps) => {
  ///footer displays the current connection status along with error messages
  ///connection statuses are displayed by text ('Connecting', 'Open', and 'Closed') and background colors (Blue, Green, and Red)
  ///messages are temporary errors ('Invalid ISIN', 'Duplicate ISIN')
  const { currentMessage } = useAppSelector((state) => state.message);
  return (
    <footer aria-label="footer" data-testid="footer" id={connectionStatus}>
      <main className="info">
        <span
          aria-label="connection-status"
          data-testid="connection-status"
          className="connection-status"
        >
          {connectionStatus}
        </span>
      </main>
      <span aria-label="message" className="message">
        {currentMessage}
      </span>
    </footer>
  );
};

export default Footer;
