import Vuex from "vuex";
import Vue from "vue";
import { reqSearchInfo } from "@/api";

Vue.use(Vuex);


const actions = {
    async getSearchList({ commit }, params = {}) {
        const result = await reqSearchInfo(params);
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, value) {
        state.searchContent = value;
    }
}
const state = {
    searchContent: {}
}
const getters = {
    goodList(state) {
        return state.searchContent.goodsList || [];
    },
    attrsList(state) {
        return state.searchContent.attrsList || [];
    },
    trademarkList(state) {
        return state.searchContent.trademarkList || [];
    },

}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}