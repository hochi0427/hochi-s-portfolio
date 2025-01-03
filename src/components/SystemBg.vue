<template>
  <table class="background_info">
    <thead>
      <tr>
        <th width="500px">Devices</th>
        <th>Introduction</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <img src="/images/KoiBot.png" />
        </td>
        <td>
          <b>KoiBot Robot</b><br /><br />
          ◆ Integrate various practical functionalities through APIs/SDKs<br />
          ◆ Features a powerful built-in voice assistant<br />
          ◆ Audio localization and automatic screen orientation adjustment<br /><br />
          <a
            href="https://www.qnap.com/en-as/news/2020/qnap-new-ai-commercial-robot-koibot-drives-modern-business-digital-transformation-with-feature-rich-applications"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa-solid fa-arrow-up-right-from-square" />&nbsp;&nbsp;
            Product Page</a
          >
        </td>
      </tr>

      <tr>
        <td>
          <img src="/images/smartwatch.png" />
        </td>
        <td>
          <b>Samgsung Galaxy Watch Active2 </b><br /><br />
          ◆ Provide official site for developers with guides, API references,
          and samples<br />
          ◆ Using heart rate and triaxial sensors to determine whether the user
          is currently wearing the watch, and recording various sleep data based
          on the detected sleep states<br /><br />
          <a
            href="https://www.samsung.com/tw/business/watches/galaxy-watch-active/galaxy-watch-active2-r820-sm-r820nzsabri/"
            target="_blank"
            rel="noopener noreferrer"
            ><i class="fa-solid fa-arrow-up-right-from-square" />&nbsp;&nbsp;
            Product Page</a
          >
        </td>
      </tr>
      <tr>
        <td>
          <img src="/images/Musleep.png" />
          <p class="fyi" style="font-size: 15px">*musleep Homepage</p>
        </td>
        <td>
          <b>Musleep Application </b><br /><br />
          ◆ Collects and analyzes users' sleep data, using visual charts to help
          users easily understand their sleep conditions<br />
          ◆ Guided by sleep education recommendations, the system provides
          personalized activity suggestions based on sleep diary, aiding users
          in developing good sleep habits and addressing sleep issues<br />
          ◆ Designed with a unique
          <router-link to="/project/1/musleep/personal_music"
            ><i
              class="fa-solid fa-arrow-up-right-from-square"
            />&nbsp;&nbsp;music recommendation system </router-link
          ><br /><br />
          <router-link to="/project/1/musleep/system_display"
            ><i class="fa-solid fa-arrow-up-right-from-square" />&nbsp;&nbsp;
            System Display</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.background_info {
  border: 3px solid #6a3e37;
}
thead tr {
  background: #cbb9a8;
}
td img {
  width: 100%;
  height: auto;
}
td a,
td i {
  text-decoration-line: underline;
}
.fyi {
  color: rgb(168, 17, 47);
  margin-top: -2px;
}
</style>
