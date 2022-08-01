import Vuex from "vuex";
import Vue from "vue";
import { reqBannerList } from "@/api"
Vue.use(Vuex);

const mutations = {
    GETBANNERLIST(state, value) {
        state.bannerList = value;
    }
};

const actions = {
    async getBannerList(context) {
        let result = (await reqBannerList()).data;
        console.log(result);
        if (result.code === 200) {
            context.commit('GETBANNERLIST', result.data);

        }
    }
};
const state = {
    bannerList: []
};

export default {
    mutations,
    actions,
    state,
    namespaced: true
}