const token = require('./token')

const withAuth = (req, res, next) => {
  try {
    token.decryptToken(req.session.user.token)
  } catch (error) {
    res.redirect("/login");    
  }
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
};
  
  module.exports = withAuth;