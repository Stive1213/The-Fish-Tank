const tank = document.querySelector('.tank');
        const feedBtn = document.querySelector('.feed-btn');
        const fishElements = document.querySelectorAll('.fish');
        const fish = Array.from(fishElements).map(f => ({
            el: f,
            x: parseInt(f.style.left),
            y: parseInt(f.style.top),
            dx: (Math.random() - 0.5) * 3,
            dy: (Math.random() - 0.5) * 3,
            targetFood: null,
            speed: 0.08 + Math.random() * 0.06,
            hunger: 0
        }));