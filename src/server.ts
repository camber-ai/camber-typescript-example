/*
    Simple express server to handle webhooks from Camber. You can use ngrok to test 
    this in your local environment.
*/

import express from "express";
import { Webhook } from "svix";
import bodyParser from "body-parser"; // we use this because the body is raw from svix
import { getVerification } from "./apiClient";
import { CamberWhEvent } from "./types";

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_SECRET = process.env.CAMBER_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  throw new Error("CAMBER_WEBHOOK_SECRET is not set");
}

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;
    const headers = req.headers;
    const wh = new Webhook(WEBHOOK_SECRET);
    try {
      const headers = req.headers as Record<string, string>;
      const msg = wh.verify(payload, headers) as CamberWhEvent;
      const eventType = msg.event_type;

      switch (eventType) {
        case "verification.completed":
          const verification = await getVerification(msg.verification_id);
          console.log(verification);
          break;

        case "verification.failed":
          // send for human review or something else
          console.log("Verification failed:", msg);
          break;

        default:
          console.log("Unknown event type:", eventType);
          break;
      }

      return res.json({ success: true });
    } catch (err) {
      console.error("Webhook verification failed:", err);
      res.status(400).json({ error: "Webhook verification failed" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
