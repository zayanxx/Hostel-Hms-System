// utils/notificationHelper.js
import Notification from "../models/Notification.js";

export const sendNotification = async (userId, message, type = "info") => {
  try {
    const notification = new Notification({
      user: userId,
      message,
      type,
    });

    await notification.save();
    console.log("🔔 Notification sent to user:", userId);
  } catch (error) {
    console.error("❌ Error sending notification:", error.message);
  }
};