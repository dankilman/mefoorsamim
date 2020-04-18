export default (req, res) => {
  res.status(200).json({
    id: (req.body && 'id' in req.body) ? req.body.id : null,
    result: Date.now()
  })
}