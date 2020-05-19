module.exports = function lazyWait() {
    return new Promise((resolve) => {
        const timeoutDuration = 50;
        let timeout = 0;

        const id = setInterval(() => {
            // If the timeout exceeds we'll just capture what we have.
            // This will usually happen if, for example, lazy loaded images are in a slider
            // or otherwise hidden from view, and not triggered by the lazy load
            if (timeout > 3000) {
                clearInterval(id);
                resolve();
                return;
            }

            timeout += timeoutDuration;
            const loading = [...document.querySelectorAll('[lazy="loading"]')];

            // Scroll down to trigger lazy load
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });

            if (!loading.length) {
                clearInterval(id);
                resolve();
            }
        }, 50);
    });
};
