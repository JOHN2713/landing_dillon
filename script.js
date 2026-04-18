// Generate year options for graduation year and birth date selects
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
    
    // Poblar selects de fecha de nacimiento para móvil
    populateBirthDateSelects();
}

// Poblar selects de día, mes y año para fecha de nacimiento (móvil)
function populateBirthDateSelects() {
    const diaSelect = document.getElementById('dia-nacimiento');
    const mesSelect = document.getElementById('mes-nacimiento');
    const anioSelect = document.getElementById('anio-nacimiento');
    
    // Poblar días (1-31)
    diaSelect.innerHTML = '<option value="">Día</option>';
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i.toString().padStart(2, '0');
        option.textContent = i;
        diaSelect.appendChild(option);
    }
    
    // Poblar meses
    mesSelect.innerHTML = '<option value="">Mes</option>';
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    meses.forEach((mes, index) => {
        const option = document.createElement('option');
        option.value = (index + 1).toString().padStart(2, '0');
        option.textContent = mes;
        mesSelect.appendChild(option);
    });
    
    // Poblar años (1950-2010)
    anioSelect.innerHTML = '<option value="">Año</option>';
    for (let year = 2010; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        anioSelect.appendChild(option);
    }
}

// Validar cédula ecuatoriana
function validarCedulaEcuatoriana(cedula) {
    // Verificar que tenga 10 dígitos
    if (cedula.length !== 10) {
        return false;
    }
    
    // Verificar que solo contenga números
    if (!/^\d+$/.test(cedula)) {
        return false;
    }
    
    // Verificar que los dos primeros dígitos correspondan a una provincia válida (01-24)
    const provincia = parseInt(cedula.substring(0, 2));
    if (provincia < 1 || provincia > 24) {
        return false;
    }
    
    // Verificar el dígito verificador usando el algoritmo módulo 10
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    
    for (let i = 0; i < 9; i++) {
        let valor = parseInt(cedula.charAt(i)) * coeficientes[i];
        if (valor >= 10) {
            valor -= 9;
        }
        suma += valor;
    }
    
    const residuo = suma % 10;
    const digitoVerificador = residuo === 0 ? 0 : 10 - residuo;
    
    return digitoVerificador === parseInt(cedula.charAt(9));
}

// Validar celular ecuatoriano
function validarCelularEcuatoriano(celular) {
    // Debe tener 10 dígitos y empezar con 09
    const regex = /^09[0-9]{8}$/;
    return regex.test(celular);
}

// Validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar mensaje de error
function mostrarError(inputId, mensaje) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }
    
    if (inputElement) {
        inputElement.style.borderColor = '#ff4444';
    }
}

// Limpiar mensaje de error
function limpiarError(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    if (inputElement) {
        inputElement.style.borderColor = 'rgba(255, 255, 255, 0.2)';
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
    
    // Filtrado dinámico de equipos por categoría
    const categoriaSelect = document.getElementById('categoria');
    const equipoSelect = document.getElementById('equipo');
    const todasLasOpciones = Array.from(equipoSelect.querySelectorAll('option[data-categoria]'));
    
    categoriaSelect.addEventListener('change', function() {
        const categoriaSeleccionada = this.value;
        
        // Limpiar el select de equipos
        equipoSelect.innerHTML = '';
        
        if (categoriaSeleccionada === '') {
            // Si no hay categoría seleccionada, deshabilitar equipos
            equipoSelect.disabled = true;
            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Primero seleccione una categoría';
            equipoSelect.appendChild(placeholder);
        } else {
            // Habilitar el select de equipos
            equipoSelect.disabled = false;
            
            // Agregar placeholder
            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Seleccione un equipo';
            equipoSelect.appendChild(placeholder);
            
            // Filtrar y agregar solo los equipos de la categoría seleccionada
            todasLasOpciones.forEach(option => {
                if (option.getAttribute('data-categoria') === categoriaSeleccionada) {
                    equipoSelect.appendChild(option.cloneNode(true));
                }
            });
        }
    });
    
    // Validaciones en tiempo real
    const cedulaInput = document.getElementById('cedula');
    const celularInput = document.getElementById('celular');
    const correoInput = document.getElementById('correo');
    
    // Validación cédula en tiempo real
    cedulaInput.addEventListener('input', function() {
        // Solo permitir números
        this.value = this.value.replace(/\D/g, '');
    });
    
    cedulaInput.addEventListener('blur', function() {
        const cedula = this.value;
        if (cedula.length > 0) {
            if (!validarCedulaEcuatoriana(cedula)) {
                mostrarError('cedula', 'Cédula ecuatoriana no válida');
            } else {
                limpiarError('cedula');
            }
        }
    });
    
    // Validación celular en tiempo real
    celularInput.addEventListener('input', function() {
        // Solo permitir números
        this.value = this.value.replace(/\D/g, '');
    });
    
    celularInput.addEventListener('blur', function() {
        const celular = this.value;
        if (celular.length > 0) {
            if (!validarCelularEcuatoriano(celular)) {
                mostrarError('celular', 'Celular debe empezar con 09 y tener 10 dígitos');
            } else {
                limpiarError('celular');
            }
        }
    });
    
    // Validación email en tiempo real
    correoInput.addEventListener('blur', function() {
        const email = this.value;
        if (email.length > 0) {
            if (!validarEmail(email)) {
                mostrarError('correo', 'Formato de correo inválido');
            } else {
                limpiarError('correo');
            }
        }
    });
    
    // Form submission handler
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpiar errores previos
        limpiarError('cedula');
        limpiarError('celular');
        limpiarError('correo');
        
        // Obtener fecha de nacimiento según el dispositivo
        let fechaNacimiento = '';
        const dateDesktop = document.getElementById('nacimiento');
        const dateMobile = document.querySelector('.date-mobile');
        
        // Verificar si estamos en móvil (si date-mobile está visible)
        const isMobile = window.getComputedStyle(dateMobile).display !== 'none';
        
        console.log('🔍 Detectando dispositivo:', isMobile ? 'MÓVIL' : 'DESKTOP');
        
        if (isMobile) {
            // Obtener valores de los selects móviles
            const dia = document.getElementById('dia-nacimiento').value;
            const mes = document.getElementById('mes-nacimiento').value;
            const anio = document.getElementById('anio-nacimiento').value;
            
            console.log('📅 Valores móvil - Día:', dia, 'Mes:', mes, 'Año:', anio);
            
            if (dia && mes && anio) {
                fechaNacimiento = `${anio}-${mes}-${dia}`;
                console.log('✅ Fecha formada:', fechaNacimiento);
            } else {
                alert('Por favor complete la fecha de nacimiento (día, mes y año)');
                return;
            }
        } else {
            // Usar el date picker de desktop
            fechaNacimiento = dateDesktop.value;
            console.log('📅 Fecha desktop:', fechaNacimiento);
            
            if (!fechaNacimiento) {
                alert('Por favor seleccione su fecha de nacimiento');
                return;
            }
        }
        
        // Get form data
        const formData = {
            categoria: document.getElementById('categoria').value,
            equipo: document.getElementById('equipo').value,
            nombre: document.getElementById('nombre').value,
            cedula: document.getElementById('cedula').value,
            celular: document.getElementById('celular').value,
            correo: document.getElementById('correo').value,
            nacimiento: fechaNacimiento,
            graduacion: document.getElementById('graduacion').value,
            terminos: document.getElementById('terminos').checked
        };
        
        // Validar campos
        let hasErrors = false;
        
        // Validar cédula
        if (!validarCedulaEcuatoriana(formData.cedula)) {
            mostrarError('cedula', 'Cédula ecuatoriana no válida');
            hasErrors = true;
        }
        
        // Validar celular
        if (!validarCelularEcuatoriano(formData.celular)) {
            mostrarError('celular', 'Celular debe empezar con 09 y tener 10 dígitos');
            hasErrors = true;
        }
        
        // Validar email
        if (!validarEmail(formData.correo)) {
            mostrarError('correo', 'Formato de correo inválido');
            hasErrors = true;
        }
        
        // Validar términos
        if (!formData.terminos) {
            alert('Debe aceptar los términos y condiciones');
            hasErrors = true;
        }
        
        if (hasErrors) {
            console.log('❌ Errores en validación - no se envía');
            return;
        }
        
        console.log('✅ Todos los campos validados correctamente');
        console.log('📊 Datos a enviar:', formData);
        
        // Enviar a Google Sheets
        enviarAGoogleSheets(formData);
        
        console.log('📤 Enviando a Google Sheets...');
        
        // Show success modal
        showSuccessModal();
        
        console.log('🎉 Mostrando modal de éxito');
        
        // Reset form
        this.reset();
        
        // Resetear selects de fecha móvil
        document.getElementById('dia-nacimiento').selectedIndex = 0;
        document.getElementById('mes-nacimiento').selectedIndex = 0;
        document.getElementById('anio-nacimiento').selectedIndex = 0;
        
        // Deshabilitar select de equipos después del reset
        equipoSelect.disabled = true;
        equipoSelect.innerHTML = '<option value="">Primero seleccione una categoría</option>';
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

// Función para enviar datos a Google Sheets
async function enviarAGoogleSheets(formData) {
    // IMPORTANTE: Reemplaza esta URL con la URL de tu Google Apps Script
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWsKLkg5XGsRSoRWpo_KNJFpxQGQadDzFy2Uh3YrcEqHalt7jS50DUDPWgKeaByPIFyQ/exec';
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        console.log('✅ Datos enviados exitosamente a Google Sheets');
        console.log('Datos enviados:', formData);
        return true;
    } catch (error) {
        console.error('❌ Error al enviar a Google Sheets:', error);
        // Aún así retornar true para no frustrar al usuario
        // Los datos se mostraron en console.log antes del envío
        return false;
    }
}
