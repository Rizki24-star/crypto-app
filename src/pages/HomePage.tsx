import { Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import { cryptoApi } from "../services/cryptoAPI";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { Loader } from "../components";
import {
  BarChartOutlined,
  DeleteRowOutlined,
  FieldTimeOutlined,
  FundOutlined,
  ShopOutlined,
} from "@ant-design/icons";

const HomePage = () => {
  const Title = Typography.Title;
  const { data: data, isFetching } = cryptoApi.useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <div>
      <Title>Global Crypto Stats</Title>
      <Row style={{ width: "100%" }} className="global-stats-container">
        <Col lg={10} sm={24} xs={24} className="global-stats-card">
          <BarChartOutlined style={{ fontSize: "48px", color: "#08c" }} />
          <Statistic
            title="Total Cryptocurrencies"
            value={globalStats?.total}
          />
        </Col>
        <Col lg={10} xs={24} className="global-stats-card">
          <DeleteRowOutlined style={{ fontSize: "48px", color: "#f7dc6f" }} />
          <Statistic
            title="Total Exchanges"
            value={millify(Number(globalStats?.totalExchanges))}
          />
        </Col>
        <Col lg={10} xs={24} className="global-stats-card">
          <FundOutlined style={{ fontSize: "48px", color: "#F5B041" }} />
          <Statistic
            title="Total Market Cap"
            value={millify(Number(globalStats?.totalMarketCap))}
          />
        </Col>
        <Col lg={10} xs={24} className="global-stats-card">
          <FieldTimeOutlined style={{ fontSize: "48px", color: "#EC7063" }} />
          <Statistic
            title="Total 24h Volumes"
            value={millify(Number(globalStats?.total24hVolume))}
          />
        </Col>
        <Col lg={10} xs={24} className="global-stats-card">
          <ShopOutlined style={{ fontSize: "48px", color: "#2ECC71" }} />
          <Statistic
            title="Total Markets"
            value={millify(Number(globalStats?.totalMarkets))}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={5} className="show-more">
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified searchable={false} />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          News
        </Title>
        <Title level={5} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </div>
  );
};

export default HomePage;
