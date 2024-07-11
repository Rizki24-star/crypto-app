import millify from "millify";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, Row, Col, Avatar, Typography } from "antd";

import { cryptoApi } from "../services/cryptoAPI";
import Meta from "antd/es/card/Meta";
import { Coin } from "../types/crypto";
import { Loader } from "../components";

const Cryptocurrencies = ({
  simplified,
  searchable,
}: {
  simplified: boolean;
  searchable: boolean;
}) => {
  const [cryptos, setCryptos] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = cryptoApi.useGetCryptosQuery(count);

  if (isFetching) return <Loader />;

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins!);
    const filteredCoin = cryptosList?.data?.coins!.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredCoin!);
  }, [cryptosList, searchTerm]);

  console.log(cryptos);

  return (
    <>
      {searchable && (
        <label
          className="search-crypto"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
          htmlFor="search"
        >
          <img
            src="/src/assets/icons/search.png"
            style={{ width: "20px", height: "20px" }}
          />
          <input
            id="search"
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: "0",
              width: "100%",
              backgroundColor: "transparent",
            }}
          />
        </label>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos ? (
          cryptos!.map((crypto) => (
            <Col
              xs={24}
              sm={12}
              lg={6}
              className="crypto-card"
              key={crypto.uuid}
            >
              <Link to={`/crypto/${crypto.uuid}`}>
                <Card style={{ marginTop: 16 }}>
                  <Meta
                    avatar={<Avatar src={crypto.iconUrl} />}
                    title={crypto.symbol}
                    description={crypto.name}
                  />
                  <div className="coin-info-card">
                    <Typography.Title level={4} style={{ margin: "0" }}>
                      ${millify(Number(crypto.price))}
                    </Typography.Title>
                    <span>${millify(Number(crypto.marketCap))}</span>
                    <span
                      style={
                        Number(crypto.change) > 0
                          ? { color: "green" }
                          : { color: " red" }
                      }
                    >
                      {millify(Number(crypto.change))}%
                    </span>
                  </div>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <Typography.Title style={{ marginLeft: "20px" }} level={5}>
            Something went wrong!
          </Typography.Title>
        )}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
