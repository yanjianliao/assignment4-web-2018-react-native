
const ASSIGNMENT_API_1 = 'http://localhost:8080/api/topic/TID/assignment';
const ASSIGNMENT_API_2 = 'http://localhost:8080/api/assignment/';
let _singleton = Symbol();


export default class AssignmentServiceClient {


    constructor(singleToken) {
        if(_singleton !== singleToken) {
            throw new Error('Cannot instantiate directly!')
        }
    }


    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentServiceClient(_singleton);

        return this[_singleton];
    }


    findAllAssignmentsForTopic(topicId) {
        return fetch(ASSIGNMENT_API_1.replace('TID', topicId))
            .then(response => response.json());
    }

    createAssignmentForTopic(topicId, assignment) {

        return fetch(ASSIGNMENT_API_1.replace('TID', topicId), {
            method: 'post',
            body: JSON.stringify(assignment),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(
            response => response.json()
        )
    }

    deleteAssignmentById(id) {
        return fetch(ASSIGNMENT_API_2 + id, {
            method: 'delete'
        });
    }

    updateAssignmentById(id, assignment) {
        return fetch(ASSIGNMENT_API_2 + id, {
            method: 'put',
            body: JSON.stringify(assignment),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
    }
}