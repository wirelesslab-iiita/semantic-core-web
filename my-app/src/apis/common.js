import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const BASE = process.env.VUE_APP_API_URL;

const genAI = new GoogleGenerativeAI(process.env.VUE_APP_GEMINI_API_KEY);

export async function getExtractedMeaning(userInput) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Act like a semantic encoder and summarize the core meaning of the following sentence in a shorter, meaningful sentence. If the original message includes emotional or intentional qualities, preserve them; otherwise, focus solely on conveying the precise meaning: ${userInput}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export const getEmbedding = async (payload) => {
  const response = await axios.post(`${BASE}/embedding`,  payload );
  return response.data;
};

export const sendToChannel = async (payload) => {
  const response = await axios.post(`${BASE}/noisy_embedding`, payload);
  return response.data;
};

export const getReconstructedEmbeddings = async (payload) => {
  const response = await axios.post(`${BASE}/reconstructed_embedding`, payload);
  return {
    reconstructed_embedding: response.data.reconstructed_embedding,
    similarity: response.data.similarity,
  };
};

export const reconstructMessage = async (payload) => {
  const response = await axios.post(`${BASE}/decode`, payload);
  return response.data;
};

export const calculateSimilarity = async (payload) => {
  const response = await axios.post(`${BASE}/similarity`, payload);
  return response.data.similarity;
};

export const getEmbeddingFlowPlot = async (payload) => {
  const response = await fetch(`${BASE}/visualize_embeddings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
