import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';

export default function MyOrder() {
    const [orders, setOrders] = useState({});

    useEffect(() => {
        // Fetch data from backend when component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const userEmail = localStorage.getItem('Useremail');
            const response = await axios.get(`http://localhost:5001/api/Myorders?email=${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response data:', response.data);
            // console.log("email",response.data.orderData.email)
            setOrders(response.data.orderData); // Assuming response.data is an object with an 'orderData' property
        } catch (error) {
            console.error('Error fetching orders', error);
        }
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <h1>Orders</h1>
                <div>
                    <h2>Email: {orders.email}</h2>
                    <ul>
                        {orders.order_data && orders.order_data.map((order, index) => (
                            <li key={index}>
                                {/* <p>Name: {order['0'].name}</p>
                                <p>Quantity: {order['0'].qty}</p>
                                <p>Size: {order['0'].size}</p>
                                <p>Price: {order['0'].price}</p> */}
                                <p>Order Date: {order.Order_date}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}
