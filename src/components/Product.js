// Product.js
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {

    return (
        <Link to={`/product/${product._id}`}>
            <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-100 hover:bg-gray-200">


                <img
                    src={product.displayImage}
                    alt={product.name}
                    className="object-cover rounded-t"
                />


                <div className="font-bold text-sm mb-1">{product.name}</div>
                <p className="text-gray-700 text-xs">Price: ${product.price}</p>

            </div>
        </Link>
    );
};

export default Product;
