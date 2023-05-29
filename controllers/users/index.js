const { ctrlWrapper } = require('../../helpers');

module.exports = {
  register: ctrlWrapper(require('./register')),
  verifyEmail: ctrlWrapper(require('./verifyEmail')),
  resendVerifyEmail: ctrlWrapper(require('./resendVerifyEmail')),
  login: ctrlWrapper(require('./login')),
  loginWithToken: ctrlWrapper(require('./loginWithToken')),
  getCurrentUser: ctrlWrapper(require('./getCurrentUser')),
  logout: ctrlWrapper(require('./logout')),
  // googleAuth: ctrlWrapper(require('./googleAuth')),
};