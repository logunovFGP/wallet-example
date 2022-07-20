const clients = require('../../../configs/sse');


module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const clientId = Date.now();
  const newClient = {
    id: clientId,
    userId: req.user.id,
    res
  };

  clients.push(newClient);

  res.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients.splice(clients.find(client => client.id === clientId).id,1);
  });
}
