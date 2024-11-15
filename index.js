const addCart = document.querySelectorAll(".product-button");
// const selectedCart = document.querySelectorAll(".active-button");
// const plus = document.querySelectorAll(".increment-div");
// const minus = document.querySelectorAll(".decrement-div");
// const quantity = document.querySelectorAll(".quantity");
const confirmOrder = document.querySelector(".full-cart-button");
const overlay = document.querySelector("#order-layout");
const removeOverlay = document.querySelector(".new-order");
const emptyCart = document.querySelector("#empty-cart");
const fullCart = document.querySelector("#full-cart");
const cartItem = document.querySelectorAll(".confirmed-item");
const removeItem = document.querySelectorAll(".remove-item-div");
let currentQuantity = 0;

// --------------------------Turn "add to cart" button to "active button"------------------------------------------------

for(let i=0 ; i < addCart.length ; i++) {
    addCart[i].addEventListener("click", function() {
        this.style.display="none";
    })
}


// -----------------------------------------Increment Quantity----------------------------------------------

// Select all the plus and minus buttons
const plus = document.querySelectorAll('.increment-div');
const minus = document.querySelectorAll('.decrement-div');

// Function to handle the button click (both plus and minus)
function handleQuantityChange(event) {
  // Find the parent button container
  const selectedCart = event.target.closest('.active-button');
  
  // Find the quantity paragraph within the same button container
  const quantityElement = selectedCart.querySelector('.quantity');
  
  // Get the current quantity, convert to number
  let quantity = parseInt(quantityElement.textContent);
  
  // Check if the clicked button was the plus or minus button
  if (event.target.classList.contains('increment-div') || event.target.classList.contains('increment')) {
    quantity++; // Increase the quantity
    
  } else if (event.target.classList.contains('decrement-div')) {
    if (quantity > 0) {
      quantity--; // Decrease the quantity, but don't go below 0
    }
  }
  
  // Update the quantity text
  quantityElement.textContent = quantity;
}

// Add event listeners to plus buttons
plus.forEach((button) => {
  button.addEventListener('click', handleQuantityChange);
});

// Add event listeners to minus buttons
minus.forEach((button) => {
  button.addEventListener('click', handleQuantityChange);
});

// -------------------------------------------------Decrement Quantity------------------------------------------------




// ---------------------------------------------Display Overlay----------------------------------------------------

confirmOrder.addEventListener("click", function() {

    overlay.style.display="flex";
})

// ---------------------------------------------Remove Overlay/Cart--------------------------------------------------------

removeOverlay.addEventListener("click", function() {
    emptyCart.style.display="flex";
    fullCart.style.display="none";
    window.location.reload();
})

// -------------------------------------------------Display Cart--------------------------------------------------------------

// for(i=0 ; i < plus.length ; i++) {
//     plus[i].addEventListener("click", function() {
//         emptyCart.style.display="none";
//         fullCart.style.display="flex";
//     })
// }

// --------------------------------------------------Remove Item from Cart------------------------------------------------------
// cartItem.forEach(removeItem => {

    
// };