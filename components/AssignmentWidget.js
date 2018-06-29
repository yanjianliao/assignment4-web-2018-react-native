import React from 'react'


export default class AssignmentWidget extends React.Component {

    static navigationOptions = {title: 'AssignmentWidgets'}

    constructor(props) {
        super(props);
        this.state = {
            assignments: [],

        }
    }


}