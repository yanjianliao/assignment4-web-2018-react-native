import React from 'react'
import {View, Text} from 'react-native'
import {ListItem, Button, Icon} from 'react-native-elements'
import ExamServiceClient from "../services/ExamServiceClient";

export default class ExamListItem extends React.Component {

    constructor(props) {
        super(props);
        this.examService = ExamServiceClient.instance;
    }

    render() {
        let exam = this.props.exam;
        return (

            <ListItem
                title={"title : " + exam.title}
                subtitle={"description : " + exam.description}
                rightIcon={<Icon
                    name='delete-forever'
                    size={30}
                    onPress={ () => {
                        this.examService
                            .deleteExamById(exam.id)
                            .then(
                                () => {
                                    this.props.refresh();
                                }
                            )
                    }
                    }
                    color='black' />
                }




            />


        )
    }
}