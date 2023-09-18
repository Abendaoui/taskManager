const notFound = (req, res) =>
  res.status(404).send("Oops! Looks Like It's A Dead End ")

module.exports = notFound
