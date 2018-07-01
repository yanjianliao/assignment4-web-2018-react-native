let _singleton = Symbol();
const API_1 = 'http://localhost:8080/api/exam/EID/choice';

export default class ChoiceServiceClient {


    constructor(singleToken) {
        if (_singleton !== singleToken) {
            throw new Error('Cannot instantiate directly!')
        }
    }


    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ChoiceServiceClient(_singleton);

        return this[_singleton];
    }


    createQuestionForExam(id, question) {
        console.log(id, question);
        return fetch(API_1.replace('EID', id), {
            method: 'post',
            body: JSON.stringify(question),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response => response.json())
    }



}