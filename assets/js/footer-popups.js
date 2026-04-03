document.addEventListener('DOMContentLoaded', function() {
    // Modal Content Data
    const modalContent = {
        'our-process': {
            title: 'Our Process: Excellence from Field to Drop',
            body: `
                <p>At PANCANN, quality starts in the soil. We use 100% organic cultivation methods, free from pesticides and heavy metals.</p>
                <p>Our supercritical CO2 extraction ensures the total purity of cannabinoids, maintaining the plant's integrity. Each batch is tested in independent laboratories (COA) to ensure the potency and safety you deserve.</p>
                <div class="mt-4">
                    <strong>Certifications:</strong> Organically Grown, Non-GMO, Lab Tested.
                </div>
            `
        },
        'payments': {
            title: 'Payments: Security and Flexibility',
            body: `
                <p>We offer various payment methods for your convenience. We accept secure bank transfers, credit cards with up to 12 installments, and other digital payments.</p>
                <p>All transactions are protected by end-to-end encryption, ensuring your data is always safe. Your well-being is our priority, and that includes your financial peace of mind.</p>
            `
        },
        'special-offers': {
            title: 'Special Offers: Exclusive Benefits',
            body: `
                <p>We want you to experience the best of CBD. Use the coupon <strong>PRIMEIRA35</strong> on your first purchase and get an immediate 35% discount.</p>
                <p>Additionally, participate in our loyalty program: with every purchase, you accumulate points that can be exchanged for products or discounts on future orders. Wellness has never been so accessible.</p>
            `
        },
        'shipping': {
            title: 'Shipping: Fast and Discrete Delivery',
            body: `
                <p>We ship nationwide and internationally to countries where cannabis products are legally eligible for entry. Our packaging is neutral, with no external mention of the contents, protecting your privacy.</p>
                <p>We offer real-time tracking and full delivery insurance on all orders. Average delivery time is 3 to 10 business days, depending on your region and local customs regulations.</p>
            `
        },
        'regulations': {
            title: 'Regulations: Transparency and Rigor',
            body: `
                <p>PANCANN operates in strict compliance with international health regulations and pharmaceutical standards.</p>
                <p>All our products have a detailed Certificate of Analysis (COA), which can be accessed via QR Code on each package. We guarantee you receive a legal, ethical, and therapeutic-grade product.</p>
            `
        },
        'product-returns': {
            title: 'Product Returns: Our Satisfaction Guarantee',
            body: `
                <p>Your satisfaction is our priority. If you are not completely satisfied with your purchase, you may return unopened products within 30 days of delivery for a full refund or exchange.</p>
                <p>Please contact our support team at <strong>support@pancanncbd.com</strong> to initiate the return process. Quality and trust are the foundations of our relationship with you.</p>
            `
        },
        'our-team': {
            title: 'Our Team: Experts Dedicated to Your Wellness',
            body: `
                <p>PANCANN is powered by a diverse collective of medical professionals, biotechnologists, and wellness advocates dedicated to the science of cannabinoids.</p>
                <p>Our team works tirelessly to bridge the gap between nature and modern medicine, ensuring every product meets the highest rigorous pharmaceutical standards for your health and safety.</p>
            `
        },
        'terms-conditions': {
            title: 'Terms and Conditions: User Agreement',
            body: `
                <p>By using this website, you agree to comply with our terms of service. You must be at least 21 years of age to purchase any products from PANCANN.</p>
                <p>All content on this site is for educational purposes and should not replace professional medical advice. PANCANN is not responsible for the misuse of products or their use in jurisdictions where they are not legal.</p>
            `
        },
        'privacy-policy': {
            title: 'Privacy Policy: Data Protection',
            body: `
                <p>At PANCANN, we value your privacy. We collect only the information necessary for order processing and improving your user experience.</p>
                <p>Your personal data is encrypted and never sold to third parties. We use cookies and analytics to enhance our services, ensuring all data is handled in strict accordance with global privacy standards (GDPR/LGPD).</p>
            `
        }
    };

    // Modal Elements
    const overlay = document.querySelector('.pancann-modal-overlay');
    const container = document.querySelector('.pancann-modal-container');
    const modalTitle = document.getElementById('pancann-modal-title');
    const modalBody = document.getElementById('pancann-modal-body');
    const closeBtn = document.querySelector('.pancann-modal-close');

    // Open Modal Function
    window.openPancannModal = function(contentId) {
        const content = modalContent[contentId];
        if (!content) return;

        modalTitle.textContent = content.title;
        modalBody.innerHTML = content.body;
        
        // Add dark theme class if background is dark (as per user site)
        document.body.classList.add('pancann-modal-open');
        overlay.classList.add('active');
        overlay.classList.add('dark-theme'); // Force dark theme for PANCANN look
    };

    // Close Modal Function
    function closePancannModal() {
        overlay.classList.remove('active');
        document.body.classList.remove('pancann-modal-open');
    }

    // Event Listeners
    closeBtn.addEventListener('click', closePancannModal);
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closePancannModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePancannModal();
        }
    });

    // Handle Clicks on Footer Popup Links
    document.querySelectorAll('.footer-popup-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-content-id');
            window.openPancannModal(contentId);
        });
    });
});
