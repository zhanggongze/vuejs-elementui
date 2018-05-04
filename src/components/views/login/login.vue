<template>

    <div id="login">

        <div class="bg"></div>

        <el-form class="form" ref="form" :model="form" @keyup.enter.native="show($event)">

            <div class="head">
                <h2>系统登录</h2>
            </div>

            <el-input placeholder="请输入用户名" v-model="form.name"></el-input>
            <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
            <el-form-item>
                <el-checkbox label="记住密码" name="type" :checked="true"></el-checkbox>
            </el-form-item>

            <el-button type="primary" @click="onSubmit" :loading="loading">登录</el-button>
            <el-button @click="dialogFormVisible = true">注册</el-button>

            <div class="foot">
                <p>版权所有 zhanggongze © 2017-2027。</p>
            </div>

        </el-form>

        <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
            <el-form :model="formRes">
                <el-form-item label="用户名称" :label-width="formLabelWidth">
                    <el-input v-model="formRes.name" auto-complete="off" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" :label-width="formLabelWidth">
                    <el-input type="password" v-model="formRes.password" auto-complete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;onRegister()">注册</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
export default {
    name: "login",
    data() {
        return {
            dialogFormVisible: false,
            formLabelWidth: "120px",
            msg: "Welcome to Your Vue.js App",
            form: {
                name: "",
                password: ""
            },
            formRes: {
                name: "",
                password: ""
            },
            loading: false
        };
    },
    mounted() {
        //生命周期
    },
    methods: {
        show: function(ev) {
            if (ev.keyCode == 13) {
                // alert("你按回车键了");
                this.onSubmit();
            }
        },
        goArt() {
            //路由跳转
            this.$router.push({
                path: "articles",
                query: { name: "zgz", age: 12 }
            });
        },
        onRegister() {
            this.$http
                .post("https://www.zhanggongze.com/api/login/register", {
                    name: this.formRes.name,
                    password: this.formRes.password
                })
                .then(function(response) {
                    // console.log(res);
                     this.$message.success(response.body.success);

                })
                .catch(function(error) {
                    this.$message.error(error.body.error);
                });
        },
        onSubmit() {
            this.loading = true;

            this.$http
                .post("https://www.zhanggongze.com/api/login/auth", {
                    name: this.form.name,
                    password: this.form.password
                })
                .then(function(response) {
                    console.log(response.body);
                    var o = response.body;
                    this.$router.push({ path: "home" });

                    sessionStorage.setItem("token", o.token);
                    sessionStorage.setItem("name", this.form.name);
                })
                .catch(function(error) {
                    this.loading = false;
                    this.$message.error(error.body.ret_msg);
                    console.log(error.body.ret_msg);
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang = "scss">
#login {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../../assets/wallhaven-625518.jpg");
    background-size: 100% 100%;
    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .form {
        width: 480px;
        left: 50%;
        padding: 300px 30px 0 30px;
        position: absolute;
        height: 100%;
        box-sizing: border-box;
        z-index: 9;
        background-color: rgba(255, 255, 255, 0.2);
        input {
            margin-bottom: 20px;
        }
        .head {
            position: absolute;
            top: 200px;
            left: 20px;
            color: #eee;
        }
        .foot {
            width: 420px;
            position: absolute;
            bottom: 0;
            color: #999;
            line-height: 30px;
            text-align: center;
            padding-bottom: 20px;
        }
        .el-checkbox__label {
            color: #fff;
            &:hover {
                color: #ddd;
            }
        }
    }
}
</style>
