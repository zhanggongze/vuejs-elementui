<template>
    <div id="articlesTpl">

        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;padding-top:40px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="文章标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="selectDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="showAddModel">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!-- table -->
        <el-table :data="tableData" stripe style="width: 100%" v-loading="listLoading">
            <el-table-column prop="title" label="标题" width="680">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="type" label="作者" width="180">
            </el-table-column>
            <el-table-column label="编辑">

                <template slot-scope="scope">
                    <el-button size="mini" @click="viewArticle(scope.$index, scope.row)">查看</el-button>
                    <el-button size="mini" @click="showEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteArticle(scope.$index, scope.row)">删除</el-button>
                </template>

            </el-table-column>
        </el-table>

        <!-- 分页 -->

        <!-- <div style="margin-top:30px;text-align:center">

<el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
</div> -->

        <el-dialog title="文章详情" :visible.sync="isShowArticle">
            <el-form :model="form">
                <h1 style="text-align:center;line-height:3"> {{articlInfor.title}}</h1>
                <p style="line-height:1.5">
                    {{articlInfor.content}}
                </p>
            </el-form>
        </el-dialog>

        <el-dialog title="文章编辑" :visible.sync="editArticle">
            <el-form :model="form">
                <el-form-item label="标题">
                    <el-input v-model="form.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" :rows="20" v-model="form.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editArticle = false">取 消</el-button>
                <el-button type="primary" @click="editPost()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加文章" :visible.sync="addArticle">
            <el-form :model="addform">
                <el-form-item label="文章类型">
                    <el-select style="width:100%;" v-model="addform.type" placeholder="请选择活动区域">
                        <el-option label="HTML" value="HTML"></el-option>
                        <el-option label="CSS" value="CSS"></el-option>
                        <el-option label="JavaScript" value="JavaScript"></el-option>
                        <el-option label="essay" value="essay"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="addform.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" :rows="15" v-model="addform.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addArticle = false">取 消</el-button>
                <el-button type="primary" @click="addArticleFn()">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import _http from "../../common/http";

export default {
    name: "articleszgz",
    data() {
        return {
            listLoading: false,
            reqData: {
                type: ""
            },
            articlInfor: {
                title: "",
                content: ""
            },
            isShowArticle: false,
            editArticle: false,
            addArticle: false,
            selectDate: "",
            articleContent: "",
            tableData: [],
            form: {
                title: "",
                content: ""
            },
            addform: {
                title: "",
                content: "",
                type: "HTML"
            },

            articleId: ""
        };
    },
    created() {
        this.reqData.type = this.$route.path.split("/").pop();
        this.addform.type =  this.$route.path.split("/").pop();
    },
    methods: {
        getList() {
            var token = sessionStorage.getItem("token");
            this.listLoading = true;

            _http
                .post(this, "article/listType", { type: this.reqData.type })
                .then(res => {
                    let items = res.body.items;

                    items.map(item => {
                        item.date = this.dateF(item.date);
                    });

                    this.tableData = items;

                    this.listLoading = false;
                });
        },
        showAddModel() {
            this.addArticle = true;
        },
        addArticleFn() {
            //提交编辑
            let req = JSON.stringify({
                title: this.addform.title,
                content: this.addform.content,
                type: this.addform.type
            });

            _http.post(this, "article/create/", req).then(res => {
                this.getList();
                this.addArticle = false;
                this.$message({
                    type: "success",
                    message: "创建成功!"
                });
            });
        },

        viewArticle(index, item) {
            this.isShowArticle = true;
            this.articlInfor.title = item.title;
            this.articlInfor.content = item.content;
        },
        showEdit(index, item) {
            this.editArticle = true;
            this.form.title = item.title;
            this.form.content = item.content;

            this.articleId = item._id;
        },
        editPost() {
            //提交编辑
            let req = JSON.stringify({
                title: this.form.title,
                content: this.form.content
            });

            _http
                .put(this, "article/update/" + this.articleId, req)
                .then(res => {
                    this.getList();
                    this.editArticle = false;
                    this.$message({
                        type: "success",
                        message: "修改成功!"
                    });
                });
        },

        deleteArticle(index, item) {
            let id = item._id;
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    _http.delete(this, "article/delete/" + id).then(res => {
                        this.getList();
                        this.editArticle = false;
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        dateF(val) {
            let oD = new Date(val);
            return (
                oD.getFullYear() +
                "-" +
                (oD.getMonth() + 1) +
                "-" +
                oD.getDate()
            );
        }
    },
    mounted: function() {
        this.getList();
    }
};
</script>

<style scoped lang="scss">
#articlesTpl {
    min-height: 780px;
}
</style>

