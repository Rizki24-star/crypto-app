import { useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { cryptoApi } from "../services/cryptoAPI";
import { Loader, LineChart } from "../components";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetail = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("3h");
  const { data: coin, isFetching } = cryptoApi.useGetCryptoDetailsQuery(
    coinId!
  );

  const { data: coinHistory, isFetching: coinHistoryFetching } =
    cryptoApi.useGetCryptoHistoryQuery({
      coinId: coinId!,
      timePeriod: timePeriod,
    });

  if (isFetching || coinHistoryFetching) return <Loader />;

  const cryptoDetails = coin!.data!.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(Number(cryptoDetails.price))}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] &&
        millify(Number(cryptoDetails["24hVolume"]))
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails.marketCap && millify(Number(cryptoDetails.marketCap))
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(Number(cryptoDetails.allTimeHigh.price))}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails!.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails!.supply.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(Number(cryptoDetails!.supply.total))}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(Number(cryptoDetails!.supply.circulating))}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  console.log(coin?.data.coin);
  console.log({ coin: coinHistory });

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails!.name} ({cryptoDetails!.symbol}) Price
        </Title>
        <p>
          {cryptoDetails!.name} live price in US dollars. View value statistics,
          market cap and supply
        </p>
      </Col>
      <Select
        defaultValue="3h"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => {
          setTimePeriod(value);
          console.log(timePeriod);
        }}
      >
        {time.map((date) => (
          <Option key={date}> {date}</Option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory?.data!}
        currentPrice={millify(Number(cryptoDetails.price))}
        coinName={cryptoDetails.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} value statistics
            </Title>
            <p>An overview showing the stats of</p>
          </Col>
          {stats.map((item) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{item.icon}</Text>
                <Text>{item.title}</Text>
              </Col>
              <Text className="stats">{item.value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map((item) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{item.icon}</Text>
                <Text>{item.title}</Text>
              </Col>
              <Text className="stats">{item.value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Col className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name} <br />
          </Title>
          <p>{cryptoDetails.description}</p>
        </Col>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetail;
