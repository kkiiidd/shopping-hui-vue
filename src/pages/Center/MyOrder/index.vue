<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table
          class="order-item"
          v-for="(order, index) in myOrderRecords"
          :key="index"
        >
          <thead>
            <tr>
              <th colspan="8">
                <span class="ordertitle"
                  >{{ order.createTime }}　订单编号：{{ order.outTradeNo }}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detail, dIndex) in order.orderDetailList" :key="dIndex">
              <td width="12%">
                <div class="typographic">
                  <img :src="detail.imgUrl" width="100%" />
                </div>
              </td>
              <td width="38%">
                <div class="block-text">{{ detail.skuName }}</div>
              </td>
              <td width="2%">
                <span>x{{ detail.skuNum }}</span>
              </td>
              <td width="7%">
                <div class="service">售后申请</div>
              </td>
              <!-- 只显示一次 用 v-if index为0 处理-->
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
                v-if="dIndex === 0"
              >
                {{ order.consignee }}
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="13%"
                class="center"
                v-if="dIndex === 0"
              >
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount }}</li>
                  <!-- <li>在线支付</li> -->
                </ul>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="8%"
                class="center"
                v-if="dIndex === 0"
              >
                <div class="btn">{{ order.orderStatusName }}</div>
              </td>
              <td
                :rowspan="order.orderDetailList.length"
                width="13%"
                class="center"
                v-if="dIndex === 0"
              >
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--猜你喜欢-->
      <div class="like">
        <h4 class="kt">猜你喜欢</h4>
        <ul class="like-list">
          <li class="likeItem">
            <div class="p-img">
              <img src="../images/itemlike01.png" />
            </div>
            <div class="attr">
              <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
            </div>
            <div class="price">
              <em>¥</em>
              <i>3699.00</i>
            </div>
            <div class="commit">已有6人评价</div>
          </li>
          <li class="likeItem">
            <div class="p-img">
              <img src="../images/itemlike02.png" />
            </div>
            <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
            <div class="price">
              <em>¥</em>
              <i>4388.00</i>
            </div>
            <div class="commit">已有700人评价</div>
          </li>
          <li class="likeItem">
            <div class="p-img">
              <img src="../images/itemlike03.png" />
            </div>
            <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
            <div class="price">
              <em>¥</em>
              <i>4088.00</i>
            </div>
            <div class="commit">已有700人评价</div>
          </li>
          <li class="likeItem">
            <div class="p-img">
              <img src="../images/itemlike04.png" />
            </div>
            <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
            <div class="price">
              <em>¥</em>
              <i>4088.00</i>
            </div>
            <div class="commit">已有700人评价</div>
          </li>
        </ul>
      </div>
      <div class="choose-order">
        <Paginator
          :pageNo="pageNo"
          :pageSize="pageSize"
          :total="total"
          :continues="5"
          @changePage="changePage"
        ></Paginator>
      </div>
    </div>
  </div>
</template>

<script>
import { reqMyOrder } from "@/api";
import Paginator from "@/components/Paginator";
export default {
  components: {
    Paginator,
  },
  data() {
    return {
      //当前页码
      pageNo: 1,
      //每页记录条数
      pageSize: 5,
      //总记录条数,
      total: 0,
      myOrderRecords: [],
    };
  },
  computed: {},
  mounted() {
    this.getMyOrder();
  },
  methods: {
    changePage(num) {
      console.log("换页", num);
      this.pageNo = num;
      this.getMyOrder();
    },
    async getMyOrder() {
      let result = await reqMyOrder(this.pageNo, this.pageSize);
      if (result.code === 200) {
        this.total = result.data.total;
        this.myOrderRecords = result.data.records;
      } else {
        alert("获取订单信息失败，请稍后重试~");
      }
    },
  },
};
</script>

<style></style>
