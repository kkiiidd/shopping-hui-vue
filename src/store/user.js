import { reqGetCode, reqLogin, reqLogout, reqRegister, reqUserInfo } from '@/api';
import { setToken, getToken } from "@/utils/token";
const state = {
    code: '',
    token: getToken(),
    userName: ''
};
const mutations = {
    GETCODE(state, value) {
        state.code = value;
    },
    CONFIRMLOGIN(state, value) {
        state.token = value;
    },
    GETUSERINFO(state, value) {
        state.userName = value;
    },
    LOGOUT(state, value) {
        state.token = null;
        state.userName = null;
    }
};
const actions = {
    async getCode({ commit }, phone) {
        const result = await reqGetCode(phone);
        if (result.code === 200) {
            // console.log(result);
            commit('GETCODE', result.data)
        }
    },
    async confirmRegister({ commit }, { phone, code, password }) {
        const result = await reqRegister(phone, code, password);
        if (result.code === 200) return 'ok';
        else return Promise.reject(new Error('fail'));
    },
    async confirmLogin({ commit }, { phone, password }) {
        const result = await reqLogin(phone, password);
        if (result.code === 200) {
            console.log(result);
            //先commit一次，因为state中的token已经执行过一次getToken()，为空，如果不改他，他就一直为空
            //先把它改为获取到的token
            commit('CONFIRMLOGIN', result.data.token);
            commit('GETUSERINFO', result.data.name);
            //然后进行 token 的持久化
            //@kofeine 2022/08/13 22:35
            setToken(result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('登录失败'));
        }
    },
    async getUserInfo({ commit }) {
        const result = await reqUserInfo();
        if (result.code === 200) {
            // console.log(result);
            commit('GETUSERINFO', result.data.name);
            return 'ok';
        } else {
            return Promise.reject(new Error('获取用户信息失败'));
        }
    },
    async logout({ commit }) {
        const result = await reqLogout();
        if (result.code === 200) {
            //操作state清除用户名
            commit("LOGOUT");
            return 'ok';
        } else {
            return Promise.reject(new Error('退出登录失败'));
        }
    }

};

const getters = {

};

export default {
    mutations,
    actions,
    state,
    getters,
    namespaced: true
}