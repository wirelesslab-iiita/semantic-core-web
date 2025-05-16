<template>
  <v-app>
    <header class="header">
      <img :src="require('../assets/logo.png')" class="logo" alt="IIITA Logo" />
      <div class="titles">
        <h1>Semantic Communication System</h1>
        <h2>Indian Institute of Information Technology Allahabad</h2>
      </div>
      <div class="info">
        <p><strong>Supervisor :</strong> Dr. Radhika Gour</p>
        <p><strong class="spaced">Contributors :</strong><br />
          Gaurav Sahay (IEC2021005)
        </p>
        <p class="sonali-spaced">Sonali Gupta (IEC2021007)</p>
      </div>
    </header>

    <main class="content">
      <DashboardPage />
    </main>
  </v-app>
</template>

<script>
import DashboardPage from '../pages/DashboardPage.vue'

export default {
  name: 'OneView',
  components: { DashboardPage }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 15px 30px;
  font-family: 'Barlow';
  border-bottom: 2px solid #ccc;
}
.logo {
  height: 80px;
}
.titles {
  text-align: center;
  flex-grow: 1;
}
.titles h1 {
  margin: 0;
  font-size: 28px;
  color: #1f4ba5;
}
.titles h2 {
  margin: 0;
  font-size: 16px;
  color: #555;
}
.info {
  text-align: right;
  font-size: 14px;
}
.content {
  padding: 30px;
}
.spaced {
  padding-right: 92px;
}
.sonali-spaced {
  padding-right: 6px;
}
</style>
