import React from 'react'
import {Picker, View, ScrollView} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Text, Button, CheckBox} from 'react-native-elements'
import ChoiceServiceClient from "../services/ChoiceServiceClient";


export default class NewQuestion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subtitle: '',
            title: '',
            points: '',
            questionType: ''
        };

        this.choiceServiceClient = ChoiceServiceClient.instance;

        this.createQuestion = this.createQuestion.bind(this);
    }

    createQuestion() {
        let question = this.state;
        return this.choiceServiceClient.createQuestionForExam(this.props.exam.id, {
            title: question.title,
            subtitle: question.subtitle,
            points: question.points,
            type: 'MultipleChoiceExamQuestion'
        }).then(() => this.props.refresh())
    }



    render() {
        return (
            <ScrollView>
                <Button backgroundColor="green"
                        style={{marginTop: 20}}
                        color="white"
                        title="Add New Question"
                        onPress={() => {
                            this.createQuestion();
                        }}
                />
                <Picker
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({questionType: itemValue})}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="MC" label="Multiple choice" />
                    <Picker.Item value="ES" label="Essay" />
                    <Picker.Item value="TF" label="True or false" />
                    <Picker.Item value="FB" label="Fill in the blanks" />
                </Picker>
                <Text>{this.state.questionType}</Text>
                <FormLabel>
                    Title
                </FormLabel>
                <FormInput
                    value={this.state.title}
                    onChangeText={
                        text => this.setState({title: text})}
                />
                <FormLabel>
                    subtitle
                </FormLabel>

                <FormInput
                    value={this.state.subtitle}
                    onChangeText={
                        text => this.setState({subtitle: text})
                    }/>

                <FormLabel>
                    Points
                </FormLabel>

                <FormInput
                    value={this.state.points}
                    onChangeText={
                        text => this.setState({points: text})
                    }/>



            </ScrollView>

        )
    }


}