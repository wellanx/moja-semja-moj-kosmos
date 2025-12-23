// Переключение темы
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggle.textContent = '🌙 Тёмная тема';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️ Светлая тема';
        localStorage.setItem('theme', 'dark');
    }
}

// Инициализация темы
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        if (savedTheme === 'light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.textContent = '🌙 Тёмная тема';
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.textContent = '☀️ Светлая тема';
        }
        
        themeToggle.addEventListener('click', toggleTheme);
    }
}

// Слайдер
let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${-currentSlide * 100}%)`;
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Мобильное меню
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Валидация форм
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.classList.remove('error');
        
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        }
        
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
        
        if (input.type === 'password' && input.id === 'confirmPassword') {
            const password = form.querySelector('#password').value;
            if (input.value !== password) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Добавление/удаление членов семьи
function addFamilyMember() {
    const container = document.getElementById('familyMembers');
    const count = container.querySelectorAll('.family-member').length + 1;
    
    const memberDiv = document.createElement('div');
    memberDiv.className = 'family-member form-group';
    memberDiv.innerHTML = `
        <h4>Член семьи ${count}</h4>
        <div class="form-row">
            <input type="text" placeholder="Фамилия" required>
            <input type="text" placeholder="Имя" required>
            <input type="number" placeholder="Возраст" min="0" max="120" required>
            <select required>
                <option value="">Пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
            </select>
            <button type="button" onclick="removeFamilyMember(this)" class="btn btn-danger">Удалить</button>
        </div>
    `;
    
    container.appendChild(memberDiv);
}

function removeFamilyMember(button) {
    const memberDiv = button.closest('.family-member');
    if (memberDiv) {
        memberDiv.remove();
        // Обновляем нумерацию
        const members = document.querySelectorAll('.family-member');
        members.forEach((member, index) => {
            member.querySelector('h4').textContent = `Член семьи ${index + 1}`;
        });
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    // Инициализация слайдера
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        showSlide(currentSlide);
        
        // Автопрокрутка слайдов
        setInterval(nextSlide, 5000);
    }
    
    // Обработка форм
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                alert('Форма успешно отправлена!');
                this.reset();
            } else {
                alert('Пожалуйста, заполните все поля корректно.');
            }
        });
    });
    
    // Гамбургер-меню
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.querySelector('.nav-links');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });
    });
});