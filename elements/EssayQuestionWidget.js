import React from 'react'
import {Picker, View, ScrollView,TextInput} from 'react-native'
import {FormLabel, FormInput, Text, Button, CheckBox,Icon} from 'react-native-elements'
import EssayServiceClient from "../services/EssayServiceClient";


export default class EssayQuestionWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subtitle: '',
            title: '',
            points: '',
            description: ''
        };

        this.essayServiceClient = EssayServiceClient.instance;
    }


    componentDidMount() {
        let {navigation} = this.props;
        let question = navigation.getParam('question');
        this.setState({
            subtitle: question.subtitle,
            title: question.title,
            points: question.points,
            description: question.description
        })
    }

    render() {
        let {navigation} = this.props;
        let question = navigation.getParam('question');
        let refresh = navigation.getParam('refresh');
        return(
            <ScrollView style={{padding: 10}}>
                <Button backgroundColor="red"
                        style={{marginTop: 20}}
                        color="white"
                        title="delete this question"
                        onPress={ () => {
                            navigation.goBack();
                            this.essayServiceClient
                                .deleteQuestionById(question.id)
                                .then(() => refresh())
                        }}/>
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

                <TextInput
                    style={{height: 100, borderRadius: 5}}
                    backgroundColor="white"
                    multiline={true}
                    numberOfLines={4}
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
                                this.essayServiceClient
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