import React, {Component} from 'react';
import CreateFamilyForm from './CreateFamilyForm.js'
import $ from 'jquery';
import appState from '../../../GlobalData.js'
import { browserHistory } from 'react-router';

class InviteFamilyPage extends Component{

  constructor(props){
    super(props);

    this.state = {
      errors: '',
      family: {
        id: appState.family.id,
        name: appState.family.name,
        from_email: appState.user.email,
        to_email: ''
      }
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  changeUser(event) {
    const field = event.target.name;
    const family = this.state.family;
    family[field] = event.target.value;

    this.setState({family});
  }

  processForm(event) {
    event.preventDefault();
    console.log('name: ', this.state.user.name);
    console.log('to_email: ',this.state.user.email);
    console.log('password: ', this.state.user.password);
    console.log('password_confirmation: ', this.state.user.password_confirmation);
    console.log('contact: ', this.state.user.contact);
    console.log('address: ', this.state.user.address);

    // create a string for an HTTP body message
    const name = (this.state.user.name);
    const email = (this.state.user.email);
    const password = (this.state.user.password);
    const password_confirmation = (this.state.user.password_confirmation);
    const contact = (this.state.user.contact);
    const address = (this.state.user.address);

     $.ajax({
       url: `http://localhost:5000/invites/${this.state.user.id}`,
       type: 'POST',
       data: { invite: {
                  name: name,
                  email: email,
                  password: password,
                  password_confirmation: password_confirmation,
                  contact: contact,
                  address: address
              } },
       success: (response) => {
         console.log('it worked!', response);
         let userData = response.data.attributes
         appState.user = { id: response.data.id,
                           name: userData.name,
                           email: userData.email,
                           contact: userData.contact,
                           address: userData.address
                         };
         browserHistory.push('/home');
       },
       error: (response) => {
         this.setState({errors: response.responseText});
         console.log("Error!!!",response.responseText);
       }
     });

  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }

}

export default InviteFamilyPage;