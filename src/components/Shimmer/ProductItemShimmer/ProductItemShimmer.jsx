import React from "react";
import styles from "./ProductItemShimmer.module.scss";
import Card from "../../card/Card";

const ProductItemShimmer = () => {
  return (
    
      <Card cardClass={`${styles.grid} ${styles.productShimmer}`}>
        <div className={styles.shimmer}></div>
      </Card>
    
  );
};

export default ProductItemShimmer;
