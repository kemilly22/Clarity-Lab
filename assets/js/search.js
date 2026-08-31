(function () {
    const searchInput = document.getElementById('searchInput');

    if (!searchInput) {
        return;
    }

    const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

    const siteProducts = [
    // Body Splashs
    {
        name: 'Body Splash Morango',
        description: 'Fragrância fresca e doce para um toque delicado no corpo.',
        image: 'assets/images/BodySplashMorango.jpg',
        price: 'R$ 64,90'
    },
    {
        name: 'Body Splash Gardenia',
        description: 'Perfume suave e sofisticado com notas florais elegantes.',
        image: 'assets/images/Gardenia.jpg',
        price: 'R$ 69,90'
    },
    {
        name: 'Body Splash Lírio e Baunilha',
        description: 'Combinação leve e cremosa com aroma acolhedor.',
        image: 'assets/images/LirioBaunilha.jpg',
        price: 'R$ 59,90'
    },
    {
        name: 'Body Splash Rosas',
        description: 'Fragrância romântica e delicada, perfeita para todos os dias.',
        image: 'assets/images/Rosas.jpg',
        price: 'R$ 62,90'
    },
    {
        name: 'Body Splash Jasmim',
        description: 'Fragrância floral intensa com toque elegante e sofisticado.',
        image: 'assets/images/BodySplashJasmim.jpg',
        price: 'R$ 67,90'
    },
    {
        name: 'Body Splash Flor de Laranjeira',
        description: 'Cheiro fresco e cítrico com notas florais delicadas.',
        image: 'assets/images/BodySplashFlorLaranjeira.jpg',
        price: 'R$ 66,90'
    },
    {
        name: 'Body Splash Chia',
        description: 'Fragrância leve e natural, com aroma suave e refinado.',
        image: 'assets/images/BodySplashChia.jpg',
        price: 'R$ 61,90'
    },
    {
        name: 'Body Splash Cereja e Almíscar',
        description: 'Fragrância envolvente com toque gourmand e sofisticado.',
        image: 'assets/images/BodySplashCerejaAlmiscar.jpg',
        price: 'R$ 68,90'
    },
    {
        name: 'Body Splash Maracujá',
        description: 'Fragrância tropical e alegre, perfeita para dias quentes.',
        image: 'assets/images/BodySplashMaracuja.jpg',
        price: 'R$ 63,90'
    },
    {
        name: 'Body Splash Mandarina e Jasmim',
        description: 'Combinação cítrica e floral com aroma vibrante e fresco.',
        image: 'assets/images/BodySplashMandarinaJasmim.jpg',
        price: 'R$ 65,90'
    },
    {
        name: 'Body Splash Pera e Orquídea',
        description: 'Combinação elegante de frutas e flores para um aroma sofisticado.',
        image: 'assets/images/BodySplashPeraOrquidea.jpg',
        price: 'R$ 70,90'
    },

    // Cremes
    {
        name: 'Creme de Morango',
        description: 'Hidratante delicioso com fragrância doce e irresistível.',
        image: 'assets/images/CremeMorango.png',
        price: 'R$ 59,90'
    },
    {
        name: 'Creme de Maracujá Esfoliante',
        description: 'Creme suave e hidratante com fragrância intensa de maracujá.',
        image: 'assets/images/CremeMaracujá.png',
        price: 'R$ 64,90'
    },
    {
        name: 'Creme de Maracujá Premium',
        description: 'Creme suave e hidratante com fragrância intensa de maracujá.',
        image: 'assets/images/CremeMaracujá2.png',
        price: 'R$ 64,90'
    },

    // Óleos corporais
    {
        name: 'Óleo Corporal Avelã',
        description: 'Hidratação intensa com aroma suave e envolvente de avelã.',
        image: 'assets/images/OleoCorporalAvela.png',
        price: 'R$ 54,90'
    },
    {
        name: 'Óleo Corporal Chocolate',
        description: 'Textura luxuosa com perfume doce e irresistível para o corpo.',
        image: 'assets/images/oleoCorporalChocolate.png',
        price: 'R$ 58,90'
    },
    {
        name: 'Óleo Corporal Lavanda',
        description: 'Fragrância calmante que ajuda a relaxar e deixar a pele macia.',
        image: 'assets/images/oleoCorporalLavanda.png',
        price: 'R$ 56,90'
    },
    {
        name: 'Óleo Corporal Maracujá',
        description: 'Perfeita combinação de hidratação e frescor tropical para o dia a dia.',
        image: 'assets/images/OleoCorporalMaracuja.png',
        price: 'R$ 57,90'
    },
    {
        name: 'Óleo Corporal Morango',
        description: 'Hidratação delicada com perfume doce e irresistível de morango.',
        image: 'assets/images/oleoCorporalMorango.png',
        price: 'R$ 55,90'
    },
    {
        name: 'Sabonete de Erva Doce',
        description: 'Sabonete natural com aroma calmante e aconchegante.',
        image: 'assets/images/SAboneteErvaDoce.jpg',
        price: 'R$ 37,90'
    },
    {
        name: 'Sabonete de Morango',
        description: 'Sabonete cremoso com fragrância irresistível de morango.',
        image: 'assets/images/SaboneteMorango.jpg',
        price: 'R$ 41,90'
    },
    {
        name: 'Sabonete Massageador',
        description: 'Sabonete com textura especial para um banho relaxante.',
        image: 'assets/images/SaboneteMassageador.png',
        price: 'R$ 39,90'
    },
    {
        name: 'Sabonete Massageador Morango',
        description: 'Sabonete massageador com fragrância doce e delicada.',
        image: 'assets/images/SaboneteMassageadorMorango.png',
        price: 'R$ 43,90'
    },
    {
        name: 'Sabonete Massageador Maracujá',
        description: 'Sabonete massageador com fragrância doce e delicada.',
        image: 'assets/images/saboneteMassageadorMaracuja.jpg',
        price: 'R$ 43,90'
    },
    {
        name: 'Sabonete Maracujá',
        description: 'Sabonete massageador com fragrância doce e delicada.',
        image: 'assets/images/SaboneteMaracuja.png',
        price: 'R$ 43,90'
    }
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
