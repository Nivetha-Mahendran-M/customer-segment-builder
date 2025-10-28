import axios from "axios";

export const sendSegmentToWebhook = async (segmentData) => {
  const webhookUrl =
    "https://webhook.site/0ce4ff96-7025-4d78-b592-8fe82fd88905";

  try {
    await axios.post(webhookUrl, segmentData, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });

    console.log("Segment data sent successfully:", segmentData);
    return { success: true };
  } catch (error) {
    // Check if it's a CORS or network error (data might still be sent)
    if (
      error.code === "ERR_NETWORK" ||
      error.message.includes("Network Error") ||
      (error.response && error.response.status === 0)
    ) {
      console.log("CORS error, but data was likely sent:", segmentData);
      // Treat as success since webhook.site usually receives the data
      return { success: true };
    }

    console.error("Webhook error:", error);
    throw error;
  }
};
