const { createHmac } = require("crypto");
require('dotenv').config()

// Validasi Request
const verificationToken = process.env.NOTION_WEBHOOK_KEY;

const calculatedSignature = `sha256=${createHmac("sha256", verificationToken)
  .update(
    JSON.stringify({
      type: "page.content_updated",
      entity: {
        id: "28230f0e-6f0d-8003-9b8f-c48e3fc4439c",
        type: "page",
      },
    })
  )
  .digest("hex")}`;

console.log(calculatedSignature);
