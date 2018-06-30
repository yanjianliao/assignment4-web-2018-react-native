import React from 'react'
import {View, Alert, TextInput, ScrollView} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Text, Button, CheckBox} from 'react-native-elements'
import AssignmentServiceClient from '../services/AssignmentServiceClient'

export default class AssignmentWidget extends React.Component {

    static navigationOptions = {title: 'AssignmentWidgets'};

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            title: '',
            points: '0',
            id: 1
        };
        this.update = this.update.bind(this);
        this.assignmentService = AssignmentServiceClient.instance;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const assignment = navigation.getParam('assignment', 1);

        this.setState({
            description: assignment.description,
            title: assignment.title,
            points: assignment.points,
            id: assignment.id
        });
    }

    update() {
        const {navigation} = this.props;
        const assignment = {
            title: this.state.title,
            description: this.state.description,
            points: this.state.points
        };
        const refresh = navigation.getParam('refresh');
        this.assignmentService
            .updateAssignmentById(this.state.id, assignment)
            .then(
                () => {
                    refresh();
                    navigation.goBack();
                }
            )
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <FormLabel>
                    Title
                </FormLabel>
                <FormInput
                    value={this.state.title}
                    onChangeText={
                    text => this.setState({title: text})}
                />
                <FormLabel>
                    Description
                </FormLabel>

                <FormInput
                    value={this.state.description}
                    onChangeText={
                    text => this.setState({description: text})
                }/>

                <FormLabel>
                    Points
                </FormLabel>

                <FormInput
                    value={this.state.points}
                    onChangeText={
                        text => this.setState({points: text})
                    }/>

                <Button backgroundColor="green"
                        color="white"
                        title="update"
                        onPress={this.update}
                />


                <Text h3>
                    Preview:
                </Text>
                <Text h4>
                    Titles: {this.state.title} ----- Points: {this.state.points}
                </Text>
                <Text h5>
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
            </ScrollView>




        )
    }


}