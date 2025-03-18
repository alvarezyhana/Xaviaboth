import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const config = {
    name: "shoti",
    aliases: ["shoti"],
    description: "Fetch a random Shoti video.",
    usage: "",
    cooldown: 3,
    permissions: [1, 2],
    credits: "xavballz",
};

// Ensure cache directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cacheDir = path.join(__dirname, './cache');
if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
}

// Main command function
async function onCall({ message }) {
    try {
        await message.react("🕰️"); // Indicate processing
        const apiUrl = 'https://betadash-shoti-yazky.vercel.app/shotizxx?apikey=shipazu';
        const response = await axios.get(apiUrl);
        const videoData = response.data;

        if (!videoData) throw new Error("⚠️ Failed to fetch data");

        const ext = videoData.shotiurl.split('.').pop();
        const filePath = path.join(cacheDir, `shoti.${ext}`);

        const writer = fs.createWriteStream(filePath);
        const videoResponse = await axios.get(videoData.shotiurl, { responseType: 'stream' });
        videoResponse.data.pipe(writer);

        writer.on('finish', () => {
            message.reply({
                body: `🎥 | Here's a random Shoti Video: ${videoData.title || 'No title'}\n\n📍 Region: ${videoData.region}\n⏳ Duration: ${videoData.duration} seconds\n👤 User: ${videoData.nickname} (@${videoData.username})\n\n📹 Watch it here: ${videoData.shotiurl}`,
                attachment: fs.createReadStream(filePath)
            }).then(() => fs.unlinkSync(filePath)); // Delete the file after sending
        });

        writer.on('error', (error) => {
            console.error("Error writing video to file: ", error.message);
            message.reply("⚠️ An error occurred while saving the video.");
        });
    } catch (error) {
        console.error(error);
        await message.react("✖️"); // React with ❎ on error
        await message.reply("⚠️ An error occurred while fetching the data.");
    }
}

export default {
    config,
    onCall
};
