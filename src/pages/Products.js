import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../layouts/MainLayout';
import ProductsList from '../components/ProductsList';
import LoadingSpinner from '../components/LoadingSpinner';
import ReactPaginate from 'react-paginate';


export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const nextButton = (
    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
      <svg
        xmlns="./logo192.png"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </button>
  );
  const prevButton = (
    <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
      <svg
        xmlns="./logo512.png"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  );

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        console.log('list of products:', response.data);
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    /* calculations for the react paginate */

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(products.slice(itemOffset, endOffset));

    console.log('current items:', currentItems);
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, products]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="max-w-2xl mx-auto pt-16 px-4 sm:pt-24 sm:px-6 lg:max-w-7xl lg:px-8 text-center ">
      <h2 className="text-3xl font-bold tracking-tight text-indigo-600 ">
            Find Products that interest you
       </h2>
       <h2 className="text-xl tracking-tight text-gray-500  mt-4">
            Collections of Products to our store
        </h2>
        </div>

      <ProductsList products={currentItems} />
      {/* pagination component here */}

      <div className="container mx-auto flex justify-center mb-10">
        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          className="flex"
          previousLabel={prevButton}
          nextLabel={nextButton}
          pageClassName="bg-white border-gray-300 text-gray-500  hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
          activeClassName="bg-gray-300 border-gray-300 text-gray-500  hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
          renderOnZeroPageCount={null}
        />
      </div>

    </Layout>
  );
}
