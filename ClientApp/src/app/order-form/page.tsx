"use client";
import React, { useState, useEffect } from "react";
import { BadgeDelta, Card, Flex, Title, Text, Metric } from "@tremor/react";
import { Order, Stock } from "../types";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const BASE_URL = "http://localhost:45953";

async function fetchAllOrders(): Promise<Order[]> {
  const response = await fetch(`${BASE_URL}/yak-shop/orders`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
}

async function placeOrder(
  order: { customer: string; order: Order },
  day: number
) {
  const response = await fetch(`http://localhost:45953/yak-shop/order/${day}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error(`Failed to place order: ${response.statusText}`);
  }

  return response.json();
}

const OrderForm: React.FC<{ stock: Stock }> = ({ stock }) => {
  const { milk = 0, skins = 0 } = stock || {};

  const [customerName, setCustomerName] = useState<string>("");
  const [milkOrder, setMilkOrder] = useState<number>(0);
  const [skinOrder, setSkinOrder] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const fetchedOrders = await fetchAllOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error(
          "An error occurred while fetching orders:",
          error.message
        );
      }
    }

    fetchOrders();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderToPlace = {
      customer: customerName,
      order: {
        milk: milkOrder,
        skins: skinOrder,
      },
    };

    try {
      await placeOrder(orderToPlace, day);
      const updatedOrders = await fetchAllOrders();
      setOrders(updatedOrders);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <>
      <main className="flex justify-center items-center min-h-full mx-auto">
        <Card className="max-w-3xl mx-auto">
          <Title className="mt-4 mb-2">Place Your Order 🛒</Title>
          <form onSubmit={handleSubmit}>
            <Flex className="mb-4">
              <Text className="truncate mr-2">Customer Name:</Text>
              <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </Flex>
            <Flex className="mb-4">
              <Text className="truncate mr-2">Milk 🥛:</Text>
              <input
                type="number"
                value={milkOrder}
                onChange={(e) => setMilkOrder(Number(e.target.value))}
              />
            </Flex>
            <Flex className="mb-4">
              <Text className="truncate mr-2">Skins 🎒:</Text>
              <input
                type="number"
                value={skinOrder}
                onChange={(e) => setSkinOrder(Number(e.target.value))}
              />
            </Flex>
            <Flex className="mb-4">
              <Text className="truncate mr-2">Order Number:</Text>
              <input
                type="number"
                placeholder="Day"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
              />
            </Flex>
            <button
              type="submit"
              className="bg-blue-500 text-white mt-4 p-2 rounded"
            >
              Place Order
            </button>
          </form>

          <Card className="mt-8">
            <Title>All Orders</Title>
            {orders.map((order, index) => (
              <Text key={index}>
                {order.customer}: Milk Ordered: {order.milkOrdered}, Skins
                Ordered: {order.skinsOrdered}
              </Text>
            ))}
          </Card>
        </Card>
      </main>
    </>
  );
};

export default OrderForm;
