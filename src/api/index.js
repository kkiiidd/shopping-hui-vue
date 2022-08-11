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