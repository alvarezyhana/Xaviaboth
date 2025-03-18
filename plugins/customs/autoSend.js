import cron from "node-cron";

const jobs = [
    {
        time: "0 22 * * *",
        message: () => "It's 10 PM, good night!",
    },
    {
        time: "21 22 * * *",
        message: () => "It's 10:21 PM, good night!",
    },
    {
        time: "30 6 * * *",
        message: () => "Good morning! It's 6:30 AM.",
    },
    {
        time: "0 12 * * *",
        message: () => "It's noon! Don't forget to eat lunch.",
    },
    {
        time: "45 18 * * *",
        message: () => "It's 6:45 PM! Time to relax in the evening.",
    },
    {
        time: "59 23 * * *",
        message: () => "It's almost midnight! Time to sleep.",
    },
    {
        time: "15 3 * * *",
        message: () => "It's 3:15 AM. Hope you're resting well!",
    },
    {
        time: "0 9 * * *",
        message: () => "Good morning! It's 9 AM, have a productive day.",
    },
    {
        time: "30 15 * * *",
        message: () => "It's 3:30 PM, take a short break!",
    },
    {
        time: "10 20 * * *",
        message: () => "It's 8:10 PM, time to start winding down.",
    },
    {
        time: "5 5 * * *",
        message: () => "It's 5:05 AM, a new day begins!",
    },
    {
        time: "50 16 * * *",
        message: () => "It's 4:50 PM, time to wrap up your work!",
    },
    {
        time: "25 21 * * *",
        message: () => "It's 9:25 PM, get ready to relax before bed.",
    },
    {
        time: "10 1 * * *",
        message: () => "It's 1:10 AM, make sure to get some sleep!",
    },
    {
        time: "0 1 * * *",
        message: () => "It's 1 AM, the night is still young.",
    },
    {
        time: "0 2 * * *",
        message: () => "It's 2 AM, another late night!",
    },
    {
        time: "0 4 * * *",
        message: () => "It's 4 AM, the world is quiet.",
    }
];

export default function autoSend() {
    const timezone = global.config?.timezone || "Asia/Manila";
    if (!timezone) return;

    for (const job of jobs) {
        cron.schedule(
            job.time,
            () => {
                let i = 0;
                for (const tid of job.targetIDs ||
                    Array.from(global.data.threads.keys()) ||
                    []) {
                    setTimeout(async () => {
                        try {
                            const msg = await job.message();
                            await global.api.sendMessage(
                                typeof msg == "string"
                                    ? {
                                          body: job.message(),
                                      }
                                    : msg,
                                tid
                            );
                        } catch (e) {
                            console.error(e);
                        }
                    }, i++ * 300);
                }
            },
            {
                timezone: timezone,
            }
        );
    }
}
