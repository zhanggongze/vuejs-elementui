<template>
  <div id="page404">
      <ul>
          <li>你的页面已经飞走了！！！！！</li>
      </ul>
  </div>
</template>
<script>
export default {
  name: "page404",
  data() {
    return {
      list: []
    };
  },
  mounted: function() {
    console.log("mounted！！！！");
  },
  methods: {

    article() {}
  }
};
</script>

<style lang="scss">
li {
  background-color: #eee;
}
</style>

