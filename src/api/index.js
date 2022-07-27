import requests from "@/api/request.js";

export const reqCategoryList = () => {
    return requests({
        url: "/product/getBaseCategoryList",
        method: 'GET'
    })
}