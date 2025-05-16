import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const BASE = "http://127.0.0.1:5000"; // Flask local backend

const genAI = new GoogleGenerativeAI("AIzaSyDpFwW9W7-zWirtb-YxUvwbsQ37LKuuNvY");

// 🔹 1. Get Extracted Meaning using Gemini
export async function getExtractedMeaning(userInput) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Act like a semantic encoder and summarize the core meaning of the following sentence in a shorter, meaningful sentence. If the original message includes emotional or intentional qualities, preserve them; otherwise, focus solely on conveying the precise meaning: ${userInput}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// 🔹 2. Get Embedding from Flask API
export const getEmbedding = async (payload) => {
  const response = await axios.post(`${BASE}/embedding`,  payload );
  return response.data; // { embedding: [...] }
};

// 🔹 3. Send to Channel (adds Rayleigh noise, FEC, BPSK, Viterbi)
export const sendToChannel = async (payload) => {
  const response = await axios.post(`${BASE}/noisy_embedding`, payload);
  return response.data; // includes both noisy_embedding and bitstream
};


export const getReconstructedEmbeddings = async (payload) => {
  const response = await axios.post(`${BASE}/reconstructed_embedding`, payload);
  return {
    reconstructed_embedding: response.data.reconstructed_embedding,
    similarity: response.data.similarity,  // ✅ New field added here
  };
};


// 🔹 5. Decode message back from reconstructed embedding
export const reconstructMessage = async (payload) => {
  const response = await axios.post(`${BASE}/decode`, payload);
  return response.data; // { decoded_text: "..." }
};

// 🔹 Calculate Cosine Similarity
export const calculateSimilarity = async (payload) => {
  const response = await axios.post(`${BASE}/similarity`, payload);
  return response.data.similarity;  // float between 0 and 1
};

// 🔹 New function to fetch visualization image
export const getEmbeddingFlowPlot = async (payload) => {
  const response = await fetch("http://127.0.0.1:5000/visualize_embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const blob = await response.blob();
  return URL.createObjectURL(blob);  // 🔁 converts to image URL for frontend
};
