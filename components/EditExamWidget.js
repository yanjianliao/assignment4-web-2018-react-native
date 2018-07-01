import React from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {ListItem, Text, Button, Icon} from 'react-native-elements'
import NewQuestion from "../elements/NewQuestion";

export default class EditExamWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let {navigation} = this.props;
        let exam = navigation.getParam('exam');
        return (
            <ScrollView style={{padding: 10}}>

                <Text h3>
                    Title: {exam.title}
                </Text>
                <Text h3>
                    Description: {exam.description}
                </Text>

                <Button backgroundColor="green"
                        color="white"
                        style={{marginTop: 30}}
                        title="Add new question"
                />

                <NewQuestion/>


            </ScrollView>

        )
    }


}