<template>
  <div id="home">

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
        <h1 class="h1">文章统计</h1>
        <div class="panel">
            
            <div class="item">

                <div class="itemContent">
                    <div class="itemTop">
                        <div class="radius"><i class="el-icon-edit-outline"></i></div>
                        <div class="title">HTML</div>
                    </div>
                    <p class="number">{{random()}}</p>
                    <p class="descritption">+{{randomTwo()}}%相比上个月</p>
                </div>

            </div>
            <div class="item">

                <div class="itemContent">
                    <div class="itemTop">
                        <div class="radius"><i class="el-icon-edit-outline"></i></div>
                        <div class="title">CSS</div>
                    </div>
                    <p class="number">{{random()}}</p>
                    <p class="descritption">+{{randomTwo()}}%相比上个月</p>
                </div>

            </div>
            <div class="item">

                <div class="itemContent">
                    <div class="itemTop">
                        <div class="radius"><i class="el-icon-edit-outline"></i></div>
                        <div class="title">JavaScript</div>
                    </div>
                    <p class="number">{{random()}}</p>
                    <p class="descritption">+{{randomTwo()}}%相比上个月</p>
                </div>

            </div>
            <div class="item">

                <div class="itemContent">
                    <div class="itemTop">
                        <div class="radius"><i class="el-icon-edit-outline"></i></div>
                        <div class="title">随笔</div>
                    </div>
                    <p class="number">{{random()}}</p>
                    <p class="descritption">-{{randomTwo()}}%相比上个月</p>
                </div>

            </div>
        </div>
        <h1 class="h1">图片统计</h1>
        <div class="panel">

            <div class="item">
                <div class="itemContent">
                    <div class="itemTop">
                        <div class="radius"><i class="el-icon-picture-outline"></i></div>
                        <div class="title">风景</div>
                    </div>
                    <p class="number">{{random()}}</p>
                    <p class="descritption">+{{randomTwo()}}%相比上个月</p>
                </div>
            </div>
            <div class="item">
                <div class="itemContent">
                    <div class="itemTop">
                        <div class="radius"><i class="el-icon-picture-outline"></i></div>
                        <div class="title">城市</div>
                    </div>
                    <p class="number">{{random()}}</p>
                    <p class="descritption">+{{randomTwo()}}%相比上个月</p>
                </div>
            </div>
            <div class="item">
                <div class="itemContent">
                    <div class="itemTop">
                        <div class="radius"><i class="el-icon-picture-outline"></i></div>
                        <div class="title">美食</div>
                    </div>
                    <p class="number">{{random()}}</p>
                    <p class="descritption">+{{randomTwo()}}%相比上个月</p>
                </div>
            </div>
            <div class="item">
                <div class="itemContent">
                    <div class="itemTop">
                        <div class="radius"><i class="el-icon-picture-outline"></i></div>
                        <div class="title">游戏</div>
                    </div>
                    <p class="number">{{random()}}</p>
                    <p class="descritption">+{{randomTwo()}}%相比上个月</p>
                </div>
            </div>
            <div class="item">
                <div class="itemContent">
                    <div class="itemTop">
                        <div class="radius"><i class="el-icon-picture-outline"></i></div>
                        <div class="title">电影</div>
                    </div>
                    <p class="number">{{random()}}</p>
                    <p class="descritption">+{{randomTwo()}}%相比上个月</p>
                </div>
            </div>

        </div>
    </div>

    <div class="echart">
        <div id="chartLine" style="width:100%; height:400px;"></div>
    </div>

  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "home",
  data() {
    return {
      list: [],
      charData:[],
      chartLine: null
    };
  },
  methods: {
    home() {
      var root = process.env.NODE_ENV;
      console.log(root);
    },
    random(){
     return   parseInt(500*Math.random());
    },
    randomTwo(){
     return   parseInt(100*Math.random());
    },
    drawLineChart() {
        console.log(this.charData);
        
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption({
        title: {
          text: "折线统计"
        },
        color: ["#67C23A", "#E6A23C", "#F56C6C"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["文章", "图片", "访客"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "文章",
            type: "line",
            stack: "总量",
            data: this.charData
          },
          {
            name: "图片",
            type: "line",
            stack: "总量",
            data:  this.charData
          },
          {
            name: "访客",
            type: "line",
            stack: "总量",
            data: this.charData
          }
        ]
      });
    }
  },
  mounted: function() {
      for (let i = 0; i < 7; i++) {
          var n =this.random();
        this.charData.push(n);
    }
    this.drawLineChart();
  },
  updated: function() {
    this.drawLineChart();
  }
};
</script>
<style scoped lang="scss">
#home {
  width: 100%;
  min-height: 900px;
  .content {
    .h1 {
      color: #666;
      font-weight: 200;
      padding: 40px 0 10px 0;
    }
    .panel {
      display: flex;
      .item {
        cursor: pointer;
        flex: 1;
        .itemContent {
          transition: all 0.3s;
          height: 124px;
          background-color: #fff;
          border-radius: 4px;
          padding: 20px;
          margin: 10px;
          box-shadow: 2px 2px 20px 1px #f0f0f0;
          .itemTop {
            .radius {
              width: 40px;
              height: 40px;
              background-color: #67c23a;
              border-radius: 20px;
              line-height: 40px;
              text-align: center;
              color: #fff;
              float: left;
            }
            .title {
              float: left;
              line-height: 40px;
              color: #666;
              padding-left: 10px;
            }
            &:after {
              visibility: hidden;
              clear: both;
              display: block;
              height: 0px;
              content: ".";
            }
          }
          .number {
            text-align: center;
            font-size: 30px;
            color: #76838f;
          }
          .descritption {
            text-align: center;
            color: #a3afb7;
          }
          &:hover {
            box-shadow: 2px 4px 20px 1px #ccc;
          }
        }
      }
    }
  }
    .echart{
        padding-top: 20px;
        #chartLine{
            margin: 0 auto;
        }
    }
}
</style>

