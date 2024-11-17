const addCart = document.querySelectorAll(".product-button");
const confirmOrder = document.querySelector(".full-cart-button");
const overlay = document.querySelector("#order-layout");
const removeOverlay = document.querySelector(".new-order");
const emptyCart = document.querySelector("#empty-cart");
const fullCart = document.querySelector("#full-cart");
const removeItem = document.querySelectorAll(".remove-item-div");


// --------------------------Turn "add to cart" button to "active button"------------------------------------------------

for (let i = 0; i < addCart.length; i++) {
  addCart[i].addEventListener("click", function () {
    // Hide the initial "add to cart" button
    this.style.display = "none";

    // Get the product ID
    const productId = this.closest('.layout-product').getAttribute('data-product-id');

    // Set the initial quantity to 1
    const activeButton = this.closest('.layout-product').querySelector('.active-button');
    const quantityElement = activeButton.querySelector('.quantity');
    quantityElement.textContent = "1";

    // Add border around selected item
    const layoutImage = this.closest('.layout-product').querySelector('.product-img');
    layoutImage.style.borderStyle="solid";
    layoutImage.style.borderSize="2px";
    layoutImage.style.borderColor="red";

    // Display the active version of the button (with plus, minus, and quantity)
    activeButton.style.display = "flex";

    // Display the cart if it was hidden
    emptyCart.style.display = "none";
    fullCart.style.display = "flex";

    // Show the cart item in the cart (make it visible)
    const cartItem = document.querySelector(`.confirmed-item[data-product-id="${productId}"]`);
    const overlayItem = document.querySelector(`.product-confirmed[data-product-id="${productId}"]`);
    cartItem.style.display = "flex";
    overlayItem.style.display = "flex";

    // Update the cart quantity and total for the initial click
    updateCartQuantity(productId, 1);
  });
}


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

// Function to handle removing an item from the cart
removeItem.forEach((button) => {
  button.addEventListener('click', (event) => {
    // Get the cart item element
    const cartItem = event.target.closest('.confirmed-item');
    const productId = cartItem.getAttribute('data-product-id');

    // Get the corresponding product element on the page
    const productElement = document.querySelector(`.layout-product[data-product-id="${productId}"]`);

    // Check if the product element exists
    if (!productElement) {
      console.error(`Product element with ID ${productId} not found.`);
      return;
    }

    // Try to get the active button (which contains quantity) for this product
    const activeButton = productElement.querySelector('.active-button');
    const productButton = productElement.querySelector('.product-button');

    // If active button exists, update quantity and hide it
    if (activeButton) {
      const quantityElement = activeButton.querySelector('.quantity');
      if (quantityElement) {
        // Set the quantity to 0 for this product in the active button
        quantityElement.textContent = '0';
        updateCartQuantity(productId, 0);  // Update cart and overlay quantity to 0
      } else {
        console.error(`Quantity element not found within active button for product ID ${productId}.`);
      }
      // Hide the active button after removal
      activeButton.style.display = 'none';
    }

    // Reset the "Add to Cart" button to show again
    if (productButton) {
      productButton.style.display = 'flex';
    }

    // Remove border from product image
    const layoutImage = productElement.closest('.layout-product').querySelector('.product-img');
    layoutImage.style.border='none';

    // Hide the cart item
    cartItem.style.display = 'none';

    // Recalculate the cart total after removal
    calculateCartTotal();
  });
});




// --------------------------------------------------------------Increment/Decrement Quantity/Price in Cart/Overlay------------------------------------

// // Select all the plus and minus buttons on the product page
const plus = document.querySelectorAll('.increment-div');
const minus = document.querySelectorAll('.decrement-div');

// // Function to update the cart and overlay quantity based on the product ID
function updateCartQuantity(productId, newQuantity) {
  const cartItem = document.querySelector(`.confirmed-item[data-product-id="${productId}"]`);
  const overlayItem = document.querySelector(`.product-confirmed[data-product-id="${productId}"]`);
  if (cartItem || overlayItem) {
    const cartQuantityElement = cartItem.querySelector('.confirmed-quantity');
    const overlayQuantityElement = overlayItem.querySelector('.confirmed-quantity');
    cartQuantityElement.textContent = parseInt(newQuantity) + "x";
    overlayQuantityElement.textContent = parseInt(newQuantity) + "x";

        // Get the unit price from a hidden element or attribute
        const unitPrice = parseFloat(cartItem.querySelector('.confirmed-price').textContent);
    
        // Calculate the total cost based on the new quantity
        const totalCost = (newQuantity * unitPrice).toFixed(2);
    
        // Update the total cost in the cart and overlay
        const cartItemCostElement = cartItem.querySelector('.cart-item-total');
        const overlayItemCostElement = overlayItem.querySelector('.product-confirmed-price');
    
        cartItemCostElement.textContent = `${totalCost}`;
        overlayItemCostElement.textContent = `${totalCost}`;

            // Show or hide the cart item based on the quantity and remove border if "0"
         const layoutProduct = document.querySelector(`.layout-product[data-product-id="${productId}"]`);
         const productImage = layoutProduct.querySelector('.product-img');
    if (newQuantity > 0) {
      cartItem.style.display = 'flex';
      overlayItem.style.display = 'flex';
    } else {
      cartItem.style.display = 'none';
      overlayItem.style.display = 'none';
      productImage.style.border = 'none';
    }

            // Recalculate and update the cart total
    calculateCartTotal();
  }
}

// -----------------------------------------------------------Update Cart/Overlay Total------------------------------------------------------------

// Function to calculate the total cost of all items in the cart
function calculateCartTotal() {
  let cartTotal = 0;

  // Select only the confirmed cart items (not overlay items)
  const cartItems = document.querySelectorAll('.confirmed-item');

  cartItems.forEach((item) => {
    // Get the unit price
    const unitPrice = parseFloat(item.querySelector('.confirmed-price').textContent);

    // Get the quantity and ensure it's parsed correctly
    const quantityText = item.querySelector('.confirmed-quantity').textContent;
    const quantity = parseInt(quantityText.replace(/\D/g, '')); // Removes any non-digit characters

    // Skip this item if the quantity is 0
    if (isNaN(quantity) || quantity === 0) {
      return;
    }

    // Calculate the total for this item and add it to the cart total
    const itemTotal = unitPrice * quantity;
    cartTotal += itemTotal;
  });

  // Display the cart total in both the cart and the overlay
  const cartTotalElement = document.querySelector('.order-total-cost');
  const overlayTotalElement = document.querySelector('.total-price');

  cartTotalElement.textContent = `${cartTotal.toFixed(2)}`;
  overlayTotalElement.textContent = `${cartTotal.toFixed(2)}`;


  // ----------------------------Change to Empty Cart image if cart is empty-----------------------------------------------

  if(cartTotalElement.textContent == 0) {
    fullCart.style.display="none";
    emptyCart.style.display="flex";
  }else {
    fullCart.style.display="flex";
    emptyCart.style.display="none";
  }
}


// // Function to handle the quantity change (both plus and minus)
function handleQuantityChange(event) {
  // Find the parent button container
  const selectedCart = event.target.closest('.active-button');
  
//   // Get the product ID from the data-product-id attribute
  const productId = selectedCart.closest('.product').getAttribute('data-product-id');
  
//   // Find the quantity paragraph within the same button container
  const quantityElement = selectedCart.querySelector('.quantity');
  
//   // Get the current quantity, convert to number
  let quantity = parseInt(quantityElement.textContent);
  
//   // Check if the clicked button was the plus or minus button
  if (event.target.classList.contains('increment-div')) {
    quantity++; // Increase the quantity
  } else if (event.target.classList.contains('decrement-div')) {
    if (quantity > 0) {
      quantity--; // Decrease the quantity, but don't go below 0
    }
  }
  
//   // Update the product quantity on the page
  quantityElement.textContent = quantity;

//   // Update the cart quantity for the same product
  updateCartQuantity(productId, quantity);

    // Handle button display based on quantity
    const productButton = selectedCart.closest('.product').querySelector('.product-button');

    if (quantity === 0) {
      // Show the "add to cart" button
      productButton.style.display = 'flex';
    }
}


// // Add event listeners to plus buttons
plus.forEach((button) => {
  button.addEventListener('click', handleQuantityChange,
  );
});

// // Add event listeners to minus buttons
minus.forEach((button) => {
  button.addEventListener('click', handleQuantityChange);
});







