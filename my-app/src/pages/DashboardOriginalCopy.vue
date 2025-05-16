<template>
    <div class="box-container">
      <DataBox :reset="resetInput" @submit="handleSubmit_1_to_2" :title="'Enter Input Message'" :button-text="'Submit'" :data="data_box_1"/>
      <LoadingComponent  :loading="loading_from_1_to_2" :status="status_from_1_to_2"/>
      <DataBox @submit="handleSubmit_2_to_3" :title="'Extracted Meaning'" :status="status_from_1_to_2" :button-text="'Convert to Embedding'" :data="data_box_2"/>
      
      <LoadingComponent :loading="loading_from_2_to_3" :status="status_from_2_to_3"/>
      <DataBox @submit="handleSubmitChannel" :title="'Embedding Vector'" :status="status_from_2_to_3" :button-text="'Send to Channel'" :data="data_box_3"/>
    </div>
  
    <div class="channel-wrapper">
      <div class="channel">
        <div class="block">
        <div class="text">Channel</div>
  
        <div class="snr-selector">
          <label for="snr">Select SNR:</label>
          <select id="snr" v-model="snr">
            <option value="0">0 dB</option>
            <option value="2">2 dB</option>
            <option value="4">4 dB</option>
            <option value="6">6 dB</option>
            <option value="8">8 dB</option>
            <option value="12">12 dB</option>
            <option value="16">16 dB</option>
            <option value="20">20 dB</option>
          </select>
        </div>
  
        <div class="logs">
          <div>{{ current_channel_log }}</div>
          <div v-if="loading_channel">
            <v-progress-circular
              indeterminate
              color="#3F5BD9"
              :size="26"
              :width="4"
            />
          </div>
        </div>
  
        <v-btn class="reset-btn" variant="outlined" color="white" @click="handleReset" small>
          🔄 Reset
        </v-btn>
      </div>
      </div>
    </div>
  
  
    <div class="box-container">
      <DataBox @submit="handleSubmit_4_to_5" :status="status_channel" :title="'Noisy  Embedded Vector'" :button-text="'Reconstruct'" :data="data_box_4"/>
      <LoadingComponent :loading="loading_from_4_to_5" :status="status_from_4_to_5"/>
      <DataBox @submit="handleSubmit_5_to_6" :status="status_from_4_to_5" :title="'Reconstructed Embedded Vector'" :button-text="'Convert to text'" :data="data_box_5"/>
      <LoadingComponent :loading="loading_from_5_to_6" :status="status_from_5_to_6"/>
      <DataBox @submit="handleSubmit_Similarity" :status="status_from_5_to_6" :title="'Reconstructed Text'" :button-text="'Observations'" :data="data_box_6"/>
    </div>
  
    <div v-if="similarity !== '0.00'" class="similarity-box">
      <p>🧠 <strong>Semantic Similarity Score:</strong> {{ similarity }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import DataBox from '../components/DataBox.vue';
  import LoadingComponent from '../components/LoadingComponent.vue';
  import { getEmbedding, getExtractedMeaning, getReconstructedEmbeddings, reconstructMessage, sendToChannel, calculateSimilarity } from '../apis/common';
  
  export default {
  name: 'DashboardPage',
  
  components: {
    DataBox,
    LoadingComponent,
  },
  
  setup() {
  const data_box_1 = ref({
    type: 'input-text',
  });
  
  const data_box_2 = ref({
    type: 'output-text',
    message: '💡 The extracted meaning from your sentence will appear here.',
  });
  
  const data_box_3 = ref({
    type: 'output-text',
    message: '🧠 The semantic embedding vector will be shown here.',
  });
  
  const data_box_4 = ref({
    type: 'output-text',
    message: '📡 The noisy embedding vector received after channel transmission will appear here.',
  });
  
  const data_box_5 = ref({
    type: 'output-text',
    message: '🔧 Reconstructed embedding from the noisy signal will be displayed here.',
  });
  
  const data_box_6 = ref({
    type: 'output-text',
    message: '📝 The final reconstructed text will appear here for evaluation.',
  });
  
  const message = ref('');
  const embeddings = ref([]);
  const snr = ref(4);
  const noisy_embeddings = ref([]);
  const reconstructed_embeddings = ref([]);
  
  const loading_channel = ref(false);
  const loading_from_1_to_2 = ref(false);
  const loading_from_2_to_3 = ref(false);
  const loading_from_4_to_5 = ref(false);
  const loading_from_5_to_6 = ref(false);
  
  const status_from_1_to_2 = ref('pending');
  const status_from_2_to_3 = ref('pending');
  const status_from_4_to_5 = ref('pending');
  const status_from_5_to_6 = ref('pending');
  const status_channel = ref('pending');
  
  const log_messages = [
    "📦 Flattening the high-dimensional embedding into a 1D array.",
    "🔢 Quantizing the float values to 8-bit integers using uniform quantization.",
    "💡 Converting quantized integers to a binary bitstream (8 bits per byte).",
    "📡 Applying Convolutional FEC Encoding (polynomials 133, 171) to add redundancy.",
    "🧿 Modulating the bitstream using BPSK (1 → +1, 0 → -1).",
    "🌫️ Passing modulated signal through Rayleigh fading channel (random h and noise n).",
    "📶 Applying MMSE equalization to reverse channel effects using estimated channel gains.",
    "🧮 Demodulating received signal (BPSK hard decision → 1 if real > 0, else 0).",
    "🧠 Running Viterbi decoding to recover original bitstream from FEC-encoded signal.",
    "🧼 Converting decoded bitstream back into quantized integers (every 8 bits = 1 byte).",
    "🔄 Dequantizing integers to reconstruct approximate noisy float values.",
    "🧊 Reshaping the flat array back into the original embedding shape.",
    "✅ Done: Noisy embedding vector is ready for further decoding!"
  ];
  const current_channel_log = ref('');
  
  const showLogs = () => {
  return new Promise((resolve) => {
    let index = 0;
    const interval = setInterval(() => {
      current_channel_log.value = log_messages[index];
      index++;
      if (index >= log_messages.length - 1) {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
  };
  
  
  const handleSubmit_1_to_2 = async (userInput) => {
    try {
      message.value = userInput;
      loading_from_1_to_2.value = true;
      data_box_2.value.message = "🛠️ Extracting meaning from your sentence...";
  
      const meaning = await getExtractedMeaning(userInput);
      data_box_2.value.message = meaning;
    } catch (err) {
      data_box_2.value.message = "❌ Failed to extract meaning.";
      console.error(err);
    } finally {
      loading_from_1_to_2.value = false;
      status_from_1_to_2.value = 'completed';
    }
  };
  
  const handleSubmit_2_to_3 = async () => {
    try {
      const payload = { text: message.value };
      loading_from_2_to_3.value = true;
      data_box_3.value.message = "📥 Generating semantic embeddings...";
  
      const resp = await getEmbedding(payload);
      embeddings.value = resp?.embedding;
      data_box_3.value.message = embeddings.value;
    } catch (err) {
      data_box_3.value.message = "❌ Failed to generate embeddings.";
      console.error(err);
    } finally {
      loading_from_2_to_3.value = false;
      status_from_2_to_3.value = 'completed';
    }
  };
  
  const handleSubmitChannel = async () => {
    try {
      const payload = {
        text: message.value,
        snr: snr.value,
      };
      loading_channel.value = true;
      data_box_4.value.message = "📡 Simulating channel transmission. Please wait...";
  
      await showLogs();
  
      const resp = await sendToChannel(payload);
      noisy_embeddings.value = resp?.noisy_embedding;
      data_box_4.value.message = noisy_embeddings.value;
      current_channel_log.value = log_messages[log_messages.length - 1];
  
    } catch (err) {
      data_box_4.value.message = "❌ Failed to simulate the channel.";
      console.error(err);
    } finally {
      loading_channel.value = false;
      status_channel.value = 'completed';
    }
  };
  
  
  const handleSubmit_4_to_5 = async () => {
    try {
      const payload = {
        noisy_embedding: noisy_embeddings.value,
        snr: snr.value,
      };
      loading_from_4_to_5.value = true;
      data_box_5.value.message = "🔧 Reconstructing embeddings from noisy input...";
  
      const resp = await getReconstructedEmbeddings(payload);
      reconstructed_embeddings.value = resp?.reconstructed_embedding;
      data_box_5.value.message = reconstructed_embeddings.value;
    } catch (err) {
      data_box_5.value.message = "❌ Failed to reconstruct embeddings.";
      console.error(err);
    } finally {
      loading_from_4_to_5.value = false;
      status_from_4_to_5.value = 'completed';
    }
  };
  
  const handleSubmit_5_to_6 = async () => {
    try {
      const payload = {
        reconstructed_embedding: reconstructed_embeddings.value,
        original_text: message.value,
      };
      loading_from_5_to_6.value = true;
      data_box_6.value.message = "🔄 Converting reconstructed embeddings back to text...";
  
      const resp = await reconstructMessage(payload);
      const reconstructed_text = resp?.decoded_text;
      data_box_6.value.message = reconstructed_text;
    } catch (err) {
      data_box_6.value.message = "❌ Failed to decode the text.";
      console.error(err);
    } finally {
      loading_from_5_to_6.value = false;
      status_from_5_to_6.value = 'completed';
    }
  };
  const resetInput = ref(true);
  
  const loading_similarity = ref(false);
  const similarity = ref('0.00');
  const handleSubmit_Similarity = async () => {
    try {
      const payload = {
        reconstructed_embedding: reconstructed_embeddings.value,
        original_embedding: embeddings.value,
      };
      loading_similarity.value = true;
  
      const resp = await calculateSimilarity(payload);
      similarity.value = resp;
    } catch (err) {
      console.error(err);
    } finally {
      loading_similarity.value = false;
    }
  }
  const handleReset = () => {
    message.value = '';
    resetInput.value = !resetInput.value;
    embeddings.value = [];
    noisy_embeddings.value = [];
    reconstructed_embeddings.value = [];
    data_box_1.value = { type: 'input-text' };
    data_box_2.value.message = '💡 The extracted meaning from your sentence will appear here.';
    data_box_3.value.message = '🧠 The semantic embedding vector will be shown here.';
    data_box_4.value.message = '📡 The noisy embedding vector received after channel transmission will appear here.';
    data_box_5.value.message = '🔧 Reconstructed embedding from the noisy signal will be displayed here.';
    data_box_6.value.message = '📝 The final reconstructed text will appear here for evaluation.';
    loading_channel.value = false;
    loading_from_1_to_2.value = false;
    loading_from_2_to_3.value = false;
    loading_from_4_to_5.value = false;
    loading_from_5_to_6.value = false;
    status_from_1_to_2.value = 'pending';
    status_from_2_to_3.value = 'pending';
    status_from_4_to_5.value = 'pending';
    status_from_5_to_6.value = 'pending';
    status_channel.value = 'pending';
    current_channel_log.value = '';
    snr.value = 4;
  };
  
  
  return {
    data_box_1,
    data_box_2,
    data_box_3,
    data_box_4,
    data_box_5,
    data_box_6,
    handleSubmit_1_to_2,
    handleSubmit_2_to_3,
    handleSubmit_4_to_5,
    handleSubmit_5_to_6,
    handleSubmitChannel,
    loading_from_1_to_2,
    loading_from_2_to_3,
    loading_from_4_to_5,
    loading_from_5_to_6,
    loading_channel,
    status_from_1_to_2,
    status_from_2_to_3,
    status_from_4_to_5,
    status_from_5_to_6,
    status_channel,
    resetInput,
    snr,
    log_messages,
    current_channel_log,
    handleReset,
    handleSubmit_Similarity,
    similarity,
  };
  }
  ,
  }
  </script>
  
  <style scoped>
  .box-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  align-content: center;
  }
  .channel {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  }
  .channel-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  }
  .reset-btn {
  margin-left: 4px;
  color: #3F5BD9;
  }
  .block {
  background-color: #3F5BD9;
  width: 80vw;
  height: 50px;
  border-radius: 2px;
  display: flex;
  padding: 8px 12px 8px 12px;
  }
  .block .text {
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  font-family: 'Barlow';
  font-size: 26px;
  font-weight: 500;
  width: 30%;
  }
  .logs {
  display: flex;
  background-color: #F0F0F0;
  width: 100%;
  border-radius: 2px;
  justify-content: space-between;
  padding: 6px;
  font-size: 14px;
  }
  .snr-selector {
  margin: 10px 0;
  display: flex;
  gap: 8px;
  align-items: center;
  color: white;
  width: 30%;
  font-family: 'Barlow';
  font-weight: 500;
  }
  .snr-selector select {
  padding: 4px 6px;
  border-radius: 4px;
  background-color: white;
  width: 70px;
  }
  .similarity-box {
  background-color: #e8f0ff;
  border-left: 6px solid #3F5BD9;
  margin: 24px auto;
  padding: 16px;
  width: 90%;
  font-family: 'Barlow';
  font-size: 16px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px;
  }
  </style>