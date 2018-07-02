import React from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {ListItem, Text, Button, Icon, } from 'react-native-elements'
import NewQuestion from "../elements/NewQuestion";
import BaseServiceClient from "../services/BaseServiceClient";
import ChoiceServiceClient from "../services/ChoiceServiceClient";
import MultipleChoiceQuestionWidget from "../elements/MultipleChoiceQuestionWidget";
import EssayServiceClient from "../services/EssayServiceClient";
import BlanksServiceClient from "../services/BlanksServiceClient";
import FillInTheBlanksQuestionWidget from "../elements/FillInTheBlanksQuestionWidget";

export default class EditExamWidget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            choicesQuestion: [],
            essayQuestion: [],
            blankQuestion: []
        };


        this.choiceServiceClient = ChoiceServiceClient.instance;
        this.essayServiceClient = EssayServiceClient.instance;
        this.blankServiceClient = BlanksServiceClient.instance;
        this.findAllChoice = this.findAllChoice.bind(this);
        this.findAllEssay = this.findAllEssay.bind(this);
        this.renderChoice = this.renderChoice.bind(this);
        this.renderEssay = this.renderEssay.bind(this);
        this.findAllBlank = this.findAllBlank.bind(this);
        this.renderBlank = this.renderBlank.bind(this);

        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        let {navigation} = this.props;
        let exam = navigation.getParam('exam');
        this.findAllChoice(exam.id);
        this.findAllEssay(exam.id);
        this.findAllBlank(exam.id)
    }

    findAllChoice(id) {
        this.choiceServiceClient.findAllQuestionsForExam(id)
            .then((questions) => this.setState({choicesQuestion : questions}))
    }
    findAllEssay(id) {
        this.essayServiceClient.findAllQuestionsForExam(id)
            .then((questions) => {this.setState({essayQuestion : questions})})
    }

    findAllBlank(id) {
        this.blankServiceClient.findAllQuestionsForExam(id)
            .then((questions) => {this.setState({blankQuestion : questions})})
    }

    renderBlank() {
        return this.state.blankQuestion.map(
            question => {
                return(
                    <ListItem
                        title={question.title}
                        subtitle={question.subtitle}
                        key={question.id}
                        onPress={() => {
                            this.props.navigation.navigate('FillInTheBlanksQuestionWidget', {
                                question: question, refresh: this.refresh
                            });
                        }}
                        chevronColor='green'
                        leftIcon={<Icon
                            name='airplay'
                            size={30}
                            color='black' />}
                    />
                )
            }
        )
    }

    renderEssay() {
        return this.state.essayQuestion.map(
            question => {
                return(
                    <ListItem
                        title={question.title}
                        subtitle={question.subtitle}
                        key={question.id}
                        onPress={() => {
                            this.props.navigation.navigate('EssayQuestionWidget', {
                                question: question, refresh: this.refresh
                            });
                        }}
                        chevronColor='black'
                        leftIcon={<Icon
                            name='credit-card'
                            size={30}
                            color='black' />}
                    />
                )
            }
        )
    }


    renderChoice() {
        return this.state.choicesQuestion.map(
            question => {
                return(
                    <ListItem
                        title={question.title}
                        subtitle={question.subtitle}
                        key={question.id}
                        onPress={() => {
                            this.props.navigation.navigate('MultipleChoiceQuestionWidget', {
                                question: question, refresh: this.refresh
                            });
                        }}
                        chevronColor='blue'
                        leftIcon={<Icon
                            // name='shopping-cart'
                            name='list'
                            size={30}
                            color='black' />}
                    />
                )
            }
        )
    }


    refresh() {
        let {navigation} = this.props;
        let exam = navigation.getParam('exam');
        this.findAllChoice(exam.id);
        this.findAllEssay(exam.id);
        this.findAllBlank(exam.id);
        Alert.alert("success!");
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
                {this.renderEssay()}
                {this.renderBlank()}

                <NewQuestion
                    exam={exam}
                    refresh={this.refresh}
                    style={{marginBottom: 100}}
                />


            </ScrollView>

        )
    }


}