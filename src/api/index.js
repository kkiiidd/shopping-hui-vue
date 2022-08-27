import request from "@/api/request";
import mockRequest from "@/api/mockRequest";
export const reqCategoryList = () => {
    return request({
        url: "/product/getBaseCategoryList",
        method: 'GET'
    })
}

export const reqBannerList = () => {
    return mockRequest({
        url: '/banner',
        method: 'GET'
    })
}

export const reqFloorList = () => {
    return mockRequest({
        url: '/floor',
        method: 'GET'
    })
}

export const reqSearchInfo = (params) => request({
    url: '/list',
    method: 'POST',
    data: params
})

export const reqGoodInfo = (skuid) => request({
    url: `/item/${skuid}`,
    method: 'GET'
})

export const reqAddShopCart = (skuId, skuNum) => request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post"
})
export const reqCartList = () => request({
    url: '/cart/cartList',
    method: 'get'
})
export const reqDeleteCart = (skuId) => request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})
export const reqChangeCheck = (skuId, isChecked) => request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})
export const reqGetCode = (phone) => request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

export const reqRegister = (phone, code, password) => request({
    url: '/user/passport/register',
    data: { phone, code, password },
    method: 'post'
})

export const reqLogin = (phone, password) => request({
    url: '/user/passport/login',
    data: { phone, password },
    method: 'post'
})
//通过请求头的token验证
export const reqUserInfo = () => request({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})
export const reqLogout = () => request({
    url: '/user/passport/logout',
    method: 'get'
})
export const reqAddrList = () => mockRequest({
    url: '/address',
    method: 'get'
})
//获取商品清单数据
export const reqShopInfo = () => request({ url: `/order/auth/trade`, method: 'get' });

export const reqSubmitOrder = (tradeNo, data) => {
    // console.log(data);
    return request({
        url: `order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data
    })
};

export const reqOrderInfo = (orderId) => request({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})
export const reqCheckPayStatus = (orderId) => request({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

export const reqMyOrder = (page, limit) => request({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})