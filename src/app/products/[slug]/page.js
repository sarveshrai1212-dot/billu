


import products from "@/data/products";
// import Image from "next/image";



import { notFound } from "next/navigation";

import ProductDetailClient from "./ProductDetailClient";


export default async function ProductDetailPage(props) {
  const { slug } = await props.params;
  return <ProductDetailClient slug={slug} />;
}
