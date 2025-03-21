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
// Fish Movement
function moveFish() {
    fish.forEach(f => {
        if (f.targetFood) {
            const foodX = f.targetFood.x;
            let foodY = f.targetFood.y;
            const dx = foodX - f.x;
            const dy = foodY - f.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Update food Y position as it falls
            foodY += 2; // Sync with CSS drift speed (510px / 5s = ~2px/frame at 60fps)
            f.targetFood.y = Math.min(foodY, 510);
            f.targetFood.el.style.top = `${f.targetFood.y}px`;

            if (distance < 30) {
                f.targetFood.el.remove();
                f.targetFood = null;
                f.hunger += 1;
                f.el.style.filter = `drop-shadow(0 0 ${5 + f.hunger * 2}px rgba(${f.el.style.background.includes('ff4500') ? '255, 69, 0' : f.el.style.background.includes('00ced1') ? '0, 206, 209' : '255, 105, 180'}, 0.5))`;
                setTimeout(() => f.el.style.transform = f.dx > 0 ? 'scaleX(1)' : 'scaleX(-1)', 200);
                spawnBubble(f.x, f.y);
            } else {
                f.x += dx * f.speed;
                f.y += dy * f.speed;
                f.el.style.transform = dx > 0 ? 'scaleX(1)' : 'scaleX(-1)';
            }
        } else {
            f.x += f.dx;
            f.y += f.dy;

            if (f.x < 20 || f.x > 860) {
                f.dx *= -1;
                f.x = Math.max(20, Math.min(860, f.x));
            }
            if (f.y < 20 || f.y > 470) {
                f.dy *= -1;
                f.y = Math.max(20, Math.min(470, f.y));
            }

            f.el.style.transform = f.dx > 0 ? 'scaleX(1)' : 'scaleX(-1)';
            f.hunger = Math.max(0, f.hunger - 0.01);
            f.el.style.filter = `drop-shadow(0 0 ${5 + f.hunger * 2}px rgba(${f.el.style.background.includes('ff4500') ? '255, 69, 0' : f.el.style.background.includes('00ced1') ? '0, 206, 209' : '255, 105, 180'}, 0.5))`;
        }

        f.el.style.left = `${f.x}px`;
        f.el.style.top = `${f.y}px`;
    });

    requestAnimationFrame(moveFish);
}
