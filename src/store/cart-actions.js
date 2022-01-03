import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCart = () => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch("https://react-http-request-a7926-default-rtdb.europe-west1.firebasedatabase.app/cart.json");
            if (!response.ok) {
                throw new Error("Impossible to save Cart");
            }

            const data = await response.json();
            if (data) {
                dispatch(cartActions.init({
                    items: data.items || [],
                    quantity: data.quantity
                }));
            }
        };

        sendRequest().catch((error) => {
            dispatch(
                uiActions.setNotification({
                    status: "error",
                    message: error.message,
                    title: "Error",
                })
            );
        });
    };
};

export const saveCart = (cart) => {
    return async (dispatch) => {
        console.log("save cart");
        //put the cart
        dispatch(
            uiActions.setNotification({
                status: "pending",
                message: "The cart is saving....",
                title: "Saving",
            })
        );

        const sendRequest = async (cart) => {
            const response = await fetch("https://react-http-request-a7926-default-rtdb.europe-west1.firebasedatabase.app/cart.json", {
                method: "PUT",
                body: JSON.stringify({items:cart.items, quantity: cart.quantity}),
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
        sendRequest(cart).catch((error) => {
            dispatch(
                uiActions.setNotification({
                    status: "error",
                    message: error.message,
                    title: "Error",
                })
            );
        });
    };
};
