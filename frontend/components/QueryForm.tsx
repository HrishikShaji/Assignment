"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import RangeSlider from "./RangeSlider";

interface Product {
  asin: string;
  thumbnail: string;
  title: string;
  price: {
    current_price: number;
    currency: string;
  };
}

const QueryForm = () => {
  const [keyword, setKeyword] = useState(String);
  const [products, setProducts] = useState<Product[]>([]);
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(1500);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    filterProducts();
  }, [products, minValue, maxValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(keyword);
    const response = await axios.get<{ result: Product[] }>(
      `http://localhost:4000/api/getUser/?keyword=${keyword}`
    );
    console.log(response.data.result);
    setProducts(response?.data?.result);
  };

  const filterProducts = () => {
    const filtered = products.filter(
      (product) =>
        product.price.current_price >= minValue &&
        product.price.current_price <= maxValue
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="flex relative flex-col items-center justify-between gap-10 ">
      <div className="fixed top-0 p-10 flex flex-col gap-4 z-20 items-center bg-black text-white w-full">
        <form
          onSubmit={handleSubmit}
          className="  flex-col items-center flex gap-4"
        >
          <input
            name="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. macbook air m1"
            className="p-2 rounded-md"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-white text-black rounded-md"
          >
            Search
          </button>
        </form>
        <RangeSlider
          minValue={minValue}
          setMinValue={setMinValue}
          maxValue={maxValue}
          setMaxValue={setMaxValue}
        />
      </div>
      <div className="flex flex-col gap-2 pt-[300px]">
        {filteredProducts.map((product) => (
          <div
            key={product.asin}
            className=" flex rounded-md justify-center gap-4 bg-white p-5"
          >
            <div className="h-[150px] w-[150px] object-cover">
              <Image
                src={product.thumbnail}
                className="w-full h-full object-contain"
                height={1000}
                width={1000}
                alt="image"
              />
            </div>
            <div className="w-[400px] flex flex-col justify-start gap-2">
              <h1>{product.title}</h1>
              <h1 className="font-bold">
                {product.price.current_price} {product.price.currency}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryForm;
