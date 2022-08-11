import { reqGoodInfo, reqAddShopCart } from "@/api";
import { getUUID } from "@/utils/uuid";
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
    },
    async addShopCart({ commit }, { skuId, skuNum }) {
        let result = await (reqAddShopCart(skuId, skuNum))
        if (result.code === 200) return 'success';
        else return Promise.reject(new Error('fail'));
    }
};
const state = {
    goodInfo: {},
    uuid_token: getUUID(),
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