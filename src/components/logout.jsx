import { Component } from 'react'


class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem("td_token")
        window.location = "/"
        }
    
    render(){

        return null;

    }
    
}
 
export default Logout;