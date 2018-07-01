import React from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {ListItem, Text, Button, Icon} from 'react-native-elements'
import AssignmentWidget from "./AssignmentWidget";
import AssignmentListItem from "./AssignmentListItem";
import AssignmentServiceClient from "../services/AssignmentServiceClient";
import ExamServiceClient from "../services/ExamServiceClient";
import ExamListItem from "./ExamListItem";
import EditExamWidget from "./EditExamWidget";
const WIDGET_API = 'http://localhost:8080/api/topic/';

export default class WidgetList extends React.Component {
    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            assignments: [],
            exams: []
        };

        this.assignmentService = AssignmentServiceClient.instance;
        this.examService = ExamServiceClient.instance;
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId', 1);

        this.assignmentService.findAllAssignmentsForTopic(topicId)
            .then(assignments => this.setState({assignments:assignments}));

        this.examService.findAllExamsForTopic(topicId)
            .then(exams => this.setState({exams: exams}));

    }



    render() {
        let {navigation} = this.props;
        let topicId = navigation.getParam('topicId', 1);

        return (
            <ScrollView style={{padding: 15}}>
                <Text h3>
                    Assignments
                </Text>
                {this.state.assignments.map(
                    (assignment, index) =>
                        (<AssignmentListItem
                            assignment={assignment}
                            key={assignment.id}
                            refresh={this.refresh}
                            navigation={navigation}
                        />)
                )}


                <Button backgroundColor="green"
                        color="white"
                        style={{marginTop: 20}}
                        title="Add new assignment"
                        onPress={() => {
                                navigation.navigate('AssignmentWidget', {
                                    topicId: topicId,
                                    refresh: this.refresh
                                });
                        }}
                />


                <Text h3>
                    Exams
                </Text>

                {this.state.exams.map(
                    (exam, index) =>
                        (<ExamListItem
                            exam={exam}
                            key={exam.id}
                            refresh={this.refresh}
                            navigation={navigation}
                        />)
                )}





                <Button backgroundColor="green"
                        color="white"
                        style={{marginTop: 20}}
                        title="Add new exam"
                        onPress={() => {
                            navigation.navigate('ExamWidget', {
                                topicId: topicId,
                                refresh: this.refresh
                            })
                        }}
                />



            </ScrollView>
        )
    }

}
