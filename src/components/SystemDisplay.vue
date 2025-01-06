<template>
  <table class="system_display">
    <thead>
      <tr>
        <th width="500px">Interface Display</th>
        <th>Interface Introduction</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <video controls>
            <source src="/images/sleepdata.mp4" type="video/mp4" />
          </video>
        </td>
        <td>
          <b>Sleep Data Page</b><br /><br />
          ◆ View sleep efficiency, sleep music, proportion of each sleep stage
          (awake, REM, light, and deep sleep)<br />
          ◆ Choose the satisfaction level with sleep music<br />
          ◆ View graphs of sleep efficiency changes over the past two weeks,
          average bedtime, average wake-up time, and average sleep duration<br />
          ◆ Choose the period trend chart to view (two weeks, one month, three
          months)
        </td>
      </tr>

      <tr>
        <td>
          <video controls>
            <source src="/images/sleepdiary.mp4" type="video/mp4" />
          </video>
        </td>
        <td>
          <b>Sleep Diary Page</b><br /><br />
          ◆ Enter and Edit sleep diary (whether they woke up, napped, consumed
          caffeine, drank alcohol, took sleep aids, or exercised, helping them
          record daily sleep habits )<br />
          ◆ View past sleep diary records
        </td>
      </tr>
      <tr>
        <td>
          <video controls>
            <source src="/images/alarmsetting.mp4" type="video/mp4" />
          </video>
        </td>
        <td>
          <b>Schedule Setting Page</b><br /><br />
          ◆ Setting wake-up and bedtime hours<br />
          ◆ Reminding users when it's time to wake up and go to sleep
        </td>
      </tr>
      <tr>
        <td>
          <img src="/images/Bedtime.png" />
          <img src="/images/VoiceAssistant.png" />
          <p class="fyi" style="font-size: 15px">*KoiBot voice assistant page</p>
        </td>
        <td>
          <b>Bedtime & Voice Assistant</b><br /><br />
          ◆ Users can use voice commands to control the voice robot from bed to
          start playing sleep music<br />
          ◆ During music playback, users can also use voice commands to pause,
          replay, or restart the music<br />
          ◆ Using voice command control to prevent blue light exposure before
          sleep, thereby enhancing sleep quality
        </td>
      </tr>
      <tr>
        <td>
          <img src="/images/Wakeup.png" />
          <img src="/images/WakeupPage.jpg" />
        </td>
        <td>
          <b>Wake-up Routine & Audio localization</b><br /><br />
          ◆ By utilizing the audio localization feature of KoiBot and the alarm
          function of Musleep, users are required to get out of bed in the
          morning and walk to a specific location, causing KoiBot’s screen to
          rotate more than 100 degrees to stop the alarm<br />
          ◆This method ensures
          that users actually get up, reduces time spent lying in bed, and
          improves sleep efficiency<br />
          <br />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.system_display {
  border: 3px solid #6a3e37;
}
thead tr {
  background: #ead7c4;
}
td video {
  width: 100%;
  height: auto;
}
.fyi {
  color: rgb(168, 17, 47);
  margin-top: -2px;
}
</style>
