<template>
    <div id="headC">
        <div class="left" v-bind:class="{ collapseL: isCollapse}">
            <div class="log" v-if="!isCollapse">BlogSystem</div>
            <div class="log" v-if="isCollapse">Blog</div>
            <i class="el-icon-menu" @click="closeMenu()"></i>
        </div>
        <div class="right">
            <div class="userInfor">
                <!-- <img src="../../assets/3.png" alt="">
              <span>{{name}}</span> -->

                <el-dropdown trigger="click">
                    <span class="el-dropdown-link" style="display: inline-block;">
                        <img src="../../assets/3.png" alt="">
                        <span style="color:#fff;padding:0 6px; ">{{name}}</span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <router-link to="/">
                            <el-dropdown-item>
                                注销
                            </el-dropdown-item>
                        </router-link>
                        <router-link to="/">
                            <el-dropdown-item>
                                切换账号
                            </el-dropdown-item>
                        </router-link>
                        <router-link to="/">
                            <el-dropdown-item>
                                退出
                            </el-dropdown-item>
                        </router-link>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>

            <!-- <i class="el-icon-setting"></i> -->
        </div>
    </div>
</template>
<script>
export default {
    props: ["isCollapse"],
    data() {
        return {
            name: ""
        };
    },
    methods: {
        closeMenu() {
            var _is = !this.isCollapse;
            this.$emit("increment", _is);
        }
    },
    created: function() {
        //获取用户信息
        let userName = sessionStorage.getItem("name");

        this.name = userName;
    }
};
</script>

<style scoped lang="scss">
#headC {
    width: 100%;
    height: 60px;
    background-color: #409eff;
    .left {
        position: relative;
        width: 230px;
        border-right: 1px solid rgba(255, 255, 255, 0.4);
        float: left;
        .log {
            line-height: 60px;
            font-size: 18px;
            color: #fff;
            text-align: center;
        }
        i {
            font-size: 26px;
            color: #fff;
            position: absolute;
            top: 18px;
            right: -42px;
            cursor: pointer;
            &:hover {
                color: rgba(255, 255, 255, 0.8);
            }
        }
        &:after {
            visibility: hidden;
            clear: both;
            display: block;
            height: 0px;
            content: ".";
        }
    }
    .collapseL {
        width: 64px;
    }
    .right {
        height: 60px;
        float: right;
        cursor: pointer;
        .userInfor {
            line-height: 60px;
            color: #fff;
            padding-right: 20px;
            img {
                width: 40px;
                vertical-align: middle;
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.4);
            }
            &:hover {
                color: rgba(255, 255, 255, 0.6);
            }
        }
    }
}

.el-dropdown-menu {
    a {
        text-decoration: none;
        li{
            background-color: #fff;
        }
    }
}
</style>


