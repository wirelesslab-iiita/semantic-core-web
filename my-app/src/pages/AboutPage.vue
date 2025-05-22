<template>
  <div class="about-container">
    <h1>About Semantic Communication System</h1>
    <p>
      This project is developed at the Indian Institute of Information Technology Allahabad under the supervision of Dr. Radhika Gour.
    </p>
    <p>
      Contributors: Gaurav Sahay (IEC2021005), Sonali Gupta (IEC2021007)
    </p>
    <p>
      The system demonstrates semantic communication concepts including embedding generation, channel simulation, and reconstruction.
    </p>
    <div class="pdf-container" v-if="pdfLink">
      <iframe
        :src="pdfLink"
        frameborder="0"
        width="100%"
        height="600px"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  computed: {
    pdfLink() {
      return process.env.VUE_APP_GOOGLE_DRIVE_PDF_LINK || ''
    }
  }
}
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 40px auto;
  font-family: 'Barlow', sans-serif;
  color: #3F5BD9;
  padding: 20px;
}

.about-container h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.about-container p {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 15px;
}

.pdf-container {
  margin-top: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}
</style>
