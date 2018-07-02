import React from 'react'
import {Picker, View, ScrollView} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Text, Button, CheckBox,Icon} from 'react-native-elements'
import ChoiceServiceClient from "../services/ChoiceServiceClient";
import EssayServiceClient from "../services/EssayServiceClient";


export default class MultipleChoiceQuestionWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subtitle: '',
            title: '',
            points: '',
            description: '',
            rightChoiceName: '',
            rightIndex: -1,
            choices: [],
            newChoiceName: ''
        };

        this.renderChoice = this.renderChoice.bind(this);
        this.choiceServiceClient = ChoiceServiceClient.instance;
        this.essayServiceClien = EssayServiceClient.instance;

    }


    componentDidMount() {
        let {navigation} = this.props;
        let question = navigation.getParam('question');
        this.setState({
            subtitle: question.subtitle,
            title: question.title,
            points: question.points,
            description: question.description,
            rightChoiceName: question.rightChoiceName,
            choices: question.choices,
            newChoiceName: ''
        })
    }



    renderChoice() {
        return this.state.choices.map(
            (choice,index) => {
                return (
                    <View
                        key={index}
                        style={{
                            padding: 2,
                            flexDirection : 'row',
                            justifyContent: 'space-between',
                            backgroundColor: 'white'
                        }}
                    >
                        <CheckBox
                            center
                            onPress={
                                () => this.setState({rightChoiceName: choice.name},
                                    () => console.log(this.state.rightChoiceName))
                            }
                            title={choice.name}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={choice.name === this.state.rightChoiceName}
                        />
                        <Icon
                            name='delete-forever'
                            size={30}
                            onPress={
                                () => this.setState({
                                    choices: this.state.choices.filter(
                                        (c) => {
                                            return c.name !== choice.name
                                        }
                                    )
                                })
                            }
                            color='black'
                        />
                    </View>
                )
            }
        )
    }


    render() {
        let {navigation} = this.props;
        let question = navigation.getParam('question');
        let refresh = navigation.getParam('refresh');
        return (
            <ScrollView style={{padding: 5}}>
                <Button backgroundColor="red"
                        style={{marginTop: 20}}
                        color="white"
                        title="delete this question"
                        onPress={ () => {
                            navigation.goBack();
                            this.choiceServiceClient
                                .deleteQuestionById(question.id)
                                .then(() => refresh())
                        }
                }/>


                <Text h4>
                    Preview
                </Text>

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
                    description : {this.state.description}
                </Text>

                {this.renderChoice()}

                <FormLabel>
                    new choice title
                </FormLabel>
                <FormInput
                    value={this.state.newChoiceName}
                    onChangeText={
                        text => this.setState({newChoiceName: text})}
                />

                <Button backgroundColor="green"
                        style={{marginTop: 20}}
                        color="white"
                        title="Add New Choice"
                        onPress={() => {
                            this.setState({
                                choices: [
                                    ...this.state.choices,
                                    {name: this.state.newChoiceName}
                                ]
                            });

                        }}
                />

                <View style={{
                    flexDirection : 'row',
                    justifyContent: 'space-between'
                }}>
                    <Button backgroundColor="blue"
                            style={{marginTop: 20}}
                            color="white"
                            title="Submit"
                            onPress={() => {
                                navigation.goBack();
                                this.choiceServiceClient
                                    .updateQuestion(question.id, this.state)
                                    .then(() => {
                                        refresh();
                                    });
                            }}
                    />
                    <Button backgroundColor="red"
                            style={{marginTop: 20}}
                            color="white"
                            title="cancel"
                            onPress={() => {
                                navigation.goBack();
                            }}
                    />
                </View>

                <FormLabel>
                    question title
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
                    description
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
            </ScrollView>


        )
    }
}