import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCart, saveCart } from "./store/cart-actions";

function App() {
    const showCart = useSelector((state) => state.ui.showCart);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch])

    useEffect(() => {
        if(cart.changed){
            dispatch(saveCart(cart));
        }
        
    }, [cart, dispatch]);
    return (
        <>
            {notification && <Notification
                    title={notification.title} 
                    status={notification.status} 
                    message={notification.message}/>}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
