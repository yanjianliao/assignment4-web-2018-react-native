import React from 'react'
import {Picker, View, ScrollView} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Text, Button, CheckBox,Icon} from 'react-native-elements'


export default class MultipleChoiceEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subtitle: '',
            title: '',
            points: '',
            description: '',
            rightChoiceName: '',
            choices: [{name: '123'},{name: '321'}],
        };

        this.renderChoice = this.renderChoice.bind(this);

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
                    }}>
                        <CheckBox
                            center
                            title={choice.name}
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={true}
                        />
                        <Icon
                            name='delete-forever'
                            size={30}
                            color='black' />
                    </View>
                )
            }
        )
    }


    render() {
        return (
            <ScrollView>
                <FormLabel>
                    title
                </FormLabel>
                <FormInput
                    value={this.state.title}
                    onChangeText={
                        text => this.setState({title: text})}
                />


                {this.renderChoice()}
                <Button backgroundColor="green"
                        style={{marginTop: 20}}
                        color="white"
                        title="Add New Choice"
                        onPress={() => {
                            this.setState({
                                choices: [
                                    ...this.state.choices,
                                    {name: 'new'}
                                ]
                            });

                        }}
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