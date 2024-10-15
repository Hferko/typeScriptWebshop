export default interface IProduct {
  id: number | string;
  title: string;  
  category: string;
  thumbnail: string;
  price: number;
  stock: number;
  description: string;
  addCartGomb: NodeListOf<HTMLButtonElement>;
}

