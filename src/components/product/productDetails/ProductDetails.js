import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART_QTY,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../hooks/useFetchDocument";
import useFetchCollection from "../../../hooks/useFetchCollection";
import Card from "../../card/Card";
import StarsRating from "react-star-rate";
import { FaStar } from "react-icons/fa";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { document } = useFetchDocument("products", id);

  const cart = cartItems.find((cart) => cart.id === id);

  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  // to get average rating
  const totalReviews = filteredReviews.length;
  const totalRating = filteredReviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  const isProductAddedToCart = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const increaseQuantity = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  const decreaseQuantity = (product) => {
    dispatch(DECREASE_CART_QTY(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details </h2>

        <div>
          <Link to="/collection">&larr; Back to Products</Link>
        </div>

        {product === null ? (
          <img
            src={spinnerImg}
            alt="Loading..."
            style={{ width: "50px" }}
            className="--center-all"
          />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>

              <div className={styles.content}>
                <h3>
                  <b>{product.name}</b>
                </h3>
                <p className={styles.price}>₹{product.price}</p>
                <p>{product.desc}</p>

                <p>
                  <b>SKU:</b> {product.id}
                </p>

                <p>
                  <b>Brand:</b> {product.brand}
                </p>

                <div className={styles.count}>
                  {isProductAddedToCart < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseQuantity(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart ? cart.cartQuantity : 0}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => increaseQuantity(product)}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </>
                  )}
                </div>

                <button
                  className="--btn --btn-danger --button"
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}

        <Card cardClass={styles.card}>
          <h3>
            <span>Product Reviews</span>
            <span>{averageRating.toFixed(1)} <FaStar color="#ffd166" fontSize={"20px"} /></span>
          </h3>

          <div>
            {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet</p>
            ) : (
              <>
                {filteredReviews.map((Productreview, index) => {
                  const { rating, review, reviewDate, userName } =
                    Productreview;
                  return (
                    <div className={styles.review} key={index}>
                      <StarsRating
                        value={rating}
                        disabled={true}
                        className={styles.ratingStar}
                      />
                      <p style={{ padding: "10px 0" }}>{review}</p>
                      <p className={styles.small}>{reviewDate}</p>
                      <p className={styles.small}>by: {userName}</p>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetails;
