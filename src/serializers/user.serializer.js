const userSerializer = (object) => ({
  id: object.id,
  username: object.username,
});

const userAuthSerializer = (object, token) => ({
  id: object.id,
  username: object.username,
  token,
});

module.exports = {
  userSerializer,
  userAuthSerializer,
};
