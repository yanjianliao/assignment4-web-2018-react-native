import React from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {FormLabel, FormInput, ListItem, Text, Button, Icon, } from 'react-native-elements'
import NewQuestion from "../elements/NewQuestion";
import BaseServiceClient from "../services/BaseServiceClient";
import ChoiceServiceClient from "../services/ChoiceServiceClient";
import MultipleChoiceQuestionWidget from "../elements/MultipleChoiceQuestionWidget";
import EssayServiceClient from "../services/EssayServiceClient";
import BlanksServiceClient from "../services/BlanksServiceClient";
import FillInTheBlanksQuestionWidget from "../elements/FillInTheBlanksQuestionWidget";
import TrueFalseServiceClient from "../services/TrueFalseServiceClient";
import TrueOrFalseQuestionWidget from "../elements/TrueOrFalseQuestionWidget";
import ExamServiceClient from "../services/ExamServiceClient";

export default class EditExamWidget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            choicesQuestion: [],
            essayQuestion: [],
            blankQuestion: [],
            trueFalseQuestion: [],
            title: '',
            description: '',
            points: ''
        };


        this.choiceServiceClient = ChoiceServiceClient.instance;
        this.essayServiceClient = EssayServiceClient.instance;
        this.blankServiceClient = BlanksServiceClient.instance;
        this.trueFalseServiceClient = TrueFalseServiceClient.instance;
        this.examServiceClient = ExamServiceClient.instance;
        this.findAllChoice = this.findAllChoice.bind(this);
        this.findAllEssay = this.findAllEssay.bind(this);
        this.renderChoice = this.renderChoice.bind(this);
        this.renderEssay = this.renderEssay.bind(this);
        this.findAllBlank = this.findAllBlank.bind(this);
        this.renderBlank = this.renderBlank.bind(this);
        this.findAllTrueFalse = this.findAllTrueFalse.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        let {navigation} = this.props;
        let exam = navigation.getParam('exam');
        this.findAllChoice(exam.id);
        this.findAllEssay(exam.id);
        this.findAllBlank(exam.id);
        this.findAllTrueFalse(exam.id);
        this.setState({
            title: exam.title,
            description: exam.description,
            points: exam.points
        });
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

    findAllTrueFalse(id) {
        this.trueFalseServiceClient.findAllQuestionsForExam(id)
            .then((questions) => {this.setState({trueFalseQuestion : questions})})
    }

    renderTrueFalse() {
        return this.state.trueFalseQuestion.map(
            question => {
                return(
                    <ListItem
                        title={question.title}
                        subtitle={question.subtitle}
                        key={question.id}
                        onPress={() => {
                            this.props.navigation.navigate('TrueOrFalseQuestionWidget', {
                                question: question, refresh: this.refresh
                            });
                        }}
                        chevronColor='grey'
                        leftIcon={<Icon
                            name='link'
                            size={30}
                            color='black' />}
                    />
                )
            }
        )
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
        this.findAllTrueFalse(exam.id);
        Alert.alert("success!");
    }

    render() {
        let {navigation} = this.props;
        let exam = navigation.getParam('exam');
        let refresh = navigation.getParam('refresh');
        return (
            <ScrollView style={{padding: 10}}>

                <View style={{
                    flexDirection : 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text h4>
                        title : {this.state.title}
                    </Text>

                    <Text h4>
                        {this.state.points} pts
                    </Text>
                </View>

                <Text h4>
                    Exam Description: {this.state.description}
                </Text>

                <FormLabel>
                    exam title
                </FormLabel>
                <FormInput
                    value={this.state.title}
                    onChangeText={
                        text => this.setState({title: text})}
                />
                <FormLabel>
                    exam description
                </FormLabel>
                <FormInput
                    value={this.state.description}
                    onChangeText={
                        text => this.setState({description: text})
                    }/>
                <FormLabel>
                    exam Points
                </FormLabel>

                <FormInput
                    value={this.state.points}
                    onChangeText={
                        text => this.setState({points: text})
                    }/>

                <Button backgroundColor="blue"
                        style={{marginTop: 20, marginBottom: 20}}
                        color="white"
                        title="Update Exam"
                        onPress={() => {
                            this.examServiceClient
                                .updateExam(exam.id, {
                                    points: this.state.points,
                                    description: this.state.description,
                                    title: this.state.title
                                }).then(
                                () => {
                                    Alert.alert("success!");
                                    refresh();
                                }
                            )

                        }}
                />


                <Text h4>
                    Question List:
                </Text>
                {this.renderChoice()}
                {this.renderEssay()}
                {this.renderBlank()}
                {this.renderTrueFalse()}

                <NewQuestion
                    exam={exam}
                    refresh={this.refresh}
                    style={{marginBottom: 100}}
                />


            </ScrollView>

        )
    }


}