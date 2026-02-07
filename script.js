document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionEl = document.getElementById('question');
    const result = document.getElementById('result');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const volumeUpBtn = document.getElementById('volumeUpBtn');
    const valentineSong = document.getElementById('valentineSong');
    
    // Set initial volume
    valentineSong.volume = 0.7;
    
    // Questions flow
    const questions = [
        "Will you be my Valentine?",
        "Are you sure Sushi?",
        "Really sure sure???",
        "Think one last time about this Padmafreak",
        "OK I'm going to make you put in a little effort now, so please move the cursor to the yes button"
    ];
    
    let currentQuestion = 0;
    let noBtnSize = 1;
    let noBtnSpeed = 1;
    let musicAutoPlayed = false;
    let isNoButtonEscaping = false;
    let isYesButtonChallenging = false;
    let challengeStartTime = 0;
    let challengeDuration = 0;
    
    // Make No button escape the container entirely
    function escapeNoButton() {
        if (isNoButtonEscaping) return;
        isNoButtonEscaping = true;
        
        // Remove No button from buttons container
        buttonsContainer.removeChild(noBtn);
        
        // Add No button to body for full screen movement
        document.body.appendChild(noBtn);
        
        // Style for full screen movement
        noBtn.style.position = 'fixed';
        noBtn.style.zIndex = '10000';
        noBtn.style.minWidth = '100px';
        noBtn.style.fontSize = '1.2rem';
        noBtn.style.padding = '10px 20px';
        
        // Start random crazy movement
        startCrazyMovement();
        
        // Change text
        const messages = [
            "You can't catch me!",
            "Try harder!",
            "Nope nope nope!",
            "Too slow!",
            "Missed me!",
            "Catch me if you can!",
            "Not today!",
            "Run run run!",
            "Escape!",
            "Fleeing!"
        ];
        noBtn.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
    
    // Start crazy random movement across entire screen
    function startCrazyMovement() {
        let posX = Math.random() * (window.innerWidth - 100);
        let posY = Math.random() * (window.innerHeight - 50);
        
        function moveCrazy() {
            // Calculate new random position
            const newX = Math.random() * (window.innerWidth - 100);
            const newY = Math.random() * (window.innerHeight - 50);
            
            // Calculate distance and speed (faster as game goes on)
            const distance = Math.sqrt(Math.pow(newX - posX, 2) + Math.pow(newY - posY, 2));
            const speed = Math.min(800, 200 + (noBtnSpeed * 100)); // Faster over time
            
            // Calculate duration based on distance and speed
            const duration = Math.max(300, Math.min(1000, distance / speed * 1000));
            
            // Animate to new position
            noBtn.animate([
                { 
                    left: `${posX}px`, 
                    top: `${posY}px`,
                    transform: `scale(${noBtnSize}) rotate(0deg)`
                },
                { 
                    left: `${newX}px`, 
                    top: `${newY}px`,
                    transform: `scale(${noBtnSize}) rotate(${Math.random() * 360}deg)`
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                fill: 'forwards'
            });
            
            // Update position
            posX = newX;
            posY = newY;
            
            // Randomly change text sometimes
            if (Math.random() > 0.7) {
                const messages = [
                    "Can't catch me!",
                    "Too fast!",
                    "Zoom!",
                    "Whoosh!",
                    "Vroom!",
                    "Nope!",
                    "Missed!",
                    "Haha!",
                    "Try again!",
                    "Almost!"
                ];
                noBtn.textContent = messages[Math.floor(Math.random() * messages.length)];
            }
            
            // Schedule next move
            setTimeout(moveCrazy, duration + Math.random() * 500);
        }
        
        // Start the crazy movement
        moveCrazy();
    }
    
    // Set up the final challenge - small Yes button in corner
    function setupFinalChallenge() {
        isYesButtonChallenging = true;
        challengeStartTime = Date.now();
        
        // Make Yes button tiny and move it to top right corner
        yesBtn.style.position = 'fixed';
        yesBtn.style.zIndex = '10001';
        yesBtn.style.width = '50px';
        yesBtn.style.height = '30px';
        yesBtn.style.fontSize = '0.8rem';
        yesBtn.style.padding = '5px 10px';
        yesBtn.style.top = '20px';
        yesBtn.style.right = '20px';
        yesBtn.style.left = 'auto';
        yesBtn.style.bottom = 'auto';
        yesBtn.style.transform = 'scale(0.8)';
        yesBtn.textContent = 'YES';
        
        // Remove Yes button from container and add to body
        buttonsContainer.removeChild(yesBtn);
        document.body.appendChild(yesBtn);
        
        // Add challenge timer display
        const timer = document.createElement('div');
        timer.id = 'challengeTimer';
        timer.style.position = 'fixed';
        timer.style.top = '60px';
        timer.style.right = '20px';
        timer.style.backgroundColor = 'rgba(255, 107, 139, 0.9)';
        timer.style.color = 'white';
        timer.style.padding = '5px 10px';
        timer.style.borderRadius = '5px';
        timer.style.fontSize = '0.9rem';
        timer.style.zIndex = '10002';
        timer.textContent = 'Time: 0s';
        document.body.appendChild(timer);
        
        // Update timer every second
        const timerInterval = setInterval(() => {
            challengeDuration = Math.floor((Date.now() - challengeStartTime) / 1000);
            timer.textContent = `Time: ${challengeDuration}s`;
            
            // Make button even smaller and harder to click over time
            if (challengeDuration > 10 && challengeDuration <= 20) {
                yesBtn.style.width = '40px';
                yesBtn.style.height = '25px';
                yesBtn.style.fontSize = '0.7rem';
                yesBtn.style.transform = 'scale(0.7)';
            } else if (challengeDuration > 20) {
                yesBtn.style.width = '35px';
                yesBtn.style.height = '20px';
                yesBtn.style.fontSize = '0.6rem';
                yesBtn.style.transform = 'scale(0.6)';
                yesBtn.style.right = '30px'; // Move it a bit
                yesBtn.style.top = '25px';
            }
            
            // Stop timer when challenge is over
            if (!isYesButtonChallenging) {
                clearInterval(timerInterval);
                timer.remove();
            }
        }, 1000);
        
        // Make Yes button move slightly when hovered (but not too much)
        let isMoving = false;
        yesBtn.addEventListener('mouseover', function() {
            if (isMoving) return;
            isMoving = true;
            
            // Slight movement to make it challenging but not impossible
            const currentRight = parseInt(yesBtn.style.right) || 20;
            const currentTop = parseInt(yesBtn.style.top) || 20;
            
            // Move slightly in a random direction
            const newRight = Math.max(10, Math.min(window.innerWidth - 60, currentRight + (Math.random() * 40 - 20)));
            const newTop = Math.max(10, Math.min(window.innerHeight - 40, currentTop + (Math.random() * 40 - 20)));
            
            yesBtn.style.transition = 'all 0.3s ease';
            yesBtn.style.right = `${newRight}px`;
            yesBtn.style.top = `${newTop}px`;
            
            setTimeout(() => {
                isMoving = false;
            }, 300);
        });
    }
    
    // When she clicks YES
    yesBtn.addEventListener('click', function() {
        if (currentQuestion < questions.length - 1) {
            // Move to next question
            currentQuestion++;
            questionEl.textContent = questions[currentQuestion];
            
            // Make No button bigger
            noBtnSize += 0.3;
            noBtnSpeed += 0.5;
            noBtn.style.transform = `scale(${noBtnSize})`;
            
            // Add more hearts
            addHearts();
            
            // Make No button escape after 2nd question
            if (currentQuestion >= 1 && !isNoButtonEscaping) {
                escapeNoButton();
            }
            
            // Setup final challenge on the last question before celebration
            if (currentQuestion === questions.length - 1 && !isYesButtonChallenging) {
                setupFinalChallenge();
            }
        } else {
            // Final YES - show celebration
            isYesButtonChallenging = false;
            showCelebration();
        }
    });
    
    // Make No button escape on hover (after first click)
    noBtn.addEventListener('mouseover', function() {
        if (currentQuestion >= 1 && !isNoButtonEscaping) {
            escapeNoButton();
        } else if (!isNoButtonEscaping) {
            moveNoButtonWithinContainer();
        }
    });
    
    // Also escape when clicked
    noBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (!isNoButtonEscaping) {
            escapeNoButton();
        }
        
        // Change text to playful messages
        const messages = [
            "Nice try!",
            "Almost got me!",
            "Click faster!",
            "Too slow!",
            "Missed again!",
            "Hahaha!",
            "Can't click me!",
            "Escape successful!",
            "You'll never catch me!",
            "Runaway button!"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        noBtn.textContent = randomMessage;
        
        // Make button even bigger
        noBtnSize += 0.2;
        noBtn.style.transform = `scale(${noBtnSize})`;
    });
    
    // Original movement within container (for first question)
    function moveNoButtonWithinContainer() {
        const containerRect = buttonsContainer.getBoundingClientRect();
        const buttonRect = noBtn.getBoundingClientRect();
        
        // Calculate max positions
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;
        
        // Generate random position away from current position
        let randomX, randomY;
        const attempts = 10;
        
        for (let i = 0; i < attempts; i++) {
            randomX = Math.floor(Math.random() * maxX);
            randomY = Math.floor(Math.random() * maxY);
            
            // Make sure it's not too close to current position
            const currentX = parseInt(noBtn.style.left) || 0;
            const currentY = parseInt(noBtn.style.top) || 0;
            
            const distance = Math.sqrt(
                Math.pow(randomX - currentX, 2) + Math.pow(randomY - currentY, 2)
            );
            
            if (distance > 100) break;
        }
        
        // Apply new position with transition
        noBtn.style.transition = `all ${0.3/noBtnSpeed}s ease`;
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }
    
    // Show final celebration
    function showCelebration() {
        // Hide question box
        document.querySelector('.question-box').style.display = 'none';
        
        // Remove No button from screen if it's still there
        if (noBtn.parentNode) {
            noBtn.style.display = 'none';
        }
        
        // Remove Yes button challenge styling if active
        if (isYesButtonChallenging) {
            yesBtn.style.position = '';
            yesBtn.style.width = '';
            yesBtn.style.height = '';
            yesBtn.style.fontSize = '';
            yesBtn.style.padding = '';
            yesBtn.style.top = '';
            yesBtn.style.right = '';
            yesBtn.style.left = '';
            yesBtn.style.bottom = '';
            yesBtn.style.transform = '';
            yesBtn.textContent = 'YES!';
        }
        
        // Remove challenge timer if it exists
        const timer = document.getElementById('challengeTimer');
        if (timer) {
            timer.remove();
        }
        
        // Show celebration result
        result.style.display = 'block';
        
        // Add challenge time to celebration message if applicable
        if (challengeDuration > 0) {
            const celebrationText = document.querySelector('.result p:nth-child(3)');
            if (celebrationText) {
                celebrationText.textContent = `You completed the challenge in ${challengeDuration} seconds! That's faster than I... you know what :)`;
            }
        }
        
        // Scroll to result
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add celebration effects
        confettiEffect();
        playCelebrationSound();
        
        // Add more floating hearts
        for (let i = 0; i < 20; i++) {
            addFloatingHeart();
        }
        
        // Auto-play the song
        autoPlayMusic();
        
        // Preload images
        preloadImages();
    }
    
    // Auto-play music function
    function autoPlayMusic() {
        if (!musicAutoPlayed) {
            // Start playing the song automatically
            valentineSong.play().then(() => {
                console.log("Music playing automatically");
                playBtn.style.backgroundColor = '#ff2e63';
                musicAutoPlayed = true;
            }).catch(error => {
                console.log("Autoplay blocked:", error);
                playBtn.style.display = 'inline-block';
                playBtn.style.backgroundColor = '#ff4d7e';
            });
        }
    }
    
    // Add hearts animation
    function addHearts() {
        const heartsContainer = document.querySelector('.hearts');
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('span');
            heart.innerHTML = '❤️';
            heart.style.margin = '0 5px';
            heart.style.animation = 'pulse 1.5s infinite';
            setTimeout(() => {
                heartsContainer.appendChild(heart);
            }, i * 200);
        }
    }
    
    // Add floating hearts
    function addFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.color = getRandomColor();
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.opacity = '0.8';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);
        
        // Animate heart floating up
        const duration = Math.random() * 4000 + 3000;
        const animation = heart.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
            { transform: `translateY(-100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // Remove heart after animation
        animation.onfinish = () => heart.remove();
    }
    
    // Confetti effect function
    function confettiEffect() {
        const colors = ['#ff4d7e', '#ffafbd', '#a8edea', '#fed6e3', '#ffd166'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.innerHTML = Math.random() > 0.5 ? '❤️' : '💖';
            confetti.style.position = 'fixed';
            confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-50px';
            confetti.style.opacity = '0.9';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            // Remove confetti after animation
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // Celebration sound effect
    function playCelebrationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Play multiple tones for celebration
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    const notes = [523.25, 659.25, 783.99, 1046.50];
                    const note = notes[i % notes.length];
                    
                    oscillator.frequency.setValueAtTime(note, audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.25);
                }, i * 150);
            }
        } catch (e) {
            console.log("Audio context not supported");
        }
    }
    
    // Get random color for hearts
    function getRandomColor() {
        const colors = ['#ff4d7e', '#ff6b8b', '#ff8fab', '#ffafcc', '#ffc4d6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Preload images
    function preloadImages() {
        const imageUrls = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'];
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    // Music player controls
    playBtn.addEventListener('click', function() {
        valentineSong.play();
        playBtn.style.backgroundColor = '#ff2e63';
        pauseBtn.style.backgroundColor = '#ff4d7e';
    });
    
    pauseBtn.addEventListener('click', function() {
        valentineSong.pause();
        playBtn.style.backgroundColor = '#ff4d7e';
        pauseBtn.style.backgroundColor = '#ff2e63';
    });
    
    volumeUpBtn.addEventListener('click', function() {
        if (valentineSong.volume < 1) {
            valentineSong.volume += 0.1;
        }
        volumeUpBtn.style.backgroundColor = '#ff2e63';
        setTimeout(() => {
            volumeUpBtn.style.backgroundColor = '#ff4d7e';
        }, 200);
    });
    
    // Initialize the page
    function init() {
        // Ensure No button starts in the center
        noBtn.style.left = 'calc(50% - 75px)';
        noBtn.style.top = '0px';
        
        // Preload images on page load
        preloadImages();
    }
    
    // Initialize when page loads
    init();
    
    // Make No button escape if user tries to resize window while button is active
    window.addEventListener('resize', function() {
        if (isNoButtonEscaping) {
            // Re-center and continue crazy movement
            const posX = Math.random() * (window.innerWidth - 100);
            const posY = Math.random() * (window.innerHeight - 50);
            noBtn.style.left = `${posX}px`;
            noBtn.style.top = `${posY}px`;
        }
    });
});