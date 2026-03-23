import Application from "../models/Application.js";

export const getDashboardSummary = async (req, res) => {
    try {
        const userId = req.user.id;

        const totalApplications = await Application.countDocuments({
            user: userId,
        });

        const statusStats = await Application.aggregatea([
            { $match: { user: userId } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        const formattedStats = {
            pending: 0,
            accepted: 0,
            rejected: 0,
        };

        statusStats.forEach((item) => {
            formattedStats[item._id] = item.count;
        });

        const recentApplications = await Application.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5);

        res.status(200).json({
            totalApplications,
            statusStats: formattedStats,
            recentApplications,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};