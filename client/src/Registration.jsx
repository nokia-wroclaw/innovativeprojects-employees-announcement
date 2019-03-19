import React, { Component } from 'react';

import './Registration.css';


class Registration extends Component {
  constructor(){
      super();


      this.state = {
        name:'',
        surname:'',
        email:'',
        phone:'',
        password:'',
        passwordConfirmation:''

      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }


    handleChange(event) {
        let target = event.target;
        let value =  target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
      }

    handleSubmit(event) {
        event.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
      }

  render() {
    return (
      <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">

              <div className="FormField">
                <label className="FormField__Label" htmlFor="name"> Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your name" name="name" value={this.state.name} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="surname"> Surname</label>
                <input type="text" id="surname" className="FormField__Input" placeholder="Enter your surname" name="surname" value={this.state.surname} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">Phone</label>
                <input type="tel" id="phone" className="FormField__Input" placeholder="Enter your phone" name="phone" value={this.state.phone} onChange={this.handleChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" required/>
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="passwordConfirmation">Password Confirmation</label>
                <input type="password" id="passwordConfirmation" className="FormField__Input" placeholder="Enter your password again" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} />
              </div>
              <div >
                  <button >Sign Up</button>
              </div>

            </form>
        </div>
    );
  }
}

export default Registration;
