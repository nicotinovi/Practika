// Initialize Supabase client
const supabase = Supabase.createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

// Check authentication state
async function checkAuthState(callback) {
  const { data: { user } } = await supabase.auth.getUser();
  callback(user);
}

// Login handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      alert('Ошибка входа: ' + error.message);
      return;
    }
    
    alert('Вход успешен!');
    loginForm.reset();
    document.getElementById('loginModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    checkAuthState(updateAuthUI);
  });
}

// Registration handler
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
  registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (error) {
      alert('Ошибка регистрации: ' + error.message);
      return;
    }
    
    alert('Регистрация успешна! Проверьте вашу почту для подтверждения.');
    registrationForm.reset();
    document.getElementById('registrationModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    checkAuthState(updateAuthUI);
  });
}

// Logout handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert('Ошибка выхода: ' + error.message);
      return;
    }
    
    alert('Вы вышли из аккаунта.');
    checkAuthState(updateAuthUI);
  });
}