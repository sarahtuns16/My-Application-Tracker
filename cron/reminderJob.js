import cron from "node-cron";
import Application from "../models/Application.js";

if(process.env.NODE_ENV !== "test") {
    cron.schedule ("0 0 * * *", async () => {
        console.log("Running follow-up reminder job...");

        try {
            const today = new Date();

            const applications = await Application.find({
                followupDate: { $lte: today },
                reminderSent: false,
            }).populate("user");

            for (const app of applications) {
                console.log(
                    `Reminder: Follow up with ${app.company} for ${app.position} (User: ${app.user.email})`
                );

                app.reminderSent = true;
                await app.save();
            }
        } catch (error) {
            console.error("Cron job error:", error.message);
        }
    });
};

export default runReminderJob;