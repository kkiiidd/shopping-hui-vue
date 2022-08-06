<template>
  <div class="pagination">
    <button>上一页</button>
    <!-- 前 -->
    <button
      v-if="startAndEnd.start > 2 && pageNo > continues"
      @click="switchPage(1)"
    >
      1
    </button>
    <button
      v-if="startAndEnd.start > 3 && pageNo > continues"
      @click="switchPage(2)"
    >
      2
    </button>
    <button v-if="startAndEnd.start > 2 && pageNo > continues">···</button>

    <!-- 中 -->
    <template v-if="pageNo <= continues">
      <button
        v-for="num in startAndEnd.end"
        :class="{ active: pageNo === num }"
        @click="switchPage(num)"
      >
        {{ num }}
      </button>
    </template>
    <template v-else>
      <button
        v-for="num in startAndEnd.end"
        v-if="num > startAndEnd.start"
        :class="{ active: pageNo === num }"
        @click="switchPage(num)"
      >
        {{ num }}
      </button>
    </template>

    <!-- 后 -->
    <button v-if="startAndEnd.end <= totalPage - 2">...</button>
    <button
      v-if="startAndEnd.end <= totalPage - 2"
      @click="switchPage(totalPage)"
    >
      {{ totalPage }}
    </button>
    <button>下一页</button>

    <button style="margin-left: 30px">共 {{ totalPage }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      dddd: 1,
    };
  },
  props: ["pageNo", "pageSize", "total", "continues"],
  mounted() {},
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEnd() {
      let { pageNo, pageSize, totalPage, continues } = this;
      let start = 0,
        end = 0;
      console.log(totalPage);
      if (totalPage < continues) {
        //总页数比连续展示个数小
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          end = totalPage;
          start = end - continues + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    //发送请求修改页数
    //@kofeine 2022/08/07 00:07
    switchPage(num) {
      this.$emit("changePage", num);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
