import { reqAddrList } from "@/api";

const actions = {
    async getUserAddrList({ commit }) {
        const result = await reqAddrList();
        if (result.code === 200) {
            // console.log(result);
            commit('GETADDRLIST', result.data)
        }
    }
};
const mutations = {
    GETADDRLIST(state, value) {
        state.addrs = value;
    }
};
const state = {
    addrs: []
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