import { reqCartList } from '@/api'
const mutations = {
    GETSHOPCARTLIST(state, value) {
        state.shopcartData = value;
    }
};
const actions = {
    async getShopCartList({ commit }) {
        const result = (await reqCartList())
        if (result.code === 200) {
            commit('GETSHOPCARTLIST', result.data)
        }
        // console.log(result);
    }
};
const state = {
    shopcartData: []
};
const getters = {
    shopcartList() {
        return state.shopcartData[0] || {};
    }
};

export default {
    mutations,
    actions,
    state,
    getters,
    namespaced: true
}