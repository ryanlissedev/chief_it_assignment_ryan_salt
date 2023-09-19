export type YakData = {
  name: string;
  age: number;
  ageLastShaved: number;
};

export type Order = {
  customer: string;
  milk: number;
  skins: number;
};

export type Stock = {
  milk: number;
  skins: number;
};

export type HerdResponse = {
  herd: YakData[];
};

export type Toast = {
  title: string;
  status: string; // Add this line
  duration: number;
  isClosable: boolean;
};