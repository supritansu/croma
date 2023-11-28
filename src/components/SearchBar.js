import React, { useState } from 'react';
import Product from './Product';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?search={"name":"${searchTerm}"}`,
                {
                    headers: {
                        'projectID': '3oxp02p5lcr2',
                    },
                }
            );
            const data = await response.json();
            console.log(data)
            setSearchResults(data.data);
        } catch (error) {
            console.error('Error searching for products:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {console.log(searchResults)}
            {searchResults.length > 0 &&

                <div className="flex flex-wrap">
                    {searchResults.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>}
        </div>
    );

};

export default SearchBar;
