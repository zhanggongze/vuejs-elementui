<template>
  <div id="side" v-bind:class="{ collapseL: isCollapse}">
      
    <el-menu default-active="3" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">

    <router-link to="/home">
        <el-menu-item index="3">
            <i class="el-icon-sort"></i>
            <span slot="title">数据统计</span>
        </el-menu-item>
    </router-link>

    <el-submenu index="1">

        <template slot="title">
        <i class="el-icon-document"></i>
        <span slot="title">文章管理</span>
        </template>

        <el-menu-item-group>

        <router-link to="/articles/HTML">
            <el-menu-item index="1-1"> HTML</el-menu-item>
        </router-link>
        <router-link to="/articles/CSS">
            <el-menu-item index="1-2">CSS</el-menu-item>
        </router-link>
        <router-link to="/articles/JavaScript">
            <el-menu-item index="1-3">JavaScript</el-menu-item>
        </router-link>
        <router-link to="/articles/essay">
            <el-menu-item index="1-4">随笔</el-menu-item>
        </router-link>
        
        </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2">

        <template slot="title">
        <i class="el-icon-picture"></i>
        <span slot="title">图片管理</span>
        </template>

        <el-menu-item-group>
            <router-link to="/image/fj">
                <el-menu-item index="2-1">风景</el-menu-item>
            </router-link>
            <router-link to="/image/cs">
                <el-menu-item index="2-2">城市</el-menu-item>
            </router-link>
            <router-link to="/image/ms">
                <el-menu-item index="2-3">美食</el-menu-item>
            </router-link>
            <router-link to="/image/yx">
                <el-menu-item index="2-4">游戏</el-menu-item>
            </router-link>
            <router-link to="/image/dy">
                <el-menu-item index="2-5">电影</el-menu-item>
            </router-link>
        </el-menu-item-group>
    </el-submenu>

    <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
    </el-menu-item>

    </el-menu>
  </div>
</template>
<script>
export default {
  props: ["isCollapse"],
  data() {
    return {
      //   isCollapse: false
    };
  },
  created() {
    console.log("side");
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
#side {
  flex: 0 0 230px;
  width: 230px;
  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  .el-menu-vertical-demo {
    min-height: 100%;
    background-color: #eee;
    transition: 0ms;
  }
}
.collapseL {
  width: 64px !important;
  flex: 0 0 64px !important;
}
</style>


