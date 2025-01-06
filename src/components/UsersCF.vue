<template>
  <h3>User Collaborative Filtering for Sleep Music Recommendations</h3>
  <div class="scroll-container">
    <p>
      Our system enhances sleep music recommendations by considering various
      factors including <b>users' pre-sleep behaviors</b> and employing
      user-based collaborative filtering. We integrate data from behaviors
      influencing sleep music outcomes, such as coffee intake and medication
      use, based on sleep diaries from institutions like NTU Hospital.
      <br />
      <br />
      By standardizing user data and calculating similarities with
      <b>Cosine Similarity</b>, we identify users with similar patterns and
      select the top five as recommenders.
    </p>
    <img src="/images/UsersCF1.png" alt="Image 1" class="image" style="width:650px"/>
    <p>
      The recommendation effectiveness is quantified by scoring the sleep music
      these recommenders listened to over the last week. The total score for
      each song reflects its recommendation strength within our algorithm.
    </p>
    <img src="/images/UsersCF2.png" alt="Image 2" class="image" style="width:650px"/>
  </div>
</template>
<style>
.scroll-container {
  width: 100%; /* 設置容器寬度 */
  height: 560px; /* 設置容器高度 */
  overflow-y: auto; /* 使容器內容可垂直滾動 */
  border: 3px solid #ccc; /* 可選: 設置邊框以便看得清楚 */

}

</style>
