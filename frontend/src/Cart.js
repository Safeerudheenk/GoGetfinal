import React, { useEffect } from 'react';
import './Cart.css';
import { addToCart, removeFromCart } from './actions/cartActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import { CART_EMPTY } from './constants/cartConstants';

function Cart(props) {
  const proId = props.match.params.id
  const quantity = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (proId) {
      dispatch(addToCart(proId, quantity));
    }
  }, [dispatch, proId, quantity]);

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const clearCartHandler = (e) => {
    e.preventDefault();
    dispatch({ type: CART_EMPTY });
  }

  if (cartItems && cartItems.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
        <Link to="/" >
          <p className="home__link" >Go Shopping</p>
        </Link>
      </section>
    )
  }

  return (
    <>
      <Header />

      <section className="cart">
        <Link to="/">
          <p className="btn" >back to home</p>
        </Link>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
        </header>
        {/* cart items */}
        <article>
          {cartItems.map(item => {
            return (<div className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <h4 className="item-price">Rs{item.price}</h4>
                {/* remove button */}
              </div>
              {/* <div>
    <select className="select"
        value={item.quantity}
         onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))} >                      
        <option>1</option>
        <option>2</option>
        <option>3</option>         
        </select>
    </div> */}
              <button
                onClick={() => removeItemHandler(item.product)}
                className="remove-btn" >
                remove
      </button>
            </div>
            )
          })}
        </article>
        {/* cart footer */}
        <footer>
          <hr />
          <div className="cart-total">
            <h4>
              total <span>${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</span>
            </h4>
          </div>
          <button
            onClick={clearCartHandler}
            className="clear__cart"
          >
            clear cart
        </button>
          <div className="cart__checkoutBox" >
            <p><strong>Total Price    ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</strong></p>
            <Link to="/shipping" >
              <button>Proceed to Checkout</button>
            </Link>
          </div>
        </footer>
      </section>
    </>

  )

}

export default Cart
