<template>
    <div id="articles">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>图片管理</el-breadcrumb-item>
            <el-breadcrumb-item>电影</el-breadcrumb-item>
        </el-breadcrumb>
        <images></images>
    </div>
</template>
<script>
import images from "./images.vue";

export default {
    components: { images }
};
</script>
