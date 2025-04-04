const words = [" Emitir Orçamentos", " Gerar PDFs", " Enviar para seus clientes"]; 
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 10;
        const typingElement = document.getElementById("typing")

        function typeEffect() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                charIndex--;
                typingSpeed = 10;
            } else {
                charIndex++;
                typingSpeed = 10; 
            }

            typingElement.textContent = currentWord.substring(0, charIndex);

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 2000; 
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Muda para a próxima palavra
                typingSpeed = 500; // Pequena pausa antes de digitar a nova palavra
            }

            setTimeout(typeEffect, typingSpeed);
        }

        typeEffect();
