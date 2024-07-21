const { Client } = require("@notionhq/client");
require('dotenv').config();

// Initialize the Notion client with your integration token
const notion = new Client({ auth: process.env.NOTION_TOKEN });

/**
 * Retrieves and lists all items in a specific Notion database by ID, excluding tasks with 'done' or 'archived' status.
 *
 * @param {string} databaseId - The ID of the Notion database to query.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of items, each containing the task name, icon, id, status, and time.
 */
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
        const time = item.properties["Time"].number || 0;
        return { name, icon, id: item.id, status: item.properties.Status?.status?.id, time };
      });
      
    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
}


/**
 * Updates the time property of a specific task in Notion.
 *
 * @param {string} taskid - The ID of the task to update.
 * @param {number} time - The new time value to set for the task.
 * @returns {Promise<Object>} A promise that resolves to the response object from the Notion API.
 */
async function setTaskTime(taskid, time) {
  const response = await notion.pages.update({
    page_id: taskid, 
    properties: {
      "Time": {
        number: time
      }
    }
  });

  return response;
}
module.exports = {
  listAllItemsInDatabase, setTaskTime
};
