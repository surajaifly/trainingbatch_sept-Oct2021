import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import apexMethodName from '@salesforce/apex/Namespace.Classname.apexMethodReference';
import getContacts from '@salesforce/apex/WireMethodController.getContacts';
import searchContacts from '@salesforce/apex/WireMethodController.searchContacts';
import createContact from '@salesforce/apex/WireMethodController.createContact';


export default class WireMethodComponent extends LightningElement {
    
    //@wire(getContacts) contactList; //data and Error.
    @track contactList;
    @track error;
    @track queryTerm;
    @track showNewContact = false;
    @track lastName;

    @wire(getContacts)
    wiredContacts({ error, data }) {
        console.log('data', data);
        console.log('error', error);
        if (data) {
            this.contactList = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contactList = undefined;
        }
    }

    @wire(searchContacts, {searchStr: '$queryTerm'})
    wiredContacts({ error, data }) {
        console.log('data', data);
        console.log('error', error);
        
        if (data) {
            this.contactList = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.contactList = undefined;
        }
    }

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.queryTerm = evt.target.value;
        }
    }

    handleLastName(event) {
        this.lastName = event.target.value;
    }

    handleNewClick() {
        this.showNewContact = true;
    }

    handleCancelClick() {
        this.showNewContact = false;
    }

    handleSaveClick() {
        createContact({lastNameStr: this.lastName})
            .then(result => {
                console.log(result);
                const evt = new ShowToastEvent({
                    title: "Contact Create",
                    message: "Record ID: " + result,
                    variant: "success"
                });
                this.dispatchEvent(evt);
                this.handleCancelClick();
            })
            .catch(error => {
                console.log(error);
            });
    }
}
