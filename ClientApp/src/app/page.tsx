import {
  BadgeDelta,
  Card,
  CategoryBar,
  Flex,
  Grid,
  Title,
  Metric,
  Text,
} from "@tremor/react";
import { HerdResponse, Stock } from "./types";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const BASE_URL = "http://localhost:45953";

async function fetchYakData(): Promise<HerdResponse> {
  const res = await fetch(`${BASE_URL}/yak-shop/herd/13`);

  if (!res.ok) {
    throw new Error("Failed to fetch yak data");
  }

  return res.json();
}

async function fetchStockData(): Promise<Stock> {
  const res = await fetch(`${BASE_URL}/yak-shop/stock/13`);

  if (!res.ok) {
    throw new Error("Failed to fetch stock data");
  }

  return res.json();
}

export default async function Home(): Promise<JSX.Element> {
  let yakData: HerdResponse = { herd: [] };
  let stock: Stock = { milk: 0, skins: 0 };

  try {
    yakData = await fetchYakData();
    stock = await fetchStockData();
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }

  if (!yakData.herd || yakData.herd.length === 0) {
    return <div>No yak data available.</div>;
  }

  return (
    <>
      <main className="flex justify-center items-center min-h-full mx-auto">
        <Card className="max-w-3xl mx-auto">
          <h2 className="text-xl mt-4 mb-2">Stock Overview:</h2>

          <Card>
            <Flex>
              <Text className="truncate">Overall Performance Score</Text>
              <BadgeDelta deltaType="moderateIncrease">
                {yakData.herd.length} Yaks
              </BadgeDelta>
            </Flex>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-1"
            >
              <Metric> {stock.milk.toFixed(2)} </Metric>
              <Text>liters 🥛</Text>
            </Flex>
            <CategoryBar
              values={[10, 25, 45, 20]}
              colors={["emerald", "yellow", "orange", "red"]}
              markerValue={65}
              tooltip="65%"
              className="mt-2"
            />
          </Card>
          <Grid numItemsSm={2} className="mt-4 gap-4">
            {yakData.herd.map((yak, index) => (
              <Card key={index}>
                <Title>🐮 YakName: {yak.name}</Title>
                <Text>Age Last shaved: {yak.ageLastShaved.toFixed(2)}</Text>
                <Text>Yak Age: {yak.age.toFixed(2)}</Text>
              </Card>
            ))}
          </Grid>
        </Card>
      </main>
    </>
  );
}
