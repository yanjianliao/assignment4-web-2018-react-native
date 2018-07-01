import React from 'react'
import {View} from 'react-native'
import { ListItem } from 'react-native-elements'

const COURSE_API = 'http://localhost:8080/api/course';


export default class CourseList extends React.Component {

    static navigationOptions = {title: 'Courses'};

    constructor(props) {
        super(props);

        this.state = {
            courses: []
        };

        fetch(COURSE_API)
            .then(response => (response.json()))
            .then(courses => {
                this.setState({
                    courses: courses
                });
            });
    }


    render() {
        return(

            <View style={{padding: 15}}>

                {this.state.courses.map((course, index) => (
                    <ListItem
                        onPress={() => this.props
                            .navigation.navigate("ModuleList",
                                {courseId: course.id})}
                        title={course.title}
                        key={course.id}
                    />
                ))}

            </View>

        )
    }


}


