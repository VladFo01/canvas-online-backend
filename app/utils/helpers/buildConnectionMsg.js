const buildConnectionMsg = ({ id, username }) =>  ({
  id,
  username,
  method: 'connection'
})

module.exports = {
  buildConnectionMsg,
};
