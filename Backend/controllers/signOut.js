module.exports.signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};
