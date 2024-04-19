import React from "react";
import { useEffect } from "react";
import { fetchProducts } from "../state/Action-creator";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts.products.data);
  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div>
        <div className="mx-auto p-5 mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allProducts?.products?.map((item, index) => (
              <div key={index}>
                <div className="bg-white p-4 shadow-md">
                  <div className="flex">
                    <div className="pl-2">
                      <h2 className="text-xl font-bold text-[#4c5d6f]">
                        Title : {item.title}
                      </h2>
                      <p className="text-blue-600 font-semibold mt-2">
                        Description :{item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
