// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // Trang chủ (có các url login) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // 
    });

    // =====================================
    // Đăng nập ===============================
    // =====================================
    // hiển thị form đăng nhập
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login', 
        failureFlash : true
    }));

    //Login with Passport Facebook
    app.get('/auth/facebook',
         passport.authenticate('facebook', { scope: ['email'] })
    );
    app.get('/auth/fb/cb', passport.authenticate('facebook',
     { successRedirect: '/profile', failureRedirect: '/login' }));

    // =====================================
    // Đăng ký ==============================
    // =====================================
    // hiển thị form đăng ký
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    app.get('/private', isLoggedIn, function(req, res) {
        res.send('private page with authenticate');
    });
    // Xử lý form đăng ký ở đây
   app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // Điều hướng tới trang hiển thị profile
        failureRedirect : '/signup', // Trở lại trang đăng ký nếu lỗi
        failureFlash : true 
    }));

    // =====================================
    // Thông tin user đăng ký =====================
    // =====================================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // truyền đối tượng user cho profile.ejs để hiển thị lên view
        });
    });

    // =====================================
    // Đăng xuất ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}