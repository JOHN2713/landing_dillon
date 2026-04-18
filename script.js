// Generate year options for graduation year
function populateYearSelects() {
    const graduacionSelect = document.getElementById('graduacion');
    
    // Clear existing options
    graduacionSelect.innerHTML = '';
    
    // Add placeholder
    const placeholderGrad = document.createElement('option');
    placeholderGrad.value = '';
    placeholderGrad.textContent = 'Seleccione año';
    graduacionSelect.appendChild(placeholderGrad);
    
    // Populate graduation years (1965-2026)
    for (let year = 2026; year >= 1965; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        if (year === 2003) {
            option.selected = true;
        }
        graduacionSelect.appendChild(option);
    }
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Slider functionality
let currentSlide = 1;
const slides = document.querySelectorAll('.slider-item');
const totalSlides = slides.length;

function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');
        
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
            slide.classList.add('prev');
        } else if (index === (currentSlide + 1) % totalSlides) {
            slide.classList.add('next');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', function() {
    // Populate year dropdowns
    populateYearSelects();
    
    // Initialize slider
    updateSlider();
    
    // Add event listeners to slider buttons
    document.querySelector('.slider-btn.next').addEventListener('click', nextSlide);
    document.querySelector('.slider-btn.prev').addEventListener('click', prevSlide);
    
    // Auto-advance slider every 4 seconds
    setInterval(nextSlide, 4000);
    
    // Form submission handler
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            equipo: document.getElementById('equipo').value,
            nombre: document.getElementById('nombre').value,
            cedula: document.getElementById('cedula').value,
            celular: document.getElementById('celular').value,
            correo: document.getElementById('correo').value,
            nacimiento: document.getElementById('nacimiento').value,
            graduacion: document.getElementById('graduacion').value,
            terminos: document.getElementById('terminos').checked
        };
        
        // Validate
        if (!formData.terminos) {
            alert('Debe aceptar los términos y condiciones');
            return;
        }
        
        // Log form data (in production, this would send to a server)
        console.log('Datos del formulario:', formData);
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        this.reset();
    });
    
    // Modal event handlers
    const modal = document.getElementById('successModal');
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Apply discount button (within modal)
    modal.addEventListener('click', function(e) {
        if (e.target.classList.contains('apply-discount-btn')) {
            window.open('https://perseo.com.uy/promociones', '_blank');
        }
    });
    
    // Conocer más button
    modal.addEventListener('click', function(e) {
        if (e.target.classList.contains('conocer-mas-btn')) {
            window.open('https://perseo.com.uy/promociones', '_blank');
        }
    });
    
    // Register another player button
    modal.addEventListener('click', function(e) {
        if (e.target.classList.contains('register-another-btn')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            // Scroll to form
            document.getElementById('registrationForm').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // WhatsApp button (mobile version)
    modal.addEventListener('click', function(e) {
        if (e.target.closest('.mobile-whatsapp-btn')) {
            alert('Para más información sobre Socio Perseo, contacta con nosotros.');
        }
    });
    
    // Info button in success modal
    modal.addEventListener('click', function(e) {
        if (e.target.closest('.info-button')) {
            alert('Para más información sobre Socio Perseo, contacta con nosotros.');
        }
    });
    
    // Info button in main page
    const infoButton = document.querySelector('.info-button');
    if (infoButton) {
        infoButton.addEventListener('click', function() {
            alert('Para más información sobre Socio Perseo, contacta con nosotros.');
        });
    }
});
