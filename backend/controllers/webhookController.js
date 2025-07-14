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
  console.log("Webhook received:", evt); // ← Check this
  console.log("Event data:", evt.data);

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username,
      email: evt.data.email_addresses[0].email_address,

      img: evt.data.profile_img_url,
    });

    await newUser.save();
  }
  return res.status(200).json({
    message: "webhook received",
  });
};
