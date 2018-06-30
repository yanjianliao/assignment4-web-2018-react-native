import React from 'react'
import {View, Text} from 'react-native'
import {ListItem, Button, Icon} from 'react-native-elements'
import AssignmentServiceClient from "../services/AssignmentServiceClient";
import AssignmentWidget from "./AssignmentWidget";

export default class AssignmentListItem extends React.Component {


    constructor(props) {
        super(props);
        this.assignmentService = AssignmentServiceClient.instance;
    }

    render() {
        return (
                <ListItem
                    key={this.props.assignment.id}
                    title={"title : " + this.props.assignment.title}
                    subtitle={"description : " + this.props.assignment.description}
                    rightIcon={<Icon
                                name='delete-forever'
                                size={30}
                                onPress={ () => {
                                    this.assignmentService
                                        .deleteAssignmentById(this.props.assignment.id)
                                        .then(
                                            () => {
                                                this.props.refresh();
                                            }
                                        )
                                }
                                }
                                color='black' />}

                    leftIcon={<Icon
                                iconStyle={{marginRight : 10}}
                                name='edit' size={30}
                                color='black'
                                onPress={
                                    () => {
                                        this.props.navigation.navigate(
                                            'AssignmentWidget',{
                                                assignment: this.props.assignment,
                                                refresh: this.props.refresh
                                            }
                                        )
                                    }
                                }

                    />}
                />


        )
    }

}