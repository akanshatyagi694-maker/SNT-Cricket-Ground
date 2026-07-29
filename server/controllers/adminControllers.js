const loginAdmin = async (req, res) => {

    const { username, password } = req.body;

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {
        return res.json({
            success: true,
            message: "Login Successful"
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid Username or Password"
    });

};

module.exports = { loginAdmin };