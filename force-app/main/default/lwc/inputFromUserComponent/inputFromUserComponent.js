//LWC Supports - One - Way Binding or Variable.
import { LightningElement, track, api } from 'lwc';

export default class InputFromUserComponent extends LightningElement {
    inputFromUser = 'Testing Input';
    //@track, @wire, and @api
    @track newInput;
    firstName = '';
    lastName = '';
    //fullName = '';

    getfullName() {
        return this.firstName + ' ' + this.lastName;
    }

    myFunction(event) {
        //console.log(event.target.value);
        this.newInput = event.target.value;

        console.log('inputFromUser: ', this.inputFromUser, this.newInput);
    }

    handleFirstName(event) {
        this.firstName = event.target.value;
        //this.fullName = this.firstName + ' ' + this.lastName;
    }

    handleLastName(event) {
        this.lastName = event.target.value;
        //this.fullName = this.firstName + ' ' + this.lastName;
    }
}