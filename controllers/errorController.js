module.exports = (err, req, res, next) => {
  const error = { ...err }
  error.statusCode = err.statusCode || 500
  error.status = err.status || 'error'

  console.log('ERROR CONTROLLER', err.message, req.originalUrl, err)
  console.log('frist case')
  return res.status(error.statusCode).json({
    test: 'mati',
    error,
    status: 'ERROR',
    message: err.message || err.data.message,
  })
}
