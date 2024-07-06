import mongoose from "mongoose";

const reportAbuseSchema = new mongoose.Schema(
  {
    reporterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reportedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    reportDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        //enum: ['Pending', 'Reviewed', 'Resolved'],
        default: 'Pending'
    }
  },
  { timestamps: true }
);

const ReportAbuse = mongoose.model('ReportAbuse', reportAbuseSchema);

export default ReportAbuse;