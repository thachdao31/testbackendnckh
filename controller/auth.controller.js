const User = require('../model/user.model');
const Token = require('../model/token.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const baseController = require('./base.controller');
const Student = require('../model/student.model');



const authController = {

  login: async (req, res) => {
    try {
      const _id = req.body.id;
      const password = req.body.password;

      // Check if email is registered 

      console.log("id", _id, "password", password)
      const user = await User.findOne({ userId: _id });
      if (!user) {
        return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
      }

      // Check if password is correct

      // check if password is default password
      let isDefaultPassword = false;
      if (user.password === '123456') {
        isDefaultPassword = true;
      }
      if (isDefaultPassword && password === '123456') {
        const accessToken = await authController.generateAccessToken(user);
        const refreshToken = await authController.generateRefreshToken(user);
        authController.saveRefreshToken(user._id, refreshToken);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict'
        });
        const { password, ...userWithoutPassword } = user._doc;
        return res.status(200).json({
          ...userWithoutPassword, accessToken
        });
      }


      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
      }
      if (user && validPassword) {
        const accessToken = await authController.generateAccessToken(user);
        const refreshToken = await authController.generateRefreshToken(user);
        authController.saveRefreshToken(user._id, refreshToken);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          path: '/',
          sameSite: 'strict'
        });
        const { password, ...userWithoutPassword } = user._doc;
        return res.status(200).json({
          ...userWithoutPassword, accessToken
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
  },
  generateAccessToken: async (user) => {
    return jwt.sign(
     { _id: user._id, email: user.mail, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
  },
  generateRefreshToken: async (user) => {
    return jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '1d' }
    )
  },
  saveRefreshToken: async (userId, refreshToken) => {
    const data = { userId: userId, token: refreshToken };

    const newToken = await new Token(data)
    const savedToken = newToken.save()
    console.log(savedToken)

  },
  // verifyRefreshToken: async (refreshToken) => {
  //   const tokenDoc = await Token.findOne({ token: refreshToken });
  //   if (!tokenDoc) {
  //     return false;
  //   }

  //   try {
  //     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // make sure to define this environment variable
  //     if (decoded.userId !== tokenDoc.userId) {
  //       return false;
  //     }
  //   } catch {
  //     return false;
  //   }
  //   return true;
  // },
  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // const validToken = await authController.verifyRefreshToken(refreshToken);
    // if (!validToken) {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }

    const decoded = jwt.decode(refreshToken);
    const user = await User.findOne({ _id: decoded.userId });
    const accessToken = await authController.generateAccessToken(user);
    return res.status(200).json({ accessToken });
  },
  logout: async (req, res) => {
    try {

      const refreshToken = req.body.refreshToken;
      console.log("refreshToken", refreshToken)
      if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // const validToken = await authController.verifyRefreshToken(refreshToken);
      // if (!validToken) {
      //   return res.status(403).json({ message: 'Forbidden' });
      // }

      const decoded = jwt.decode(refreshToken);
      await Token.findOneAndDelete({ userId: decoded.userId });
      res.clearCookie('refreshToken');
      return res.status(200).json({ message: 'Logged out' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
      console.error(error);
    }
  },
  resetPassword: async (req, res) => {
    const _id = req.body._id;
    const id = req.body.id;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    let isDefaultPassword = false;
    if (password === '123456') {
      isDefaultPassword = true;
    }

    // Check if id is registered
    const user = await Student.findOne({ userId: id });
    if (!user) {
      return res.status(401).json({ message: 'Invalid id or password' });
    }
    //check if password is correct
    // if (isDefaultPassword) {
    //   const validPassword = 
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid id or password' });
    }
    //check if new password and confirm password are the same

    if (newPassword !== confirmPassword) {
      return res.status(401).json({ message: 'New password and confirm password are not the same' });
    }
    //check if new password is the same as old password
    if (newPassword === password) {
      return res.status(401).json({ message: 'New password is the same as old password' });
    }
    //check if new password is the same as default password
    if (newPassword === '123456') {
      return res.status(401).json({ message: 'New password is the same as default password' });
    }
    //check if password is default password
    

  }

}

module.exports = authController;