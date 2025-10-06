const { createHmac } = require("crypto");
require('dotenv').config()

// Validasi Request
const verificationToken = process.env.NOTION_WEBHOOK_KEY;

const calculatedSignature = `sha256=${createHmac("sha256", verificationToken)
  .update(
    JSON.stringify({
      type: "page.content_updated",
      entity: {
        id: "28430f0e-6f0d-80da-8d2a-d4a792b12221",
        type: "page",
      },
      data: {
        parent: {
          id: '',
          type: 'database',
          data_source_id: '27c30f0e-6f0d-81fc-bf7c-000b7d2f8bf0'
        }
      }
    })
  )
  .digest("hex")}`;

console.log(calculatedSignature);
