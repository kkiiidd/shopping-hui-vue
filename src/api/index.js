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