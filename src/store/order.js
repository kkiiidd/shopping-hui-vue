import { reqAddrList, reqShopInfo } from "@/api";
const actions = {
    async getUserAddrList({ commit }) {
        //获取地址信息（模拟数据）
        const result = (await reqAddrList()).data;
        // console.log(result);
        if (result.code === 200) {
            console.log('1111111', result);
            commit('GETADDRLIST', result.data)
        }
    },
    //获取商品清单
    async getShopInfo({ commit }) {
        let result = await reqShopInfo();
        if (result.code == 200) {
            commit('GETSHOPINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
};
const mutations = {
    GETADDRLIST(state, value) {
        state.addrs = value;
    },
    GETSHOPINFO(state, value) {
        state.shopInfo = value;
    }
};
const state = {
    addrs: [],
    shopInfo: []
};
const getters = {

};

export default {
    actions,
    mutations,
    state,
    getters,
    namespaced: true
}