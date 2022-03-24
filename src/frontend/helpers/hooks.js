export function useLocalStorage() {
  const data = JSON.parse(localStorage.getItem('userData'));
  if (data) {
    const { email, password, cart, wishlist } = data;
    const storedToken = localStorage.getItem('token');
    return {
      storedEmail: email,
      storedPassword: password,
      storedCart: cart,
      storedWishlist: wishlist,
      storedToken
    };
  } else {
    return;
  }
}
