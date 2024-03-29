/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-undef */
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')
const { ACTIONS } = require('admin-bro')
const Food = require('../models/foodModel')
const { update } = require('../models/foodModel')

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id)

    if (typeof doc.user.id === 'string' && req.user.id) {
      if (doc.user.id !== req.user.id) {
        return next(new AppError('Tried to remove not your document', 500))
      }
    } else if (doc.user && req.user.id) {
      if (doc.user !== req.user.id) {
        return next(new AppError('Tried to remove not your document', 500))
      }
    }

    await doc.delete()
    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }

    res.status(204).json({
      status: 'OK',
      data: {
        data: doc,
      },
    })
  })

exports.disactiveOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {
      isActive: false,
    })
    if (!doc) {
      return next(new AppError('No document found with that ID', 404))
    }
    res.status(204).json({
      status: 'OK',
      data: {
        data: doc,
      },
    })
  })

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      context: 'query',
      upsert: true,
    })
    if (!doc) {
      return next(new AppError('No doc found with that ID', 404))
    }

    res.status(200).json({
      status: 'OK',
      data: {
        data: doc,
      },
    })
  })
exports.updateOne = updateOne

// ACTIONS.edit.handler = async (req, res, context) => {
//   // console.log(req)
//   console.log(req.record.params._id)
//   const doc = await Food.findByIdAndUpdate(req.record.params._id, req.body, {
//     runValidators: true,
//     context: 'query',
//     upsert: true,
//   })
//   return {
//     record: doc.toJSON(context.currentAdmin),
//   }
// }

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    console.log('making...')
    const doc = await Model.create(req.body)

    res.status(201).json({
      status: 'OK',
      data: {
        data: doc,
      },
    })
  })

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    if (!req.clientData) req.clientData = {}

    let query = req.query.type
      ? Model.findOne({ [req.query.type]: req.params.id })
      : Model.findById(req.params.id)
    if (populateOptions) query = query.populate(populateOptions)

    const doc = await query

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404))
    }

    res.status(200).json({
      status: 'OK',
      data: {
        data: { ...doc._doc, ...req.clientData },
      },
    })
  })

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    let filter = req.params || {}

    const features = new APIFeatures(Model.find(filter).populate(), req.query)
      .filter()
      .sort()
      .limit()
      .paginate()
    const doc = await features.query

    res.status(200).json({
      status: 'OK',
      results: doc.length,
      data: {
        data: doc,
      },
    })
  })

exports.setUserIdAsUser = (req, res, next) => {
  if (req.user.id !== undefined) {
    req.body.user = req.user.id
  }
  next()
}

exports.setUserIdAsParam = (req, res, next) => {
  if (req.user) req.params.id = req.user.id
  next()
}
