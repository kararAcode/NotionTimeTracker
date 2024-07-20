const { Client } = require("@notionhq/client");
require('dotenv').config();

// Initialize the Notion client with your integration token
const notion = new Client({ auth: process.env.NOTION_TOKEN });
console.log(process.env.NOTION_TOKEN);

// Function to retrieve and list all items in a specific database by ID
async function listAllItemsInDatabase(databaseId) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId
    });

    const items = response.results
      .filter(item => item.properties.Status?.status?.id !== 'done' && item.properties.Status?.status?.id !== 'archived') // Filter out 'done' tasks
      .map(item => {
        const name = item.properties["Task name"]?.title[0]?.text?.content || "Untitled";
        const icon = item.icon?.type === 'emoji' ? item.icon.emoji : item.icon?.external?.url;
        return { name, icon, id: item.id, status: item.properties.Status?.status?.id };
      });
      
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Example usage
listAllItemsInDatabase(process.env.NOTION_DATABASE_ID).then(items => {
  console.log(items);
});

module.exports = {
  listAllItemsInDatabase
};
