const jwt = require('jsonwebtoken');

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || 'thresh-project-jwt-secret-key-2024';

// Auth Controller
const login = (req, res) => {
    const { username, password } = req.body;
    
    // Sabit admin bilgileri
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'
    };
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // JWT token oluştur
        const token = jwt.sign(
            { 
                username: username,
                loginTime: new Date().toISOString()
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        // Token'ı cookie olarak set et
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, // 24 saat
            sameSite: 'lax'
        });
        
        console.log('Login successful, token created');
        res.redirect('/dashboard');
    } else {
        res.render('auth/login', { error: 'Geçersiz kullanıcı adı veya şifre!' });
    }
};

const logout = (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/auth/login');
};

// JWT token doğrulama fonksiyonu
const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken;
    
    if (!token) {
        return res.redirect('/auth/login');
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.clearCookie('authToken');
        res.redirect('/auth/login');
    }
};

module.exports = {
    login,
    logout,
    verifyToken
};
