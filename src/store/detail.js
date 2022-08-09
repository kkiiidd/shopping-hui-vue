import { reqGoodInfo } from "@/api";

const mutations = {
    GETGOODINFO(state, value) {
        state.goodInfo = value;
    }
};
const actions = {
    async getGoodInfo({ commit }, skuid) {
        const result = (await reqGoodInfo(skuid));
        if (result.code === 200) {
            commit('GETGOODINFO', result.data);
        }
    }
};
const state = {
    goodInfo: {}
};
//从 goodInfo 中取数据，简化操作
const getters = {
    categoryView() {
        return state.goodInfo.categoryView || {};//保证不会返回 undefined
    },
    skuInfo() {
        return state.goodInfo.skuInfo || {};//保证不会返回 undefined
    },
    spuSaleAttrList() {
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    mutations,
    actions,
    state,
    getters,
    namespaced: true
}