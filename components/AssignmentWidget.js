import React from 'react'
import {View, Alert, TextInput, ScrollView} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Text, Button, CheckBox} from 'react-native-elements'
import AssignmentServiceClient from '../services/AssignmentServiceClient'


export default class AssignmentWidget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
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
                }).then(
                    () => {
                        refresh();
                        this.props.navigation.goBack();
        });


    }

    render() {

        return (

            <ScrollView  style={{padding: 20}}>
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

                <View style={{
                    flexDirection : 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text h4>
                        Titles: {this.state.title}
                    </Text>
                    <Text h4>
                        Points: {this.state.points}
                    </Text>
                </View>
                <Text h4>
                    Assignment description : {this.state.description}
                </Text>

                <Text h4 >
                    Essay answer
                </Text>

                <TextInput
                    style={{height: 100, borderRadius: 5}}
                    backgroundColor="white"
                    multiline={true}
                    numberOfLines={4}
                />

                <Text h4 >
                    Upload a file
                </Text>

                <TextInput
                    style={{borderRadius: 5}}
                    backgroundColor="white"
                    multiline={true}

                >
                </TextInput>

                <Text h4 >
                    Submit a link
                </Text>

                <TextInput
                    style={{borderRadius: 5}}
                    backgroundColor="white"
                    multiline={true}
                />

                <View style={{flexDirection : 'row', borderRadius: 5}}>
                    <Button backgroundColor="red"
                            color="white"
                            style={{marginTop: 20}}
                            title="cancel"
                    />
                    <Button backgroundColor="blue"
                            color="white"
                            style={{marginTop: 20, borderRadius: 5}}
                            title="submit"
                    />
                </View>
            </ScrollView>


        )


    }

}