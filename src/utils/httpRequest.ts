import IProduct from "../interfaces/IProduct";

const url1 = "https://dummyjson.com/products/category/smartphones";
const url2 = "https://dummyjson.com/products/category/laptops";

async function fetchData(url1: string, url2:string): Promise<IProduct[]> {
  try {
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);

    if (!response1.ok ) {
      throw new Error(`HTTP error! status: ${response1.status}`);
    }
    if (!response2.ok ) {
      throw new Error(`HTTP error! status: ${response2.status}`);
    }
    const data1 = await response1.json()
    const data2 = await response2.json()
    const gadgets: IProduct[] = data1.products.concat(data2.products);
    
    console.log(gadgets);
    return gadgets;
  } 
  catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Valami gáz van";
    console.log(errorMsg);
    return [];
  }
}
const items =  await getData(url1, url2)
export const gadgets = [...items];

