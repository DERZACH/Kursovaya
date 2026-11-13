let cart = [];

function addToCart(tariffName, pricePerLesson, langSelectId, qtyInputId) {
    const language = document.getElementById(langSelectId).value;
    const quantity = parseInt(document.getElementById(qtyInputId).value);

    if (quantity < 1 || isNaN(quantity)) return;

    const existingItem = cart.find(item => item.tariff === tariffName && item.language === language);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            tariff: tariffName,
            language: language,
            price: pricePerLesson,
            quantity: quantity
        });
    }

    updateCartUI();

    if (typeof bootstrap !== 'undefined') {
        const cartElement = document.getElementById('cartOffcanvas');
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartElement);
        bsOffcanvas.show();
    } else {
        alert('Товар добавлен в корзину! Нажмите на кнопку «Корзина» вверху.');
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    const badgeElement = document.getElementById('cart-badge');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartContainer.innerHTML = '';
    let totalSum = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-muted text-center my-5">Корзина пока пуста</p>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach((item, index) => {
            const itemSum = item.price * item.quantity;
            totalSum += itemSum;
            totalItems += 1;

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card mb-2 border bg-light';
            cardDiv.innerHTML = 
                '<div class="card-body p-3 d-flex justify-content-between align-items-center">' +
                    '<div>' +
                        '<h6 class="fw-bold mb-1">' + item.language + ' (' + item.tariff + ')</h6>' +
                        '<small class="text-muted">' + item.quantity + ' ур. × ' + item.price + ' ₽ = <strong>' + itemSum + ' ₽</strong></small>' +
                    '</div>' +
                    '<button type="button" class="btn btn-sm btn-outline-danger" onclick="removeFromCart(' + index + ')">✕</button>' +
                '</div>';
            
            cartContainer.appendChild(cardDiv);
        });
    }

    totalElement.innerText = totalSum + ' ₽';
    badgeElement.innerText = totalItems;
}

function checkout(event) {
    event.preventDefault();
    alert('Спасибо за заказ! Ссылка на оплату и доступ в личный кабинет отправлены на вашу почту.');
    cart = [];
    updateCartUI();
    if (typeof bootstrap !== 'undefined') {
        const cartElement = document.getElementById('cartOffcanvas');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(cartElement);
        if (bsOffcanvas) bsOffcanvas.hide();
    }
}