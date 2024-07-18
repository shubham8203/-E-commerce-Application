import React, { createContext, useEffect, useState } from "react";






export const shopcontext = createContext();

const ShopProvider = (props) => {
    const [cartItems, setcartItems] = useState({});
    const [all_product, setall_product] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts').then((res) => (res.json())).then((data) => (setall_product(data)));
        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/cart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: "",

            }).then((res) => (res.json())).then((data) => setcartItems(data))
        }
        else alert("Please Login First");
    }, [])


    const addToCart = (id) => {

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: id }),

            }).then((res) => (res.json())).then((resdata) => { setcartItems(resdata.data) })




        }
        else alert("Login First");

        console.log(cartItems);
    }

    const removeFromCart = (id) => {

        if (localStorage.getItem('token')) {
            fetch('http://localhost:4000/delete', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: id }),

            }).then((res) => (res.json())).then((resdata) => ( setcartItems(resdata) ))




        }
        else alert("Login First");

    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((i) => (i.id === Number(item)));
                totalAmount += (itemInfo.new_price * cartItems[item]);
            }
        }
        return totalAmount;
    }

    const getTotalItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }
    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalItems };
    return (
        <shopcontext.Provider value={contextValue}>
            {props.children}
        </shopcontext.Provider>
    )

}
export default ShopProvider;

