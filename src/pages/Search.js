import React, { useEffect, useState } from 'react';
import Layout from '../layouts/MainLayout';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import Select from 'react-select';


export default function Feedback() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [options, setOptions] = useState([]);

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
    if (products) {
      const filtered = products.map(({ id, title, price, ...rest }) => {
        return { value: price, label: title };
      });
      console.log('successfully filtered users', filtered);
      setOptions(filtered);
    }
  }, [products]);

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  // make a GET req to get products

  // filter them so that each product has value, label

  // import react select

  // pass in the option (filtered array of object)

  return (
    <Layout>
    
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight  text-indigo-600 ">
          Search for Products that interest you
        </h2>
        <h2 className="text-xl tracking-tight text-gray-600  mt-4">
          Collections of our best Products
        </h2> 
        </div>

      <Select
        options={options}
        onChange={(selected) => alert(JSON.stringify(selected.label))}
      />
            <br></br><br></br>  <br></br><br></br>   <br></br><br></br>   <br></br><br></br>
            <br></br><br></br>  <br></br><br></br>   

    </Layout>
  );
}
