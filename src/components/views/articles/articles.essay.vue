<template>
    <div id="articles">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>随笔列表</el-breadcrumb-item>
        </el-breadcrumb>

        <articles-templet></articles-templet>
    </div>
</template>
<script>
import articlesTemplet from "./articlesTemplet.vue";

export default {
    components: { articlesTemplet }
};
</script>

