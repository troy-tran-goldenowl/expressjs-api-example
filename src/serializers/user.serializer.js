const userSerializer = (object) => ({
  id: object.id,
  username: object.username,
});

module.exports = {
  userSerializer,
};
