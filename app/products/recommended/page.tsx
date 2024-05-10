import Header from "@/app/_components/header";
import ProductList from "@/app/_components/product-list";
import { db } from "@/app/_lib/prisma";

const RecommendedOrders = async () => {
  const categories = await db.category.findMany({
    include: {
      product: {
        include: {
          restaurant: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className="py-6">
        <h2 className="mb-6 px-5 text-lg font-semibold">
          Produtos Recomendados
        </h2>

        <div className="flex w-full flex-col gap-6">
          {categories.map((category) => (
            <div className="mt-6 space-y-4" key={category.id}>
              <h2 className="px-5 font-semibold">{category.name}</h2>
              <ProductList products={category.product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedOrders;
