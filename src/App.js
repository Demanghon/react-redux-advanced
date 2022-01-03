import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { uiActions } from "./store/ui-slice";

let cartInitialized = false;

function App() {
    const showCart = useSelector((state) => state.ui.showCart);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        if(!cartInitialized){
            cartInitialized = true;
            return;
        }
        //put the cart
        dispatch(
            uiActions.setNotification({
                status: "pending",
                message: "The cart is saving....",
                title: "Saving",
            })
        );
        const addCart = async (cart) => {
            const response = await fetch("https://react-http-request-a7926-default-rtdb.europe-west1.firebasedatabase.app/cart.json", {
                method: "PUT",
                body: JSON.stringify(cart),
            });
            if (!response.ok) {
                throw new Error("Impossible to save Cart");
            }
            dispatch(
                uiActions.setNotification({
                    status: "success",
                    message: "The cart is saved",
                    title: "Success",
                })
            );
        };
        addCart(cart).catch((error) => {
            dispatch(
                uiActions.setNotification({
                    status: "error",
                    message: error.message,
                    title: "Error",
                })
            );
        });
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
