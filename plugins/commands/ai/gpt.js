const config = {
  name: "gpt",
  aliases: ["gpt4"], // name and alias are the same
  description: "Interacts with the GPT AI.",
  usage: "[query]",
  cooldown: 5,
  permissions: [0],
  credits: "Coffee // kinorverttt ni matoy sa gpt4",
};

async function onCall({ message, args }) {
  const query = args.join(" ") || "hello"; // Use user input or default to "hello"
  const apiUrl = `https://api.shizuki.linkpc.net/api/gpt?q=${encodeURIComponent(query)}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Format the response using the specified header and footer
      if (data && data.message) {
          const formattedResponse = `🤖 | GPT \n━━━━━━━━━━━━━━━━\n${data.message}\n━━━━━━━━━━━━━━━━`;
          await message.reply(formattedResponse);
      } else {
          await message.reply("No response from the API.");
      }
  } catch (error) {
      console.error("Error fetching from the API:", error);
      await message.send("An error occurred while fetching data.");
  }
}

export default {
  config,
  onCall,
};
