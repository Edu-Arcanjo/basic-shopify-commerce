import Link from "next/link";
// import { gql } from "@apollo/client";
import React from "react";
import { gql } from "@/gql";
import { getClient } from "@/lib/client";
import { formatPrice } from "@/utils";

const productsQuery = gql(`
  query Products {
    products(first: 1) {
      edges {
        node {
          id
          title
          handle
          tags
          variants(first: 1) {
            edges {
              node {
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          featuredImage {
            url
            altText
          }
        }
      }
    }
  }
`);

export default async function Products() {
  const {
    data: { products },
  } = await getClient().query({ query: productsQuery });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.edges.map((item) => {
            const product = item.node;
            const image = product.featuredImage;

            return (
              <Link
                key={product.id}
                href={`/produtos/${product.handle}`}
                className="group relative"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={image?.url}
                    alt={image?.altText ?? product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.variants.edges[0].node.selectedOptions[1].value}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(product.priceRange.minVariantPrice.amount)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
