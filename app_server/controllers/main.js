const index = (req, res) => {
  res.render("index", { title: "index" });
};

module.exports = {
  index,
};
