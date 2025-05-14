export interface SimplePokemon {
    id:   string;
    name: string;
  }


  export interface PokemonsReponse {
    count: number;
    next: string;
    previous: null;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export interface ProductoItem{
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}