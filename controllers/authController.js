const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.checkToken = catchAsync(async (req, res, next) => {
  if (
    req.headers.authorization.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1] === process.env.ADMIN_TOKEN
  )
    return next()
  else return next(new AppError('bad token'))
})
