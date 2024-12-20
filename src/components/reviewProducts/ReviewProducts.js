import React, { useEffect, useState } from "react";
import styles from "./ReviewProducts.module.scss";
import { useSelector } from "react-redux";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import { useParams } from "react-router-dom";
import Card from "../card/Card";
import StarsRating from "react-star-rate";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../hooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";

const ReviewProducts = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);

  const { document } = useFetchDocument("products", id);

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const submitReview = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rating,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "reviews"), reviewConfig);

      toast.success("Review submitted successfully");
      setRating(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };

 

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px"}} />
        ) : (
          <>
            <p>
              <b>Product name: </b> {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "300px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rating}
              onChange={(rating) => {
                setRating(rating);
              }}
            />

            <label>Review:</label>
            <textarea
              value={review}
              cols={30}
              rows={10}
              required
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <button type="submit" className="--btn --btn-danger">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProducts;
