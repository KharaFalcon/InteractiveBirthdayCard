
        // Confetti Animation
        const confettiCanvas = document.getElementById('confettiCanvas');
        const confettiCtx = confettiCanvas.getContext('2d');
        let confettiParticles = [];

        function resizeCanvas() {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
        }

        class ConfettiParticle {
            constructor() {
                this.x = Math.random() * confettiCanvas.width;
                this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
                this.size = Math.random() * 10 + 5;
                this.speed = Math.random() * 3 + 1;
                this.angle = Math.random() * 360;
                this.color = `hsl(${Math.random() * 60}, 100%, 65%)`; 
                this.spin = Math.random() < 0.5 ? -1 : 1;
                this.opacity = 1;
            }
            update() {
                this.y += this.speed;
                this.angle += this.spin * 5;
                this.opacity -= 0.003;
                if (this.y > confettiCanvas.height) {
                    this.y = -this.size;
                    this.x = Math.random() * confettiCanvas.width;
                    this.opacity = 1;
                }
            }
            draw() {
                confettiCtx.save();
                confettiCtx.translate(this.x, this.y);
                confettiCtx.rotate(this.angle * Math.PI / 180);
                confettiCtx.fillStyle = this.color;
                confettiCtx.globalAlpha = this.opacity;
                confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                confettiCtx.restore();
            }
        }

        function initConfetti() {
            confettiParticles = [];
            for (let i = 0; i < 200; i++) {
                confettiParticles.push(new ConfettiParticle());
            }
        }

        function animateConfetti() {
            if (confettiParticles.every(p => p.opacity <= 0)) {
                initConfetti(); // Continuous confetti
            }
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            confettiParticles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateConfetti);
        }

        // Cake Candles Interaction
        const candles = document.querySelectorAll('.candle');
        const revealedMessage = document.getElementById('revealedMessage');
        const clickHint = document.getElementById('clickHint');
        
        const totalCandles = candles.length;
        let litCandlesCount = 0;

        candles.forEach(candle => {
            candle.addEventListener('click', () => {
                if (!candle.classList.contains('lit')) {
                    candle.classList.add('lit');
                    litCandlesCount++;

                    if (litCandlesCount === totalCandles) {
                        clickHint.textContent = 'All candles lit! Happy Birthday!';
                        setTimeout(() => {
                           revealedMessage.classList.add('show');
                           clickHint.style.display = 'none'; // Hide hint after message is shown
                            setTimeout(() => {
                                revealedMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }, 500);
                        }, 700); // Short delay before showing message
                    } else {
                        clickHint.textContent = `${litCandlesCount} of ${totalCandles} candles lit... Keep going!`;
                    }
                }
            });
        });

        // Initialize
        window.addEventListener('load', () => {
            resizeCanvas();
            initConfetti();
            animateConfetti();
        });

        window.addEventListener('resize', () => {
            resizeCanvas();
        });