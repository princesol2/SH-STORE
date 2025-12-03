const login = (req, res) => {
  res.json({ message: 'Vendor login placeholder', protocol: 'SHivy' });
};

const getInventory = (req, res) => {
  res.json({ message: 'Inventory placeholder', items: [], protocol: 'SHivy' });
};

module.exports = {
  login,
  getInventory,
};
