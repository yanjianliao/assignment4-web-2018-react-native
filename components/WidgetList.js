import React from 'react'
import {View, Alert} from 'react-native'
import {ListItem, Text, Button, Icon} from 'react-native-elements'
import AddAssignment from "./AddAssignment";
import AssignmentListItem from "./AssignmentListItem";
import AssignmentServiceClient from "../services/AssignmentServiceClient";
const WIDGET_API = 'http://localhost:8080/api/topic/';

export default class WidgetList extends React.Component {
    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props);
        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1,
            assignments: []
        };

        this.assignmentService = AssignmentServiceClient.instance;
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId', 1);
        this.assignmentService.findAllAssignmentsForTopic(topicId)
            .then(assignments => this.setState({assignments:assignments})).then(
            () =>  console.log(this.state.assignments)
        );
    }



    render() {
        return (
            <View style={{padding: 15}}>
                <Text h3>
                    Assignments
                </Text>
                {this.state.assignments.map(
                    (assignment, index) =>
                        (<AssignmentListItem
                            assignment={assignment}
                            key={assignment.id}
                            refresh={this.refresh}
                            navigation={this.props.navigation}
                        />)
                )}


                <Button backgroundColor="green"
                        color="white"
                        style={{marginTop: 20}}
                        title="Add new assignment"
                        onPress={() => {
                            this.props.navigation.navigate('AddAssignment',
                                {topicId: this.props.navigation.getParam('topicId', 1),
                                refresh: this.refresh});
                        }}
                />


                <Button backgroundColor="green"
                        color="white"
                        style={{marginTop: 20}}
                        title="print"
                        onPress={() => {
                            console.log('youdf');
                        }}
                />

                <Text h3>
                    Exams
                </Text>

            </View>
        )
    }

}
