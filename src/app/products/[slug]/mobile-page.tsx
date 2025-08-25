import products from "@/data/products";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const MobileProductDetail = dynamic(() => import("@/components/mobile/MobileProductDetail"), { ssr: false });

export default async function MobileProductDetailPage(props) {
  const { slug } = await props.params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return notFound();
  return <MobileProductDetail product={product} />;
}
