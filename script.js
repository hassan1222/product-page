    import product from './Assets/product.js';

    const productName = document.getElementById('product-name');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const quantityDropdown = document.getElementById('quantity');
    const notification = document.getElementById('notification');
    const cartIcon = document.querySelector('.cart-container');
    const cartCountElement = document.querySelector('.cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPrice = document.getElementById('cart-total-price');

    let cart = []; // Array to store cart items
    let cartCount = 0; // To track the number of items in the cart

    productName.textContent = product.name;
    productDescription.textContent = product.description;

    // Set the price based on the selected quantity
    const updatePrice = () => {
        const quantity = parseInt(quantityDropdown.value);
        const basePrice = parseInt(product.price);
        productPrice.textContent = `RS ${quantity * basePrice}`;
    };

    quantityDropdown.addEventListener('change', updatePrice);
    updatePrice(); // Initialize the price based on the default selected option

    // Set the first image as the featured image
    const featuredImage = document.getElementById('featured-image');
    featuredImage.src = `Assets/${product.images[0]}`;

    // Add other images to the product gallery and add click event
    const imagesContainer = document.getElementById('product-images');
    product.images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `Assets/${image}`;
        imgElement.alt = 'Comfort Image';
        imgElement.classList.add('thumbnail');
        
        // Add click event to update featured image
        imgElement.addEventListener('click', () => {
            featuredImage.src = `Assets/${image}`;
        });

        imagesContainer.appendChild(imgElement);
    });

    // Add to Cart Button functionality
   // Add to Cart Button functionality
document.getElementById('add-to-cart').addEventListener('click', () => {
    const quantity = parseInt(quantityDropdown.value);
    const basePrice = parseInt(product.price);
    const item = {
        name: product.name,
        price: basePrice,
        quantity: quantity,
        totalPrice: quantity * basePrice,
        image: featuredImage.src
    };

    // Add the item to the cart array
    cart.push(item);
    cartCount += 1; // Update cart count to be 1

    // Update cart count display
    cartCountElement.textContent = cartCount;

    // Show sliding notification
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // Hide after 3 seconds
});

    // Function to update the cart modal content
    const updateCartModal = () => {
        // Clear the current items in the modal
        cartItemsContainer.innerHTML = '';

        let total = 0;

        // Populate the modal with cart items
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p>RS ${item.price} x ${item.quantity}</p>
                    <p>Total: RS ${item.totalPrice}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);

            // Calculate the total price of the cart
            total += item.totalPrice;
        });

        // Update the total price in the modal
        cartTotalPrice.textContent = `RS ${total}`;
    };

    // Show the cart modal when the cart icon is clicked
    cartIcon.addEventListener('click', () => {
        updateCartModal();
        cartModal.classList.toggle('show');
    });

