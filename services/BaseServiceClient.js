let _singleton = Symbol();
const API_1 = 'https://first-yanjianliao.herokuapp.com/api/questions';

export default class BaseServiceClient {


    constructor(singleToken) {
        if (_singleton !== singleToken) {
            throw new Error('Cannot instantiate directly!')
        }
    }


    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new BaseServiceClient(_singleton);

        return this[_singleton];
    }
}