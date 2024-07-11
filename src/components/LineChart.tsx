import { Row, Col, Typography } from "antd";
import { CoinHistory } from "../types/crypto";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const { Title } = Typography;
Chart.register(...registerables);

type LineChartProps = {
  coinHistory: CoinHistory;
  currentPrice: string;
  coinName: string;
};

const LineChart = ({ coinHistory, currentPrice, coinName }: LineChartProps) => {
  const coinPrice = [];
  const coinTimeStamp = [];

  for (let i = 0; i < coinHistory.history.length; i++) {
    coinPrice.push(coinHistory.history[i].price);
    coinTimeStamp.push(
      new Date(coinHistory.history[i].timestamp * 1000).toLocaleDateString(
        "id-ID"
      )
    );
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-charge">
            {coinHistory?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options as any} />
    </>
  );
};

export default LineChart;
