(function () {
    const searchInput = document.getElementById('searchInput');

    if (!searchInput) {
        return;
    }

    const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

    const siteProducts = [
        { name: 'Gardenia', description: 'Conjunto especial para manter a pele perfumada.', image: 'assets/images/Gardenia.jpg', price: 'R$ 89,90' },
        { name: 'Lírio e Baunilha', description: 'Fragrância leve e refrescante para o dia a dia.', image: 'assets/images/LirioBaunilha.jpg', price: 'R$ 74,90' },
        { name: 'Rosas', description: 'Conjunto especial para manter a pele perfumada.', image: 'assets/images/Rosas.jpg', price: 'R$ 69,90' },
        { name: 'Cereja e Avelã', description: 'Fragrância envolvente com toque gourmand e sofisticado.', image: 'assets/images/CerejaAvela.jpg', price: 'R$ 84,90' },
        { name: 'Creme de Morango', description: 'Hidratante delicioso com fragrância doce e irresistível.', image: 'assets/images/CremeMorango.png', price: 'R$ 59,90' },
        { name: 'Perfume Sólido Lavanda', description: 'Leve, prático e com aroma calmante de lavanda.', image: 'assets/images/PerfumeSolido.png', price: 'R$ 49,90' },
        { name: 'Sabonete Massageador de Erva Doce', description: 'Ideal para um ritual de banho relaxante e perfumado.', image: 'assets/images/SaboneteMassageador.png', price: 'R$ 39,90' },
        { name: 'Chia', description: 'Fragrância suave e natural, perfeita para quem busca uma experiência leve e sofisticada.', image: 'assets/images/Chia.jpg', price: 'R$ 54,90' },
        { name: 'Body Splash Morango', description: 'Fragrância fresca e doce para um toque delicado no corpo.', image: 'assets/images/BodySplashMorango.jpg', price: 'R$ 64,90' },
        { name: 'Perfume Sólido Morango', description: 'Versão prática e elegante com aroma marcante de morango.', image: 'assets/images/PerfumeSolidoMorango.png', price: 'R$ 44,90' },
        { name: 'Sabonete Massageador de Morango', description: 'Fragrância fresca e doce para um toque delicado no corpo.', image: 'assets/images/SaboneteMassageadorMorango.png', price: 'R$ 54,90' },
        { name: 'Body Splash Morango', description: 'Fragrância fresca e doce para um toque delicado no corpo.', image: 'assets/images/BodySplashMorango.jpg', price: 'R$ 64,90' },
        { name: 'Sabonete de Erva Doce', description: 'Sabonete natural com aroma calmante e aconchegante.', image: 'assets/images/SAboneteErvaDoce.jpg', price: 'R$ 37,90' },
        { name: 'Sabonete de Morango', description: 'Sabonete cremoso com fragrância irresistível de morango.', image: 'assets/images/SaboneteMorango.jpg', price: 'R$ 41,90' },
        { name: 'Sabonete Massageador', description: 'Sabonete com textura especial para um banho relaxante.', image: 'assets/images/SaboneteMassageador.png', price: 'R$ 39,90' },
        { name: 'Sabonete Massageador Morango', description: 'Sabonete massageador com fragrância doce e delicada.', image: 'assets/images/SaboneteMassageadorMorango.png', price: 'R$ 43,90' },
        { name: 'Body Splash Gardenia', description: 'Perfume suave e sofisticado com notas florais elegantes.', image: 'assets/images/Gardenia.jpg', price: 'R$ 69,90' },
        { name: 'Body Splash Lírio e Baunilha', description: 'Combinação leve e cremosa com aroma acolhedor.', image: 'assets/images/LirioBaunilha.jpg', price: 'R$ 59,90' },
        { name: 'Body Splash Rosas', description: 'Fragrância romântica e delicada, perfeita para todos os dias.', image: 'assets/images/Rosas.jpg', price: 'R$ 62,90' }
    ];

    function buildProductSearchText(product) {
        return normalize(`${product.name} ${product.description}`);
    }

    function matchesQuery(product, query) {
        if (!query) {
            return true;
        }

        const words = query.split(/\s+/).filter(Boolean);
        const searchText = buildProductSearchText(product);
        return words.every(word => searchText.includes(word));
    }

    function attachFavoriteEvents() {
        document.querySelectorAll('.search-results-section .favorite-btn').forEach(button => {
            if (button.dataset.favoriteBound === 'true') {
                return;
            }

            button.dataset.favoriteBound = 'true';
            const productCard = button.closest('.product-card');
            const name = productCard?.querySelector('h2')?.textContent?.trim() || '';
            const description = productCard?.querySelector('p')?.textContent?.trim() || '';
            const image = productCard?.querySelector('img')?.getAttribute('src') || '';
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

            if (favorites.some(item => item.name === name)) {
                button.classList.add('active');
                button.textContent = '♥';
            }

            button.addEventListener('click', (event) => {
                event.preventDefault();
                const isActive = button.classList.toggle('active');
                button.textContent = isActive ? '♥' : '♡';
                const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
                const existingIndex = storedFavorites.findIndex(item => item.name === name);

                if (isActive) {
                    if (existingIndex === -1) {
                        storedFavorites.push({ name, description, image });
                    }
                } else if (existingIndex !== -1) {
                    storedFavorites.splice(existingIndex, 1);
                }

                localStorage.setItem('favorites', JSON.stringify(storedFavorites));
            });
        });
    }

    function renderResults(query) {
        const main = document.querySelector('main');
        const sections = document.querySelectorAll('.category-section');
        const existingResults = document.querySelector('.search-results-section');

        if (existingResults) {
            existingResults.remove();
        }

        sections.forEach(section => {
            section.style.display = 'none';
        });

        if (!main || !query) {
            sections.forEach(section => {
                section.style.display = '';
            });
            return;
        }

        const matchingProducts = siteProducts.filter(product => matchesQuery(product, query));

        if (!matchingProducts.length) {
            const emptyState = document.createElement('section');
            emptyState.className = 'category-section search-results-section';
            emptyState.innerHTML = '<div class="category-card"><h2>Resultados da busca</h2></div><p class="search-no-results">Nenhum produto encontrado para esta busca.</p>';
            main.appendChild(emptyState);
            return;
        }

        const resultsSection = document.createElement('section');
        resultsSection.className = 'category-section search-results-section';
        resultsSection.innerHTML = '<div class="category-card"><h2>Resultados da busca</h2></div><div class="products-grid category-products-grid"></div>';
        const grid = resultsSection.querySelector('.products-grid');

        matchingProducts.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" />
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span class="product-price">${product.price}</span>
                <div class="product-actions">
                    <button class="favorite-btn" type="button" aria-label="Favoritar ${product.name}">♡</button>
                    <button class="add-to-cart-btn" type="button">Adicionar ao carrinho</button>
                </div>
            `;
            grid.appendChild(card);
        });

        main.appendChild(resultsSection);
        attachFavoriteEvents();
    }

    function updateSearch() {
        const query = normalize(searchInput.value);
        renderResults(query);
    }

    searchInput.addEventListener('input', updateSearch);
    searchInput.addEventListener('keyup', updateSearch);
    searchInput.addEventListener('search', updateSearch);
    updateSearch();
})();
