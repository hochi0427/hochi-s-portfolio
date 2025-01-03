<template>
  <div class="card">
    <span class="card_text">
      {{ demonstrate.name }}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      demonstrate: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style>
.card{
  width:140px;
  height:50px;
  align-content: center;
}
.cards .active-link {
  border-radius: 6px;
  /* background: #CBB9A8;
  color:#6a3e37; */
  background: #6a3e37;
  color:white;
  /* border-bottom: 2px solid #6a3e37; */
}
</style>
