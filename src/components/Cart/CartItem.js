import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { product, quantity, total } = props.item;

  const dispatch = useDispatch();

  const increment = () => {
    dispatch(cartActions.increment({ product, quantity}));
  }

   const decrement = () => {
       dispatch(cartActions.decrement({ product, quantity }));
   };

  return (
      <li className={classes.item}>
          <header>
              <h3>{product.title} Item</h3>
              <div className={classes.price}>
                  ${total.toFixed(2)} <span className={classes.itemprice}>(${product.price.toFixed(2)}/item)</span>
              </div>
          </header>
          <div className={classes.details}>
              <div className={classes.quantity}>
                  x <span>{quantity}</span>
              </div>
              <div className={classes.actions}>
                  <button onClick={decrement}>-</button>
                  <button onClick={increment}>+</button>
              </div>
          </div>
      </li>
  );
};

export default CartItem;
