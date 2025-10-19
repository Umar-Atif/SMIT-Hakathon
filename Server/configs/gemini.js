const { GeminiClient } = require("gemini-sdk"); // agar official package

const client = new GeminiClient({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeFile = async (fileUrl, fileType) => {
  try {
    const response = await client.analyze({
      input: fileUrl,
      mode: "multimodal",
    });

    return {
      summary_en: response.summary || "No summary available",
      summary_ur: response.summary_roman_ur || "Summary Urdu not available",
      questions: response.questions || [],
    };
  } catch (error) {
    console.error("Gemini error:", error);
    return {
      summary_en: "AI analysis failed",
      summary_ur: "AI analysis failed",
      questions: [],
    };
  }
};

module.exports = { analyzeFile };
