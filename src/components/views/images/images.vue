<template>
    <div id="images">

        <!--工具条-->
        <div class="toolbar" style="padding-bottom: 0px;padding-top:40px;">
            <el-form :inline="true">
                <!-- <el-form-item>
                    <el-input placeholder="文章标题"></el-input>
                </el-form-item> -->
                <el-form-item>
                    <el-date-picker v-model="selectDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="true">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addImage">新增</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div style="padding:20px">
            <el-row :gutter="20" class="imgList">
                <el-col :span="6" v-for="(item,index) in imgItems" :key="index" class="item">
                    <div class="imgYy" @click="imgView(item.src)">
                        <img :src="item.src+'?imageView2/2/h/200'" alt="">
                    </div>
                </el-col>
            </el-row>
        </div>

        <!-- 分页-->
        <div style="text-align:center;padding:20px;" v-if="isShowPage">
            <el-pagination background layout="prev, pager, next" :total="Math.ceil(total/10)*10" @current-change="CCpage"></el-pagination>
        </div>

        <!-- 图片上传 -->
        <el-dialog title="图片上传" :visible.sync="addArticle">
            <el-form :model="addImg">
                <el-form-item label="图片类型">
                    <el-select style="width:100%;" v-model="addImg.type" placeholder="请选择活动区域">
                        <el-option label="风景" value="fj"></el-option>
                        <el-option label="城市" value="cs"></el-option>
                        <el-option label="美食" value="ms"></el-option>
                        <el-option label="游戏" value="yx"></el-option>
                        <el-option label="电影" value="dy"></el-option>
                    </el-select>
                </el-form-item>

                <el-upload class="upload-demo" :multiple="true" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-change="changeFile" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false">

                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>

                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>

                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>

                </el-upload>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addArticle = false;imgList()">本次上次完毕</el-button>
                <!-- <el-button type="primary">确 定</el-button> -->
            </div>
        </el-dialog>

           <!-- 图片预览 -->
        <el-dialog title="图片预览" :visible.sync="dialogVisible" width="80%">

            <!-- <span>这是一段信息</span> -->
            <div style="text-align:center">
                <img :src="activeImgSrc" alt="">
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import _http from "../../common/http";

export default {
    name: "images",
    data() {
        return {
            activeImgSrc:"",
            dialogVisible:false,
            addArticle: false,
            selectDate: "",
            token: "",
            isShowPage: false,
            files: [],
            imgItems: [],
            total: "",
            addImg: {
                type: "fj"
            },
            reqData: {
                type: ""
            }
        };
    },
    created() {
        var type = this.$route.path.split("/").pop();
        this.reqData.type = type;
        this.addImg.type = type;
        console.log(type);
    },
    mounted() {
        this.getToken();
        this.imgList();
    },
    methods: {
        imgView(src){
            this.activeImgSrc = src;
            this.dialogVisible = true;
        },
        CCpage(numb) {
            console.log(numb);
            this.imgList(numb);
        },
        getToken() {
            _http.get(this, "image/uptoken").then(res => {
                this.token = res.body.uptoken;
            });
        },
        imgList(page) {
            var pageNumb = page || 1;
            var req = {
                page: pageNumb,
                rows: 12,
                type: this.reqData.type
            };
            _http.post(this, "image/listType", req).then(res => {
                var items = res.body.items;
                this.total = res.body.total;
                this.imgItems = items;
                this.isShowPage = true;
            });
        },
        addImage() {
            this.addArticle = true;
        },
        changeFile(file, fileList) {
            console.log(file);
            this.files.push(file.raw);
        },
        submitUpload() {
            var files = this.files;
            for (let i = 0; i < files.length; i++) {
                var item = files[i];
                this.updataImage(item);
            }
        },
        updataImage(file) {
            var fd = new FormData();
            fd.append(
                "key",
                Math.random()
                    .toString(36)
                    .substr(2) + file.name.match(/\.?[^.\/]+$/)
            );
            fd.append("token", this.token);
            fd.append("file", file);

            _http.postImg(this, "http://upload.qiniu.com/", fd).then(res => {
                var imgUrl = "http://image.zhanggongze.com/" + res.body.key;
                this.upImgApi(imgUrl);
            });
        },
        upImgApi(url) {
            var req = {
                src: url,
                type: this.addImg.type
            };
            _http.post(this, "image/create", req).then(res => {
                this.$message({
                    type: "success",
                    message: "图片上传成功!"
                });
            });
        },
        handleRemove(file, fileList) {
            console.log(fileList);
            var a = [];
            fileList.forEach(element => {
                a.push(element.raw);
            });
            this.files = a;
        },
        handlePreview(file) {
            console.log(file);
        }
    }
};
</script>

<style lang="scss">
#images{
        min-height: 780px;

}
.imgList {
    width: 100%;

    .el-col-6 {
        padding: 0 !important;
        .imgYy {
            cursor: pointer;
            margin: 0 10px 10px 0;
            overflow: hidden;
            min-height: 210px;
            box-shadow: 2px 2px 20px 1px #f0f0f0;
        }
        img {
            // margin: 10px;
            // width: 100%;
        }
    }
}
</style>

