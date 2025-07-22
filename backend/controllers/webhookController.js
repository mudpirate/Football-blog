import User from "../models/userModel.js";
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("webhook secret needed");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    return res.status(400).json({
      message: "Webhook verification failed",
    });
  }

  console.log("Event data:", evt.data);

  if (evt.type === "user.created") {
    try {
      const data = evt.data;
      const newUser = new User({
        clerkUserId: data.id,
        username: data.username || data.first_name + data.last_name || data.id,
        email: data.email_addresses?.[0]?.email_address,
        img: data.profile_image_url,
      });

      await newUser.save();
      console.log("✅ User saved:", newUser._id);
    } catch (err) {
      console.error("❌ Error saving user:", err.message);
    }
  }
};
