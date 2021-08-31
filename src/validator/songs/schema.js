const Joi = require('joi');

/**
 * Kriteria 6 : Menerapkan Data Validation (Joi)
 */

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2021).required(), // Perbaikan dari Submission 1
  performer: Joi.string().required(),
  genre: Joi.string(),
  duration: Joi.number(),
});

module.exports = { SongPayloadSchema };
