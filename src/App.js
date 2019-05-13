import React, { Component } from 'react';
import { database } from  './firebase';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: []
        }
    }
  
    componentDidMount(){
        const randomUser = database.ref('user')
        randomUser.on('value', (snapshot) => {
            let userInfo = snapshot.val();
            let newState = [];
            for (let person in userInfo) {
                newState.push({
                    _id: person,
                    username: userInfo[person].username,
                    password: userInfo[person].password
                })
            }
            this.setState({
                user: newState
            })
        })
    }
    render() {
        console.log(database)
        const userData = this.state.user.map(data => {
            return <h1>{data.username}, {data.password}</h1>
        })
        return (
            <div>
                {userData}
            </div>
        );
    }
}

export default App;