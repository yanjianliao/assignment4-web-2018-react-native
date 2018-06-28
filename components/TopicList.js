import React from 'react'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'


const TOPIC_API = 'http://localhost:8080/api/course/';

export default class TopicList extends React.Component {

    static navigationOptions = {title: 'Topics'};

    constructor(props) {
        super(props);

        this.state = {
            courseId: 1,
            moduleId: 1,
            topics: []
        }

    }

    componentDidMount() {

        const {navigation} = this.props;
        const courseId = navigation.getParam('courseId', 1);
        const moduleId = navigation.getParam('moduleId', 1);
        const lessonId = navigation.getParam('lessonId', 1);

        fetch(TOPIC_API + courseId + "/module/" + moduleId + "/lesson/" + lessonId + "/topic/")
            .then(response => response.json())
            .then(
                topics => this.setState({topics: topics})
            )

    }


    render() {

        return (

            <View>
                {this.state.topics.map(
                    topic => (
                        <ListItem
                            title={topic.title}
                            key={topic.id}
                            onPress={
                                () => {
                                    this.props.navigation
                                        .navigate('WidgetList', {topicId: topic.id})
                                }
                            }
                        />


                    )
                )}



            </View>


        )

    }




}