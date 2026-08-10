(function () {
    const STORAGE_KEY = 'clarity-cart';
    const cartButton = document.querySelector('.carrinho');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartItems = document.getElementById('cart-items');

    if (!cartButton) {
        return;
    }

    function createCartDrawer() {
        if (document.getElementById('cart-drawer')) {
            return;
        }

        const drawer = document.createElement('aside');
        drawer.id = 'cart-drawer';
        drawer.className = 'cart-drawer';
        drawer.setAttribute('aria-label', 'Carrinho de compras');
        drawer.innerHTML = `
            <div class="cart-drawer__overlay"></div>
            <div class="cart-drawer__panel">
                <div class="cart-drawer__header">
                    <h2>Seu carrinho</h2>
                    <button class="cart-close-btn" type="button" aria-label="Fechar carrinho">×</button>
                </div>
                <div id="cart-items" class="cart-items"></div>
                <div class="cart-drawer__footer">
                    <div class="cart-total">
                        <span>Total</span>
                        <strong id="cart-total-price">R$ 0,00</strong>
                    </div>
                    <button class="cart-checkout-btn" type="button">Finalizar compra</button>
                </div>
            </div>
        `;

        document.body.appendChild(drawer);
    }

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (error) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    function parsePrice(value) {
        if (!value) {
            return 0;
        }

        const cleaned = value.replace('R$', '').replace('.', '').replace(',', '.').trim();
        const parsed = Number.parseFloat(cleaned);
        return Number.isNaN(parsed) ? 0 : parsed;
    }

    function getProductId(name) {
        return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    }

    function addBadge() {
        if (cartButton.querySelector('.cart-count')) {
            return cartButton.querySelector('.cart-count');
        }

        const badge = document.createElement('span');
        badge.className = 'cart-count';
        badge.textContent = '0';
        cartButton.appendChild(badge);
        return badge;
    }

    const badge = addBadge();

    function updateCartCount(cart) {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    function renderCart() {
        const cart = getCart();
        const itemsContainer = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('cart-total-price');

        if (!itemsContainer || !totalPriceElement) {
            return;
        }

        if (!cart.length) {
            itemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
            totalPriceElement.textContent = formatCurrency(0);
            updateCartCount(cart);
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = formatCurrency(total);

        itemsContainer.innerHTML = cart.map(item => `
            <article class="cart-item">
                <img src="${item.image}" alt="${item.name}" />
                <div class="cart-item__content">
                    <div class="cart-item__top">
                        <h3>${item.name}</h3>
                        <button class="cart-remove-btn" type="button" data-action="remove" data-id="${item.id}">Remover</button>
                    </div>
                    <p>${item.description}</p>
                    <div class="cart-item__footer">
                        <div class="cart-quantity">
                            <button class="cart-qty-btn" type="button" data-action="decrease" data-id="${item.id}">−</button>
                            <span>${item.quantity}</span>
                            <button class="cart-qty-btn" type="button" data-action="increase" data-id="${item.id}">+</button>
                        </div>
                        <strong>${formatCurrency(item.price * item.quantity)}</strong>
                    </div>
                </div>
            </article>
        `).join('');

        updateCartCount(cart);
    }

    function openCart() {
        createCartDrawer();
        document.body.classList.add('cart-open');
        document.getElementById('cart-drawer')?.classList.add('open');
    }

    function closeCart() {
        document.body.classList.remove('cart-open');
        document.getElementById('cart-drawer')?.classList.remove('open');
    }

    function addToCart(product) {
        const cart = getCart();
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart(cart);
        renderCart();
        openCart();
    }

    function updateQuantity(id, action) {
        const cart = getCart();
        const existingItem = cart.find(item => item.id === id);

        if (!existingItem) {
            return;
        }

        if (action === 'increase') {
            existingItem.quantity += 1;
        } else if (action === 'decrease') {
            existingItem.quantity -= 1;
        }

        if (existingItem.quantity <= 0) {
            const filteredCart = cart.filter(item => item.id !== id);
            saveCart(filteredCart);
            renderCart();
            return;
        }

        saveCart(cart);
        renderCart();
    }

    cartButton.addEventListener('click', (event) => {
        event.preventDefault();
        openCart();
    });

    document.addEventListener('click', (event) => {
        const closeButton = event.target.closest('.cart-close-btn');
        if (closeButton) {
            closeCart();
            return;
        }

        const overlay = event.target.closest('.cart-drawer__overlay');
        if (overlay) {
            closeCart();
            return;
        }

        const actionButton = event.target.closest('[data-action]');
        if (!actionButton) {
            return;
        }

        const { action, id } = actionButton.dataset;
        if (action === 'increase' || action === 'decrease') {
            updateQuantity(id, action);
            return;
        }

        if (action === 'remove') {
            const cart = getCart().filter(item => item.id !== id);
            saveCart(cart);
            renderCart();
        }
    });

    document.addEventListener('click', (event) => {
        const addButton = event.target.closest('.add-to-cart-btn');
        if (!addButton) {
            return;
        }

        const productCard = addButton.closest('.product-card');
        if (!productCard) {
            return;
        }

        const name = productCard.querySelector('h2')?.textContent?.trim() || 'Produto';
        const description = productCard.querySelector('p')?.textContent?.trim() || '';
        const image = productCard.querySelector('img')?.getAttribute('src') || '';
        const price = parsePrice(productCard.querySelector('.product-price')?.textContent || '0');

        addToCart({
            id: getProductId(name),
            name,
            description,
            image,
            price
        });
    });

    const cartDrawerElement = document.getElementById('cart-drawer');
    if (cartDrawerElement) {
        cartDrawerElement.classList.remove('open');
    }

    renderCart();
})();
