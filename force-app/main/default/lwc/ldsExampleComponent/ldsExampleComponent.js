import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Opportunity.Name';
import AMOUNT_FIELD from '@salesforce/schema/Opportunity.Amount';

import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE_FIELD from '@salesforce/schema/Account.Phone';

export default class LdsExampleComponent extends LightningElement {
    opprtunityId;
    showOportunityForm = false;
    oppotunityFields = [NAME_FIELD, AMOUNT_FIELD];
    accountFields = [ACCOUNT_NAME_FIELD, ACCOUNT_PHONE_FIELD];

    handleSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        if (fields.Amount == '') {
            fields.Amount = 101;
        }
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    handleRecordEditSubmit(event){
        event.preventDefault();       // stop the form from submitting
        const fields = event.detail.fields;
        if (fields.Amount == '') {
            fields.Amount = 101;
        }
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    
    handleSuccess(event) {
        this.opprtunityId = event.detail.id;
        this.showOportunityForm = true;
        const evt = new ShowToastEvent({
            title: "Opportunity Updated",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
    }

    handleError(event) {
        const evt = new ShowToastEvent({
            title: "Error",
            message: "Recrod is unable to save",
            variant: "error"
        });
        this.dispatchEvent(evt);
    }

    handleLoad(event) {
        console.log('IN ON LOAD');
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                console.log('field', field.name, field.value);
                if(field.name === "Name") {
                    //field.reset();
                    field.value = 'New Opportunity';
                }
            });
        }
    }
}