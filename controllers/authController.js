// Auth Controller
const login = (req, res) => {
    const { username, password } = req.body;
    
    // Sabit admin bilgileri
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'
    };
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        req.session.isAuthenticated = true;
        req.session.user = { username };
        console.log('Session created upon login:', req.session); // Debugging
        res.redirect('/dashboard');
    } else {
        res.render('auth/login', { error: 'Geçersiz kullanıcı adı veya şifre!' });
    }
};

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
};

module.exports = {
    login,
    logout
};
