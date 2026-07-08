// 1. THE FOOD DATABASE
const foodItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99, category: "Pizza", veg: true, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Classic Cheeseburger", price: 8.99, category: "Burgers", veg: false, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Garden Fresh Salad", price: 7.49, category: "Salads", veg: true, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80" }
];

// 2. THE SHOPPING CART STATE
let cart = [];

// 3. FUNCTION TO SHOW FOOD ON THE SCREEN
function displayMenu() {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;

    menuGrid.innerHTML = '';

    foodItems.forEach(item => {
        const card = document.createElement('div');
        card.style.border = "1px solid #2D1B12";
        card.style.borderRadius = "8px";
        card.style.padding = "15px";
        card.style.margin = "15px 0";
        card.style.backgroundColor = "#FFFFFF";

        card.innerHTML = `
            <img src="${item.img}" alt="${item.name}" style="width:100%; max-width:200px; border-radius:5px;">
            <h3>${item.name} ${item.veg ? '🌱' : '🥩'}</h3>
            <p>Price: $${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuGrid.appendChild(card);
    });
}

// 4. FUNCTION TO ADD ITEMS TO THE CART
function addToCart(itemId) {
    const selectedItem = foodItems.find(item => item.id === itemId);
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...selectedItem, quantity: 1 });
    }

    updateCartDisplay();
}

// 5. FUNCTION TO UPDATE THE CART UI
function updateCartDisplay() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;

    const cartList = document.getElementById('cart-items-list');
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is currently empty.</p>';
        return;
    }

    cartList.innerHTML = '';
    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const cartItemRow = document.createElement('p');
        cartItemRow.innerText = `${item.name} x${item.quantity} - $${itemTotal.toFixed(2)}`;
        cartList.appendChild(cartItemRow);
    });

    const totalRow = document.createElement('h3');
    totalRow.innerText = `Total: $${grandTotal.toFixed(2)}`;
    cartList.appendChild(totalRow);
}

// 6. FUNCTION FOR SIMULATED CHECKOUT
function handleCheckout(event) {
    event.preventDefault(); // Stops page from reloading

    if (cart.length === 0) {
        alert("Your cart is empty! Add some delicious food before checking out.");
        return;
    }

    alert("🎉 Order placed successfully! Your food is being prepared. (Simulated)");
    
    cart = [];
    updateCartDisplay();
    event.target.reset(); // Clears the address text box
}

// 7. RUN EVERYTHING CLEANLY WHEN THE PAGE LOADS
window.onload = function() {
    displayMenu();

    const checkoutForm = document.querySelector('#checkout form');
    if (checkoutForm) {
        checkoutForm.onsubmit = handleCheckout;
    }
};