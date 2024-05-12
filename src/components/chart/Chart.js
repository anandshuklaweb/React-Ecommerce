import React from 'react'
import styles from "./Chart.module.scss"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Card from '../card/Card';
import { selectOrderHistory } from '../../redux/slice/orderSlice';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export const option = {
    responsive: true,
    plugins: {
        position: "top"
    },
    title: {
        display: false,
        text: "Chartjs Bar Chart"
    }
}

const labels = ["Placed Orders", "Processing", "Shipped", "Delivered"]

const Chart = () => {

    const orders = useSelector(selectOrderHistory);

    // Create a new array of the order status
    const array = [];
    
    orders.map((order) => {
        const { orderStatus } = order;
        array.push(orderStatus); 
        return orderStatus;
    })

    const getOrderStatusCount = (arr, value) => {
        return arr.filter((n) => n === value).length
    }

    const [q1, q2, q3, q4] = ["Order Placed", "Processing", "Shipped", "Delivered"]

    const placed = getOrderStatusCount(array, q1);
    const processing = getOrderStatusCount(array, q2);
    const shipped = getOrderStatusCount(array, q3);
    const delivered = getOrderStatusCount(array, q4);

    const data = {
        labels,
        datasets: [
            {
                label: "Order count",
                data: [placed, processing, shipped, delivered],
                backgroundColor: 'rgba(249, 115, 22, 0.8)',
            }
        ]
    }
    
  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={option} data={data} />
      </Card>
    </div>
  )
}

export default Chart
