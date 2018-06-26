import React from 'react'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'

const LESSON_API = "http://localhost:8080/api/course/";

export default class LessonList extends React.Component {

    static navigationOptions = {title: 'Lessons'};


    constructor(props) {
        super(props);

        this.state = {
            lessons: [],
            courseId: '1',
            moduleId: '1'
        }
    }


    componentDidMount() {

        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId");
        const moduleId = navigation.getParam("moduleId");

        this.setState({
            courseId: courseId,
            moduleId: moduleId
        });


        fetch(LESSON_API + courseId + "/module/" + moduleId + '/lesson')
            .then(response => response.json())
            .then(lessons => this.setState({lessons: lessons}))

    }

    render() {

        return (

            <View style={{padding: 15}}>
                {this.state.lessons.map(
                    (lesson, index) => (
                        <ListItem
                            title={lesson.title}
                            key={lesson.id}
                            onPress={() => this.props.navigation
                                .navigate("TopicList", {
                                    courseId: this.state.courseId,
                                    moduleId: this.state.moduleId,
                                    lessonId: lesson.id
                                })}
                        />
                    )
                )}

            </View>


        )


    }



}