// Auth Controller
const login = (req, res) => {
    const { username, password } = req.body;
    
    // Sabit admin bilgileri
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'
    };
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Session'ı yeniden oluştur
        req.session.regenerate((err) => {
            if (err) {
                console.error('Session regeneration error:', err);
                return res.render('auth/login', { error: 'Oturum oluşturma hatası!' });
            }
            
            // Session verilerini ayarla
            req.session.isAuthenticated = true;
            req.session.user = { username };
            req.session.lastActivity = Date.now();
            
            // Session'ı kaydet
            req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.render('auth/login', { error: 'Oturum kaydetme hatası!' });
                }
                res.redirect('/dashboard');
            });
        });
    } else {
        res.render('auth/login', { error: 'Geçersiz kullanıcı adı veya şifre!' });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
        }
        res.redirect('/auth/login');
    });
};

module.exports = {
    login,
    logout
};
