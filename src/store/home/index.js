import Vuex from "vuex";
import Vue from "vue";
import banner from "./banner"
import { reqCategoryList } from "@/api"
Vue.use(Vuex);

//封装home模块
//@kofeine 2022/07/27 16:46
const mutations = {
    GETCATEGORYLIST(state, value) {
        state.categoryList = value;
    }

};
const actions = {
    async getCategoryList(context) {
        const categoryList = await reqCategoryList();
        if (categoryList.code === 200) {
            context.commit("GETCATEGORYLIST", categoryList.data)
        }
    }

};
const state = {
    categoryList: [] //初始值不能乱定，根据接口返回的数据类型初始化
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
