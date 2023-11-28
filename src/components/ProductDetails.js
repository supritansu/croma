import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";


const ProductDetails = () => {
    console.log("I have been called")
    const product_link = "https://academics.newtonschool.co/api/v1/ecommerce/product/"
    const product_review = "https://academics.newtonschool.co/api/v1/ecommerce/review/"
    const cart_link = "https://academics.newtonschool.co/api/v1/ecommerce/cart/"
    const { pid } = useParams();
    console.log(pid)

    const [details, setdetails] = useState([]);
    const [reviews, setreviews] = useState([]);


    useEffect(() => {
        console.log("Use Effect")
        // Your code for side effects goes here
        fetchDetails()

        // It can return a cleanup function, which will be run before the component is unmounted

    }, []);
    const addCart = () => {
        console.log("Added to cart is called")
        const projectId = '3oxp02p5lcr2';
        const url = cart_link + pid;


        fetch(url, {

            method: 'POST',
            headers: {
                'projectID': projectId,
            },
            body: JSON.stringify({ "quantity": 1 }),
        })
            .then(response => response.json())
            .then(data => {
                const cartitems = data || [];

                console.log("Item added to cart", cartitems)

            })

            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    };
    const fetchDetails = () => {
        const projectId = '3oxp02p5lcr2';
        const url = product_link + pid;
        console.log(url)

        fetch(url, {

            method: 'GET',
            headers: {
                'projectID': projectId,
            },
        })
            .then(response => response.json())
            .then(data => {
                const newdetails = data.data || [];
                setdetails(newdetails)
                console.log(newdetails)

            })

            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const fetchReview = () => {
        console.log("Fethreview called")
        const projectId = '3oxp02p5lcr2';
        const url = product_review + pid;


        fetch(url, {

            method: 'GET',
            headers: {
                'projectID': projectId,
            },
        })
            .then(response => response.json())
            .then(data => {
                const newreviews = data.data || [];
                setreviews(newreviews)
                console.log(newreviews)

            })

            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    };

    const addReview = () => {
        console.log("Fethreview called")
        const projectId = '3oxp02p5lcr2';
        const url = product_review + pid;


        fetch(url, {

            method: 'POST',
            headers: {
                'projectID': projectId,
            },
        })
            .then(response => response.json())
            .then(data => {
                const newreviews = data.data || [];
                setreviews(newreviews)
                console.log(newreviews)

            })

            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    };
    if (details.length <= 0) {
        return <p>Loading</p>
    }
    else {
        return (
            <div>
                <img src={details.displayImage} alt={details.name} />

                <h1 className="text-2xl font-bold mt-4 mb-2">{details.name}</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={fetchReview}
                >
                    Fetch Reviews
                </button>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={addCart}
                >
                    Add to Cart
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Remove from Cart
                </button>

                {reviews.length > 0 && (
                    <div className="mt-4">
                        {reviews.map(review => (
                            <Review key={review._id} props={review} />
                        ))}
                    </div>
                )}
            </div>
        );
    }
}
export default ProductDetails;