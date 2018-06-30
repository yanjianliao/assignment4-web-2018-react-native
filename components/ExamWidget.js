import React from 'react'
import {View} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Text, Button, CheckBox} from 'react-native-elements'
import ExamServiceClient from '../services/ExamServiceClient'

export default class ExamWidget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            description: '',
            title: '',
            points: '',
        };

        this.examService = ExamServiceClient.instance;
    }

    createExamForTopic() {
        let {navigation} = this.props;
        let topicId = navigation.getParam('topicId', 1);
        let refresh = navigation.getParam('refresh');

        this.examService.createExamForTopic(topicId, {
            title : this.state.title,
            description: this.state.description,
            points: this.state.points
        }).then(
            () => {
                refresh();
                navigation.goBack();
            }

        )
    }

    render() {
        return(

            <View>

                <Text h4>
                    Add New Exam
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
                        onPress={() => this.createExamForTopic()}
                />

                <Text h4>
                    Preview
                </Text>

                <Text h4>
                    title : {this.state.title}
                </Text>

                <Text h4>
                    description : {this.state.description}
                </Text>

                


            </View>




        )
    }



}
