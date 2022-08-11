import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    //先看本地存储有没有
    let uuid_token = localStorage.getItem('UUIDTOKEN');

    //若没有，生成一个新的，并存入本地存储
    if (!uuid_token) {
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }

    //一定要返回uuid
    return uuid_token;
}