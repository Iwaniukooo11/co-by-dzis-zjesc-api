const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.checkToken = catchAsync(async (req, res, next) => {
  console.log('auth')
  if (!req.headers.authorization)
    return next(
      new AppError(
        'jeśli serio chcialeś się włamać to współczuję. Nie tym razem.'
      )
    )
  if (
    req.headers.authorization.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1] === process.env.ADMIN_TOKEN
  )
    return next()
  else return next(new AppError('bad token'))
})
