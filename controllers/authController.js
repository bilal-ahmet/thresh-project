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
        req.session.user = { 
            username: username,
            loginTime: new Date().toISOString()
        };
        
        // Session'ı kaydet ve bekle
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.render('auth/login', { error: 'Oturum açma hatası!' });
            }
            console.log('Session saved successfully:', req.session);
            res.redirect('/dashboard');
        });
    } else {
        res.render('auth/login', { error: 'Geçersiz kullanıcı adı veya şifre!' });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err);
        }
        res.clearCookie('thresh.session.id'); // custom session cookie'yi temizle
        res.clearCookie('connect.sid'); // fallback için default session cookie'yi de temizle
        res.redirect('/auth/login');
    });
};

module.exports = {
    login,
    logout
};
