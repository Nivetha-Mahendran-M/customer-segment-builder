import axios from "axios";

export const sendSegmentToWebhook = async (segmentData) => {
  const webhookUrl =
    "https://webhook.site/0ce4ff96-7025-4d78-b592-8fe82fd88905";

  try {
    const response = await axios.post(webhookUrl, segmentData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Webhook response:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Webhook error:", error);
    throw error;
  }
};
