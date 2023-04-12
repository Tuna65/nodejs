const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Certificate = new Schema({
  consciousnessAttitude: {
    type: Number,
  },
  GPA: { type: Number },
  Examination: {
    type: Number,
  },
  extracurricularActivities: {
    type: Number,
  },
  olympic: {
    type: Number,
  },
  NCKH: {
    type: Number,
  },
  evaluateTheQualityOfTeaching: {
    type: Number,
  },
  payTheSchoolFee: {
    type: Number,
  },
  ComplyWithResidencyRegulations: {
    type: Number,
  },
  borrowBooks: {
    type: Number,
  },
  ComplyWithRegulationsHealthGarageSecurity: {
    type: Number,
  },
  AcceptOtherRules: {
    type: Number,
  },
  politicalActivities: {
    type: Number,
  },
  participateInClassActivities: {
    type: Number,
  },
  participateInCulturalActivities: {
    type: Number,
  },
  crimePrevention: {
    type: Number,
  },
  abideByThePartyPolicy: {
    type: Number,
  },
  attitudeTowardsTeachers: {
    type: Number,
  },
  helpFriends: {
    type: Number,
  },
  trafficAwareness: {
    type: Number,
  },
  communityService: {
    type: Number,
  },
  classPosition: {
    type: Number,
  },
  award: {
    type: Number,
  },

  noteGPA: { type: Number },
  noteextracurricularActivities: { type: String },
  noteclassPosition: { type: String },
  noteaward: { type: String },
  createdAt: { type: Date, default: Date.now },
  student: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("templates", Certificate);
