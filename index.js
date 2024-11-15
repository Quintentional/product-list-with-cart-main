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
// -----------------------------------Display Cart--------------------------------
        emptyCart.style.display="none";
        fullCart.style.display="flex";
    })
}


// -----------------------------------------Increment/Decrement Quantity----------------------------------------------

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


// --------------------------------------------------Remove Item from Cart------------------------------------------------------
    removeItem.forEach((button) => {
        button.addEventListener('click',(event) => {
           const cartItem = event.target.closest('.confirmed-item');
            cartItem.style.display="none";
    
        })
    })

    // -------------------------------------------------Remove Cart if empty-----------------------------------------------------------------
    // function areAllItemsHidden(cartItem) {
   
        
    //       if (cartItem.display !== 'none') {
    //         alert("false");
    //       }
        
      
    //     alert("true");
    //   }

// --------------------------------------------------------------Increment/Decrement Quantity in Cart------------------------------------

// // Select all the plus and minus buttons on the product page
// const plusButtons = document.querySelectorAll('.plus-btn');
// const minusButtons = document.querySelectorAll('.minus-btn');

// // Function to update the cart quantity based on the product ID
// function updateCartQuantity(productId, newQuantity) {
//   const cartItem = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
//   if (cartItem) {
//     const cartQuantityElement = cartItem.querySelector('.cart-quantity');
//     cartQuantityElement.textContent = newQuantity;
//   }
// }

// // Function to handle the quantity change (both plus and minus)
// function handleQuantityChange(event) {
//   // Find the parent button container
//   const buttonContainer = event.target.closest('.add-to-cart');
  
//   // Get the product ID from the data-product-id attribute
//   const productId = buttonContainer.closest('.product').getAttribute('data-product-id');
  
//   // Find the quantity paragraph within the same button container
//   const quantityElement = buttonContainer.querySelector('.quantity');
  
//   // Get the current quantity, convert to number
//   let quantity = parseInt(quantityElement.textContent);
  
//   // Check if the clicked button was the plus or minus button
//   if (event.target.classList.contains('plus-btn')) {
//     quantity++; // Increase the quantity
//   } else if (event.target.classList.contains('minus-btn')) {
//     if (quantity > 0) {
//       quantity--; // Decrease the quantity, but don't go below 0
//     }
//   }
  
//   // Update the product quantity on the page
//   quantityElement.textContent = quantity;

//   // Update the cart quantity for the same product
//   updateCartQuantity(productId, quantity);
// }

// // Add event listeners to plus buttons
// plusButtons.forEach((button) => {
//   button.addEventListener('click', handleQuantityChange);
// });

// // Add event listeners to minus buttons
// minusButtons.forEach((button) => {
//   button.addEventListener('click', handleQuantityChange);
// });
