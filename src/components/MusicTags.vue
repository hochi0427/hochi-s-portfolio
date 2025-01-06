<template>
  <h3>Recommendation System Based on Music Tag Analysis</h3>
  <div class="scroll-container">
    <p>
      Each song in the database is tagged with the music tags it possesses.
      Based on the songs a user listens to each day within a week, a ranking is
      assigned correlating to the user's sleep efficiency for that day, and tags
      are scored accordingly. On the day when sleep efficiency is highest within
      the week, the tags of the songs listened to that day receive an additional
      +3 points; the second highest day's tags receive +2 points, and so forth,
      with the lowest sleep efficiency day's song tags receiving -3 points.
      Additionally, based on the user's personal preferences, tags of songs
      liked by the user are multiplied by 1.2, while those disliked are
      multiplied by 0.8.
    </p>
    <img src="/images/MusicTags1.png" alt="Image 1" class="image" style="width:80%; height:auto"/>
    <p class="fyi" style="font-size: 15px">
      * Sleep Efficiency = (total sleep time / duration of the sleep episode) *
      100
    </p>
    <p>Totaling the weekly scores for the song tags.</p>
    <img
      src="/images/MusicTags2.png"
      alt="Image 2"
      class="image"
      style="width:90%; height:auto"
    />
    <p>
      Each song in the database is then scored based on the total tag scores
      divided by the total number of tags, yielding a song score. Once all songs
      have received their scores, they are standardized using the Z-score
      method.
    </p>
    <img
      src="/images/MusicTags3.png"
      alt="Image 3"
      class="image"
      style="width:90%; height:auto"
    />
  </div>
</template>

<style>
/* Personal Music */
.scroll-container {
  width: 100%; /* 設置容器寬度 */
  height: 560px; /* 設置容器高度 */
  overflow-y: auto; /* 使容器內容可垂直滾動 */
  border: 3px solid #ccc; /* 可選: 設置邊框以便看得清楚 */
}

.fyi {
  color: rgb(168, 17, 47);
  margin-top: -2px;
}
</style>
