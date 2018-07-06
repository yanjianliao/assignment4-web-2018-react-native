
const EXAM_API_1 = 'https://first-yanjianliao.herokuapp.com/api/topic/TID/exam';
const EXAM_API_2 = 'https://first-yanjianliao.herokuapp.com/api/exam/';
let _singleton = Symbol();

export default class ExamServiceClient {
    constructor(singleToken) {
        if(_singleton !== singleToken) {
            throw new Error('Cannot instantiate directly!')
        }
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamServiceClient(_singleton);

        return this[_singleton];
    }

    findAllExamsForTopic(topicId) {
        return fetch(EXAM_API_1.replace("TID", topicId))
            .then(response => response.json());
    }

    createExamForTopic(topicId, exam) {
        return fetch(EXAM_API_1.replace('TID', topicId), {
            method: 'post',
            body: JSON.stringify(exam),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(
            response => response.json()
        )
    }

    updateExam(id, exam) {
        console.log(exam);
        return fetch(EXAM_API_2 + id, {
            method: 'put',
            body: JSON.stringify(exam),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    }
    deleteExamById(examId) {
        return fetch(EXAM_API_2 + examId, {
            method : 'delete'
        });
    }


}