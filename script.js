document.addEventListener('DOMContentLoaded', function() {
    // Gestione dell'animazione dell'icona Instagram
    const instagramLink = document.getElementById('instagram-link');
    
    if (instagramLink) {
        instagramLink.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Aggiungi la classe per l'animazione di rotazione
            this.classList.add('rotate');
            
            // Salva l'URL per aprirlo dopo l'animazione
            const url = this.getAttribute('href');
            
            // Attendi che l'animazione finisca (0.5 secondi come definito nel CSS)
            setTimeout(function() {
                window.open(url, '_blank');
                // Rimuovi la classe per ripristinare lo stato originale
                instagramLink.classList.remove('rotate');
            }, 500);
        });
    }
    
    // Gestione dei cookies
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const cookiesLink = document.getElementById('cookies-link');
    
    // Funzione per impostare un cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    
    // Funzione per ottenere un cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Controlla se i cookies sono stati accettati
    if (!getCookie('cookiesAccepted')) {
        cookieBanner.style.display = 'block';
    }
    
    // Gestione del click sul pulsante di accettazione
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            setCookie('cookiesAccepted', 'true', 365);
            cookieBanner.style.display = 'none';
        });
    }
    
    // Gestione dell'animazione dell'icona cookies
    if (cookiesLink) {
        cookiesLink.addEventListener('click', function(event) {
            // Non preveniamo l'evento predefinito per permettere la navigazione
        });
    }
    
    // Gestione del form di sottoscrizione
    const subscriptionForm = document.getElementById('subscription-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(event) {
            // Preveniamo l'invio standard del form per gestirlo con JavaScript
            event.preventDefault();
            
            // Salviamo il riferimento al campo email
            const emailField = this.querySelector('input[type="email"]');
            
            // Inviamo il form in modo programmatico
            const formData = new FormData(this);
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                // Azzeriamo il campo email
                if (emailField) {
                    emailField.value = '';
                }
                
                // Nascondiamo il form
                this.style.display = 'none';
                
                // Mostriamo il messaggio di ringraziamento
                if (thankYouMessage) {
                    thankYouMessage.style.display = 'block';
                }
                
                // Dopo 3 secondi, ripristiniamo il form e nascondiamo il messaggio
                setTimeout(() => {
                    this.style.display = 'block';
                    if (thankYouMessage) {
                        thankYouMessage.style.display = 'none';
                    }
                }, 3000);
            }).catch(error => {
                console.error('Errore durante l\'invio del form:', error);
            });
        });
    }
});