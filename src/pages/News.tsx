import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { newsApi } from "../services/newsApi";
import { useState } from "react";
import { Option } from "antd/es/mentions";
import { cryptoApi } from "../services/cryptoAPI";
import { Loader } from "../components";

const { Title, Text } = Typography;

const News = ({ simplified }: { simplified: boolean }) => {
  const [category, setcategory] = useState("Cryptocurrency");
  const { data: cryptos } = cryptoApi.useGetCryptosQuery(100);

  const { data: newsList } = newsApi.useGetNewsQuery({
    category: category,
    count: 10,
  });

  if (!newsList?.data) return <Loader />;

  console.log(newsList);

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            optionFilterProp="children"
            onChange={(value) => setcategory(value)}
            filterOption={(input: string, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase)
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptos?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {newsList?.data.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <img
                src={news.thumbnail}
                alt="news-image"
                className="news-image-container"
              />
              <div>
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <p>
                  {news.excerpt.length > 100
                    ? `${news.excerpt.substring(0, 100)}...`
                    : news.excerpt}
                </p>
              </div>
              <div className="provider-container">
                <div>
                  <Avatar src={news.publisher.favicon} alt="news" />
                  <Text className="provider-name">{news.publisher.name}</Text>
                </div>
                <Text>{moment(news.date).startOf("seconds").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
