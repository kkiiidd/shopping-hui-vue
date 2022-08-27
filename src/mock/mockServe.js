import Mock from 'mockjs';
import banner from './banner.json';
import floor from './floor.json';
import address from './address.json'
//使用mock模拟轮播图和floor的数据
//@kofeine 2022/07/31 12:12
Mock.mock('/mock/banner', { code: 200, data: banner });
Mock.mock('/mock/floor', { code: 200, data: floor });

//模拟地址信息数据
//@kofeine 2022/08/24 22:41
Mock.mock('/mock/address', { code: 200, data: address });

