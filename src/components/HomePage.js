import React, { useState, useEffect } from 'react';
import Product from './Product';

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        fetchProducts();
    }, [page])

    useEffect(() => {
        //fetchProducts()
        console.log("Hello-USe")

        window.addEventListener('scroll', handleScroll);
        console.log("j")
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, page]);

    const fetchProducts = () => {
        const projectId = '3oxp02p5lcr2';
        const url = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?limit=10&page=${page}`;
        setLoading(true);

        fetch(url, {

            method: 'GET',
            headers: {
                'projectID': projectId,
            },
        })
            .then(response => response.json())
            .then(data => {
                const newProducts = data.data || [];
                setProducts(prevProducts => [...prevProducts, ...newProducts]);
                setLoading(false);

                if (newProducts.length === 0) {
                    setHasMore(false);
                }
                console.log(page);
            })

            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    };

    const handleScroll = () => {
        console.log("Hello")
        //if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {

        // return;
        // }

        setPage(page + 1);


    };
    //useEffect(() => {
    //setPage(page + 1)
    //}, [loading]);
    { console.log(page) }
    return (
        <div style={{ minHeight: '100vh', overflowY: 'auto' }}>
            <h1>Featured Products</h1>
            <div className="product-list flex flex-wrap">
                {products.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </div>

            {!loading}
            <div>{page}</div>
            {!hasMore && <p>No more products to load.</p>}
        </div>

    );
}

export default Homepage;
