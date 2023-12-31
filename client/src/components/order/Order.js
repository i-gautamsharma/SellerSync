import React, { useContext, useState, useEffect } from "react";
import OrderCard from "./orderCard";
import baseurl from "../../base_url_export";
import { LoginContext } from "../../App";
const Order = () => {
  const { userInfo } = useContext(LoginContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const url = `${baseurl}/order`;
  async function getOrderHistory() {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderedBy: userInfo.userID }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.error);
      } else {
        setOrderHistory(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getOrderHistory();
  }, [userInfo.userID]);
  return (
    <div>
      {orderHistory && orderHistory.length > 0 ? (
        orderHistory.map((order) => (
          <OrderCard key={order.orderID} {...order} />
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Order;
