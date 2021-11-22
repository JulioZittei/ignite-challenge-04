interface FoodResponse {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

type FoodInput = Omit<FoodResponse, 'id' | 'available'>;

export type { FoodResponse, FoodInput };
