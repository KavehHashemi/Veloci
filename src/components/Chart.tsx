/* eslint-disable react-hooks/exhaustive-deps */
import { Line } from "react-chartjs-2";
import { JsonResponse } from "./Isins";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useAppSelector } from "../store/hooks";

type JsonResponseWithTimeStamp = {
  isin: string;
  price: number;
  ask: number;
  bid: number;
  timestamp: number;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const { currentISIN } = useAppSelector((state) => state.isin);
  const { isLightMode } = useAppSelector((state) => state.mode);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://localhost:8425/"
  );
  const data = lastJsonMessage as JsonResponse;
  useEffect(() => {
    sendJsonMessage({ subscribe: currentISIN });
  }, [currentISIN]);

  const [messageHistory, setMessageHistory] = useState<
    JsonResponseWithTimeStamp[]
  >([]);

  ///a timestamp is added to every recieved JsonResponse so that it could be displayed on the chart
  useEffect(() => {
    if (data !== null) {
      const datedData: JsonResponseWithTimeStamp = {
        isin: data.isin,
        price: data.price,
        ask: data.ask,
        bid: data.bid,
        timestamp: Date.now(),
      };
      setMessageHistory([...messageHistory, datedData]);
    }
  }, [data]);

  return (
    <section className={isLightMode ? "chart-container-l" : "chart-container"}>
      {/* here we loop throuth the last 10 recieved messages and use their timstamps as x-axis labels(in 'labels')*/}
      {/* of course our data will be the price property of those last 10 messages (in 'datasets')*/}
      <Line
        data={{
          labels: messageHistory
            .slice(-10)
            .map(
              (d) =>
                `${new Date(d.timestamp).getHours()}:${new Date(
                  d.timestamp
                ).getMinutes()}:${new Date(
                  d.timestamp
                ).getSeconds()}:${new Date(d.timestamp).getMilliseconds()}`
            ),

          datasets: [
            {
              label: data?.isin,
              data: messageHistory.slice(-10).map((d) => {
                if (d.price !== 0) return d.price;
              }),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      ></Line>
    </section>
  );
};

export default Chart;
