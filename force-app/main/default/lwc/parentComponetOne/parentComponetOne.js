import { LightningElement, api, wire, track } from 'lwc';
//import apexMethodName from '@salesforce/apex/Namespace.Classname.apexMethodReference';
import getRelatedOpportunity from '@salesforce/apex/ParentComponentController.getRelatedOpportunity';

import { publish, MessageContext } from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/Record_Selected__c';

export default class ParentComponetOne extends LightningElement {
    @api recordId;
    @track oppList;
    @track error;
    @track salectedChildOpprtunityId;

    connectedCallback() {
        console.log('recrodId', this.recordId);
    }

    @wire(MessageContext)
    messageContext;

    @wire(getRelatedOpportunity, {currentOppId: '$recordId'})
    wiredContacts({ error, data }) {
        console.log('data', data);
        console.log('error', error);
        
        if (data) {
            this.oppList = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.oppList = undefined;
        }
    }

    handleSelctedOpportunity(event) {
        console.log('event Captured.', event.detail);
        this.salectedChildOpprtunityId = event.detail;

        const payload = { recordId: this.salectedChildOpprtunityId };

        publish(this.messageContext, recordSelected, payload);
    }

}