"use client";
import React, { useState } from "react";
import { Order, Stock } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const BASE_URL = "http://localhost:45953";

const placeOrder = async (
  order: { customer: string; order: Order },
  day: number
) => {
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
};

const OrderForm: React.FC<{ stock: Stock }> = ({ stock }) => {
  const { milk = 0, skins = 0 } = stock || {};

  const [customerName, setCustomerName] = useState<string>("");
  const [milkOrder, setMilkOrder] = useState<number>(0);
  const [skinOrder, setSkinOrder] = useState<number>(0);
  const [day, setDay] = useState<number>(0); // Add state for day
  const { toast } = useToast();

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
      const response = await placeOrder(orderToPlace, day);
      toast({
        title: "Order placed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="container w-1/3 justify-center items-center min-h-screen mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Place Your Order 🛒</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <OrderInput label="Milk 🥛" value={milkOrder} onChange={setMilkOrder} />
        <OrderInput
          label="Skins 🎒"
          value={skinOrder}
          onChange={setSkinOrder}
        />
        <Input
          type="number"
          label="Order Number"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white  mt-4 p-2 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

type OrderInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const OrderInput: React.FC<OrderInputProps> = ({ label, value, onChange }) => (
  <div className="mb-4">
    <label className="block mb-2">{label}</label>
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </div>
);

export default OrderForm;
