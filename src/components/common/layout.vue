<template>
    <div id="layout">

        <headC :isCollapse="isCollapse" v-on:increment="incrementTotal"></headC>
        <div class="main">

            <side :isCollapse="isCollapse"></side> 
            <div class="containerL">
                <div class="content">
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
                <foot></foot>
            </div>

        </div>

    </div>
</template>

<script>
import headC from "./headC.vue";
import foot from "./foot.vue";
import side from "./side.vue";

export default {
  data() {
    return {
      isCollapse: false
    };
  },
  components: {
    headC,
    foot,
    side
  },
  methods: {
    incrementTotal: function(data) {
      console.log(data);
      this.isCollapse = data;
    }
  }
};
</script>
<style lang="scss" scoped>
#layout {
  .main {
    width: 100%;
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow: hidden;
    .containerL {
      flex: 1;
      overflow-y: auto;
      .content {
        padding: 40px 30px 30px 30px;
      }
    }
  }
}
</style>
