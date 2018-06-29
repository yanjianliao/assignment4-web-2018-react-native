import React from 'react'
import {View, Text, Alert} from 'react-native'
import {ListItem, Button, Icon} from 'react-native-elements'
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
            .then(assignments => this.setState({assignments:assignments}));
        // Alert.alert(topicId + ' ');
    }



    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.assignments.map(
                    (assignment, index) =>
                        (<AssignmentListItem
                            assignment={assignment}
                            key={assignment.id}
                            refresh={this.refresh}
                        />)
                )}


                <Button backgroundColor="green"
                        color="white"
                        title="Add"
                        onPress={() => this.props.navigation.navigate('AddAssignment',
                                {topicId: this.props.navigation.getParam('topicId', 1),
                                refresh: this.refresh})}
                />
            </View>
        )
    }

}
