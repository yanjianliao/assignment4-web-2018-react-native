import React from 'react'
import {View} from 'react-native'
import {ListItem} from 'react-native-elements'

const MODULE_API = 'https://first-yanjianliao.herokuapp.com/api/course/';


export default class ModuleList extends React.Component {

    static navigationOptions = {title: 'Modules'};

    constructor(props) {
        super(props);

        this.state = {
            courseId: '1',
            modules: []
        }


    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam("courseId", 1);
        this.setState({
            courseId: courseId
        });

        fetch(MODULE_API + courseId + '/module')
            .then(response => response.json())
            .then(
                modules => {
                    this.setState({
                        modules: modules
                    })
                }
            )
    }

    render() {
        return (

            <View style={{padding: 15}}>
                {this.state.modules.map(
                    (module, index) => (
                        <ListItem
                            key={index}
                            title={module.title}
                            onPress={
                                () => this.props.navigation
                                    .navigate("LessonList", {courseId: this.state.courseId, moduleId: module.id})
                            }
                        />
                    ))}
            </View>



        )
    }



}