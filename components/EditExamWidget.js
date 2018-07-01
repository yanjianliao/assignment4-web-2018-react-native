import React from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {ListItem, Text, Button, Icon} from 'react-native-elements'
import NewQuestion from "../elements/NewQuestion";
import BaseServiceClient from "../services/BaseServiceClient";
import ChoiceServiceClient from "../services/ChoiceServiceClient";
import MultipleChoiceEditor from "../elements/MultipleChoiceEditor";

export default class EditExamWidget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            choicesQuestion: [],
        };


        this.choiceServiceClient = ChoiceServiceClient.instance;
        this.findAllChoice = this.findAllChoice.bind(this);
        this.renderChoice = this.renderChoice.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        let {navigation} = this.props;
        let exam = navigation.getParam('exam');
        this.findAllChoice(exam.id)

    }

    findAllChoice(id) {
        this.choiceServiceClient.findAllQuestionsForExam(id)
            .then((questions) => this.setState({choicesQuestion : questions}))
    }


    renderChoice() {

        return this.state.choicesQuestion.map(
            question => {
                console.log(question);
                return(
                    <ListItem
                        title={question.title}
                        subtitle={question.subtitle}
                        key={question.id}
                        onPress={() => {
                            this.props.navigation.navigate('MultipleChoiceEditor');
                        }}
                    />
                )
            }
        )
    }

    refresh() {
        let {navigation} = this.props;
        let exam = navigation.getParam('exam');
        this.findAllChoice(exam.id);
    }

    render() {
        let {navigation} = this.props;
        let exam = navigation.getParam('exam');
        return (
            <ScrollView style={{padding: 10}}>

                <Text h4>
                    Exam Title: {exam.title}
                </Text>
                <Text h4>
                    Exam Description: {exam.description}
                </Text>

                <Text h4>
                    Question List:
                </Text>
                {this.renderChoice()}

                <NewQuestion
                    exam={exam}
                    refresh={this.refresh}
                    style={{marginBottom: 100}}
                />


            </ScrollView>

        )
    }


}