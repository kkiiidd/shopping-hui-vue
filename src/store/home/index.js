import Vuex from "vuex";
import Vue from "vue";
import banner from "./banner"
import { reqCategoryList, reqFloorList } from "@/api"
Vue.use(Vuex);

//封装home模块
//@kofeine 2022/07/27 16:46
const mutations = {
    GETCATEGORYLIST(state, value) {
        state.categoryList = value;
    },
    GETFLOORLIST(state, value) {
        state.floorList = value;
    }

};
const actions = {
    async getCategoryList(context) {
        const categoryList = await reqCategoryList();
        if (categoryList.code === 200) {
            context.commit("GETCATEGORYLIST", categoryList.data)
        }
    },
    async getFloorList(context) {
        const result = (await reqFloorList()).data;
        if (result.code === 200) {
            context.commit('GETFLOORLIST', result.data);
        }
    }

};
const state = {
    categoryList: [], //初始值不能乱定，根据接口返回的数据类型初始化
    floorList: []
};

export default {
    mutations,
    actions,
    state,
    namespaced: true,
    modules: {
        banner
    }
}
