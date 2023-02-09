import React,{ useEffect, useState } from 'react'



import search from "../../media/search.svg"
import OrderSummary from '../orderSummary/OrderSummary'
import OrderConfrimation from '../oderConfirmation/OrderConfrimation'

import "./productTable.css"
import RowTable from './RowTable'

const ProductTable = () => {

    const [products, setProduct] = useState([]);
    const [orderedProduct, setOrderedProduct] = useState([]);
    const [isSummary, setIsSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation]=useState(false)

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:4000/products", {
          method: "Get",
          mode: "cors",
        });
    
        const newproducts = await res.json();
        setProduct(newproducts.products);
      };
      useEffect(() => {
        fetchProducts();
      }, []);


      const proceesClick=()=>{
        if(orderedProduct.length==0){
          alert("Please Select Product To Order")
        }else{
          setIsSummary(!isSummary)
        }
      }

  return (
    <div className='createOrderWrapper'>
        <div className='createOrderHeader'>
           <h4>Create Order</h4>
           <div className='searchBarContainer'>
              <img src={search} alt='Search Icon'/>
              <input/>
           </div>
        </div>
        <div className='productTableWrapper'>
           <table className='table'>
               <thead>
                   <tr>
                      <th className='TypeColumn'>Product Types</th>
                      <th className='QuantityColumn'>Quantity</th>
                      <th className='WashColumn'>Wash Type</th>
                      <th className='PriceColumn'>Price</th>
                   </tr>
               </thead>
               <tbody>
               {products.map((product) => {
                return (
                  <RowTable
                    key={product.id}
                    product={product}
                    setOrderedProduct={setOrderedProduct}
                    orderedProduct={orderedProduct}
                  />
                );
              })}
               </tbody>
           </table>
           <div className='actionBtnContainer'>
            <button>Cancel</button>
            <button onClick={()=> proceesClick()}>Proceed</button>
           </div>
            {isSummary ? <OrderSummary orderedProduct={orderedProduct} setIsSummary={setIsSummary} isSummary={isSummary} setOrderConfirmation={setOrderConfirmation} OrderConfirmation={orderConfirmation}/> : null }
            {orderConfirmation ? <OrderConfrimation/> : null }
        </div>
    </div>
  )
}

export default ProductTable