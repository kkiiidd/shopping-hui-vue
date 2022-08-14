import { reqCartList, reqDeleteCart, reqChangeCheck, reqGetCode } from '@/api'
const mutations = {
    GETSHOPCARTLIST(state, value) {
        state.shopcartData = value;
    }
};
const actions = {
    async getCode({ commit }, phone) {
        const result = await reqGetCode(phone);
        if (result.code === 200) {
            console.log(result);
        }
    },
    async getShopCartList({ commit }) {
        const result = (await reqCartList())
        if (result.code === 200) {
            commit('GETSHOPCARTLIST', result.data)
        }
        // console.log(result);
    },
    async deleteShopCartItem({ commit }, skuId) {
        const result = await reqDeleteCart(skuId);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    deleteSelected({ getters, dispatch }) {
        try {
            let PromiseAll = [];
            getters.shopcartList.cartInfoList
                .forEach(item => {
                    let promise = item.isChecked == 1 ? dispatch('deleteShopCartItem', item.skuId) : '';
                    PromiseAll.push(promise);//将每次返回的Promise存入数组中
                })
            return Promise.all(PromiseAll);//如果有一个失败，返回即失败

        } catch (error) {
            alert(error);
        }
    },
    async updateCheck({ commit }, { skuId, isChecked }) {
        const result = await reqChangeCheck(skuId, isChecked);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
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