// Render Login page
exports.renderLoginPage = (req, res) => {
    res.render('auth', { isRegisterPath: false });
};

// Render Register page
exports.renderRegisterPage = (req, res) => {
    res.render('auth', { isRegisterPath: true });
};
