import React from "react";
import Card from "../card/Card";
import styles from "./InfoBox.module.scss";

const InfoBox = ({ cardClass, title, count, icon }) => {
  return (
    <div className={styles["info-box"]}>
      <Card cardClass={cardClass}>
        <h4><b>{title}</b></h4>
        <span>
          <h3 className={styles.dataCount}>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  );
};

export default InfoBox;