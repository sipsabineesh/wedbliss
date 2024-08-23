import ReportAbuse from "../models/reportAbuseModel.js";

export async function getAbuseReport(req, res, next) {  
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const total = await ReportAbuse.countDocuments();

    const reports = await ReportAbuse.find()
        .populate('reporterId', 'username')
        .populate('reportedUserId', 'username')
        .select('reporterId reportedUserId reason reportDate proofImage status')
        .sort({ createdAt: -1 }) 
        .skip(startIndex)
        .limit(limit);

    res.json({
        reports,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalReports: total,
    });
}

export async function reviewReport(req, res, next) {  
    const report = await ReportAbuse.findById(req.params.id);
    if (report) {
        report.status = req.body.status || report.status;
        await report.save();
        res.json({ message: 'Report status updated successfully' });
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
}
