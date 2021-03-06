import React, { useEffect, useState } from "react";
import { Card, Col } from "antd";
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { AddProductAction, RemoveProductAction } from "../../actions/ProductActions";
import { Link } from "react-router-dom";
import commaFunction from "../../utils/commaFunction";
const { Meta } = Card;

const ProductObject = ({ product, user, AddProductAction, RemoveProductAction }) => {
  const [basket, setBasket] = useState([]);
  const [itemExists, setItemExists] = useState(false);
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    if (!user) {
      setBasket([]);
      setItemExists(false);
    } else setBasket(user.basket);
  }, [user]);
  useEffect(() => {
    let index = basket && basket.findIndex((item) => item.product._id === product._id);
    setItemExists(index === -1 ? false : true);
    setItemCount(index === -1 ? 0 : basket[index].quantity);
  }, [basket, product]);
  let itemDoesntExistsOnBasket = () =>
    user && [
      <ShoppingCartOutlined title="Add To Basket!" onClick={() => AddProductAction(product._id)} />,
    ];
  let itemExistsOnBasket = () => [
    <MinusOutlined title="-1" onClick={() => RemoveProductAction(product._id)} />,
    itemCount,
    <PlusOutlined title="+1" onClick={() => AddProductAction(product._id)} />,
  ];

  return (
    <Col className="gutter-row" span={6} xs={24} sm={24} md={12} lg={8}>
      <Card
        style={{ width: 300 }}
        cover={<img alt="productimage" src={product.image} className="productImage" />}
        actions={itemExists ? itemExistsOnBasket() : itemDoesntExistsOnBasket()}
      >
        <Meta
          title={<Link to={`/product/${product._id}`}>{product.name}</Link>}
          description={`${product.description.slice(0, 30)}  ${
            product.description.length > 30 ? "..." : ""
          }`}
          avatar={commaFunction(product.price) + "$"}
        />
      </Card>
    </Col>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = { AddProductAction, RemoveProductAction };

export default connect(mapStateToProps, mapDispatchToProps)(ProductObject);
