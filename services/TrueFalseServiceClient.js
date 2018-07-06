let _singleton = Symbol();
const API_1 = 'https://first-yanjianliao.herokuapp.com/api/exam/EID/truefalse';
const API_2 = 'https://first-yanjianliao.herokuapp.com/api/truefalse/';

export default class TrueFalseServiceClient {
    constructor(singleToken) {
        if (_singleton !== singleToken) {
            throw new Error('Cannot instantiate directly!')
        }
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new TrueFalseServiceClient(_singleton);

        return this[_singleton];
    }

    findAllQuestionsForExam(id) {
        return fetch(API_1.replace("EID", id))
            .then(response => response.json());
    }

    createQuestionForExam(id, question) {
        return fetch(API_1.replace('EID', id), {
            method: 'post',
            body: JSON.stringify(question),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(response => response.json())
    }

    updateQuestion(id, question) {
        console.log(question);
        return fetch(API_2 + id, {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    }

    deleteQuestionById(id) {
        return fetch(API_2 + id, {
            method: 'delete'
        });
    }

}
