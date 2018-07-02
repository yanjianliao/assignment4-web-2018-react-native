import React from 'react'
import {Picker, View, ScrollView, TextInput} from 'react-native'
import {FormLabel, FormInput, ListItem, FormValidationMessage, Text, Button, CheckBox,Icon} from 'react-native-elements'
import BlanksServiceClient from "../services/BlanksServiceClient";

export default class FillInTheBlanksQuestionWidget extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            subtitle: '',
            title: '',
            points: '',
            description: '',
            variables: [],
            newVariable: ''
        };

        this.renderVariables = this.renderVariables.bind(this);
        this.blanksServiceClient = BlanksServiceClient.instance;
        this.renderVariablesPreview = this.renderVariablesPreview.bind(this);
    }

    componentDidMount() {
        let {navigation} = this.props;
        let question = navigation.getParam('question');
        this.setState({
            subtitle: question.subtitle,
            title: question.title,
            points: question.points,
            description: question.description,
            variables: question.variables
        })
    }

    renderVariables() {
        return this.state.variables.map(
            (variable, index) => {
                console.log(variable);
                return(
                    <ListItem
                        title={variable.variable}
                        key={index}
                    />
                )


            }
        )
    }

    renderVariablesPreview() {
        return this.state.variables.map(
            (v, index) => {
                let left = '', right = '', meet = false, str = v.variable;
                for(let i = 0; i < str.length; i++) {

                    if(str[i] !== '[' && !meet) {
                        left += str[i];
                    } else if(str[i] === '[') {
                        while(str[i] !== ']' && i < str.length)
                            i++;
                        meet = true;
                    }else {
                        right += str[i];
                    }
                }
                console.log(left + '/' + right);
                return(
                    <View
                        style={{
                            flexDirection : 'row',
                            marginTop: 10
                        }}
                        key={index}
                    >
                        <Text h4>
                            {left}
                        </Text>
                        <TextInput
                            style={{borderRadius: 5, width: 100}}
                            backgroundColor="white"
                            multiline={true}
                        />
                        <Text h4>
                            {right}
                        </Text>
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
            <ScrollView style={{padding: 10}}>
                <Button backgroundColor="red"
                        style={{marginTop: 20}}
                        color="white"
                        title="delete this question"
                        onPress={ () => {
                            navigation.goBack();
                            this.blanksServiceClient
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

                {this.renderVariables()}
                {this.renderVariablesPreview()}
                <FormLabel>
                    equation
                </FormLabel>
                <FormInput
                    value={this.state.newVariable}
                    onChangeText={
                        text => this.setState({newVariable: text})}
                />
                <Button backgroundColor="green"
                        style={{marginTop: 20}}
                        color="white"
                        title="Add New"
                        onPress={() => {
                            this.setState({
                                variables: [
                                    ...this.state.variables,
                                    {variable: this.state.newVariable}
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
                                console.log(this.state.variables);
                                navigation.goBack();
                                this.blanksServiceClient
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