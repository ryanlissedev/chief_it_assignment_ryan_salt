"use client";
"use client";
import {
  BadgeDelta,
  Card,
  CategoryBar,
  Flex,
  Grid,
  Title,
  Text,
  NumberInput,
  Button,
  List,
  ListItem,
} from "@tremor/react";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { APIError, HerdResponse, StockResponse } from "../../../types";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

async function fetchYak(days: number): Promise<HerdResponse> {
  const res = await axios.get(`${BASE_URL}/yak-shop/herd/${days}`);

  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  return res.data;
}

async function fetchStockData(days: number): Promise<StockResponse> {
  const res = await axios.get(`${BASE_URL}/yak-shop/stock/${days}`);
  if (res.status !== 200) {
    throw new Error(res.data.message);
  }
  return res.data;
}

export default function NewView(): JSX.Element {
  const daysRef = useRef<number>(13); // default to 13 days

  const { data: herdResponse, refetch: refetchHerd } = useQuery(
    ["herd", daysRef.current],
    () => fetchYak(daysRef.current),
    { enabled: false }
  );

  const { data: stockResponse, refetch: refetchStock } = useQuery(
    ["stock", daysRef.current],
    () => fetchStockData(daysRef.current),
    { enabled: false }
  );

  const fetchData = async () => {
    await refetchHerd();
    await refetchStock();
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <Title>Welcome to the Yak Shop! 🐄</Title>
        <Flex justifyContent="between" alignItems="center" className="mb-4">
          <NumberInput
            defaultValue={daysRef.current}
            onChange={(e) => {
              daysRef.current = Number(e.target.value);
            }}
            placeholder="Enter days..."
          />
          <Button onClick={fetchData}>Check Stock 📦</Button>
        </Flex>
      </Card>

      {herdResponse && (
        <Card className="mb-4">
          <Title>Herd Overview 🐮</Title>
          <List>
            {herdResponse.herd.map((yak) => (
              <ListItem key={yak.name}>
                {yak.name} is {yak.age.toFixed(2)} years old and last shaved at
                age{" "}
                {yak.ageLastShaved
                  ? yak.ageLastShaved.toFixed(2)
                  : "Not shaved yet"}
              </ListItem>
            ))}
          </List>
        </Card>
      )}

      {stockResponse && (
        <Card>
          <Title>Stock Overview 📦</Title>
          <List>
            <ListItem>Milk: {stockResponse.milk.toFixed(2)} liters 🥛</ListItem>
            <ListItem>Skins: {stockResponse.skins} pieces 🎒</ListItem>
          </List>
        </Card>
      )}
    </div>
  );
}
