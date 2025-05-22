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
        <p class="spaced"><strong>Contributors :</strong><br /> </p>
        <p>
          Gaurav Sahay (IEC2021005)
        </p>
        <p class="sonali-spaced">Sonali Gupta (IEC2021007)</p>
      </div>
    </header>

    <nav class="nav-bar">
      <router-link to="/dashboard" class="nav-link" active-class="active-link" exact>Simulator Page</router-link>
      <router-link to="/about" class="nav-link" active-class="active-link">About</router-link>
    </nav>

    <main class="content">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p>Contact Us:</p>
        <p>
          <v-icon small>mdi-email</v-icon>
          Dr. Radhika Gour:
          <a href="mailto:radhika@iiita.ac.in">radhika@iiita.ac.in</a>
        </p>
        <p>
          <v-icon small>mdi-email</v-icon>
          Gaurav Sahay:
          <a href="mailto:iec2021005@iiita.ac.in">iec2021005@iiita.ac.in</a>
        </p>
        <p>
          <v-icon small>mdi-email</v-icon>
          Sonali Gupta:
          <a href="mailto:iec2021007@iiita.ac.in">iec2021007@iiita.ac.in</a>
        </p>
      </div>
    </footer>
  </v-app>
</template>

<script>
export default {
  name: 'OneView'
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
  flex-wrap: wrap;
}

.logo {
  height: 80px;
  flex-shrink: 0;
}

.titles {
  text-align: center;
  flex-grow: 1;
  min-width: 200px;
}

.titles h1 {
  margin: 0;
  font-size: 28px;
  color: #3F5BD9;
}

.titles h2 {
  margin: 0;
  font-size: 16px;
  color: #555;
}

.info {
  text-align: right;
  font-size: 14px;
  min-width: 150px;
}

.spaced {
  padding-right: 92px;
}

.sonali-spaced {
  padding-right: 6px;
}

.nav-bar {
  display: flex;
  justify-content: center;
  gap: 40px;
  background: white;
  border-bottom: 2px solid #ccc;
  font-family: 'Barlow';
  font-weight: 500;
  font-size: 18px;
  color: #3F5BD9;
  padding: 10px 0;
  user-select: none;
}

.nav-link {
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link:hover {
  background-color: #3F5BD9;
  color: white;
}

.active-link {
  background-color: #3F5BD9;
  color: white;
}

.content {
  padding: 30px;
  margin-bottom: 80px;
  min-height: calc(100vh - 270px);
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #3F5BD9;
  border-top: 2px solid #ccc;
  padding: 15px 30px;
  font-family: 'Barlow', sans-serif;
  text-align: center;
  color: white;
  font-size: 14px;
  user-select: none;
  flex-wrap: wrap;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  width: 100%;
}

.footer-content p {
  margin: 6px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  flex: 1 1 200px;
}

.footer-content a {
  color: white;
  text-decoration: none;
}

.footer-content a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: center;
    padding: 15px 10px;
    text-align: center;
  }

  .logo {
    height: 60px;
    margin-bottom: 10px;
  }
  .titles {
    min-width: auto;
    flex-grow: 0;
    margin-bottom: 10px;
  }

  .titles h1 {
    font-size: 22px;
  }

  .titles h2 {
    font-size: 14px;
  }

  .info {
    text-align: center;
    font-size: 13px;
    min-width: auto;
  }

  .spaced,
  .sonali-spaced {
    padding-right: 0;
  }

  .nav-bar {
    gap: 20px;
    font-size: 16px;
    padding: 8px 0;
  }

  .nav-link {
    padding: 6px 8px;
    border-radius: 4px;
  }

  .footer {
    padding: 15px 20px;
    display: none;
  }

  .footer-content {
    flex-direction: column;
    gap: 12px;
  }

  .footer-content p {
    flex: none;
    font-size: 13px;
  }
}
</style>