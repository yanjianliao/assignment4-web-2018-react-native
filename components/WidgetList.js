import React from 'react'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'

const WIDGET_API = 'http://localhost:8080/api/topic/';

export default class WidgetList extends React.Component {
    static navigationOptions = {title: 'Widgets'};

    constructor(props) {
        super(props);

        this.state = {
            widgets: [],
            courseId: 1,
            moduleId: 1
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const topicId = navigation.getParam('topicId', 1);
        fetch(WIDGET_API + topicId + '/widget/')
            .then(response => (response.json()))
            .then(widgets => this.setState({widgets:widgets}))


    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.widgets.map(
                    (widget, index) =>
                        (<ListItem
                            key={widget.id}
                            title={widget.name}
                        />)
                )}
            </View>
        )
    }

}
