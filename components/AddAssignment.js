import React from 'react'
import {View} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Text, Button, CheckBox} from 'react-native-elements'
import AssignmentServiceClient from '../services/AssignmentServiceClient'


export default class AddAssignment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'default title',
            description: 'default description',
            topicId: 1,
            points: '0'
        };

        this.assignmentService = AssignmentServiceClient.instance;
        this.createNewAssignment = this.createNewAssignment.bind(this);
    }

    createNewAssignment() {
        const refresh = this.props.navigation.getParam('refresh');
        this.assignmentService
            .createAssignmentForTopic(
                this.props.navigation.getParam('topicId', 1),
            {
                title: this.state.title,
                description: this.state.description,
                points: this.state.points
            }).then(() => {
                refresh();
                this.props.navigation.goBack();
            });


    }

    render() {

        return (

            <View>

                <Text h4>
                    Add New Assignment
                </Text>

                <FormLabel>
                    Title
                </FormLabel>

                <FormInput onChangeText={
                    text => this.setState({title: text})
                }/>
                <FormLabel>
                    Description
                </FormLabel>

                <FormInput onChangeText={
                    text => this.setState({description: text})
                }/>

                <FormLabel>
                    Points
                </FormLabel>

                <FormInput onChangeText={
                    text => this.setState({points: text})
                }/>

                <Button backgroundColor="green"
                        style={{marginTop: 20}}
                        color="white"
                        title="Save"
                        onPress={() => this.createNewAssignment()}
                />

                <Text h4>
                    Preview
                </Text>

                <Text h4>
                    title : {this.state.title}
                </Text>

                <Text h4>
                    description : {this.state.description}
                    {this.state.points}
                </Text>
            </View>


        )


    }

}