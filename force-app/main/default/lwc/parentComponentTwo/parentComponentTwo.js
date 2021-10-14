import { LightningElement, track,wire } from 'lwc';

import {
    subscribe,
    APPLICATION_SCOPE,
    MessageContext
} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/Record_Selected__c';

export default class ParentComponentTwo extends LightningElement {
    @track valueFromDiffParent;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }
    // Encapsulate logic for Lightning message service subscribe and unsubsubscribe
    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordSelected,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    // Handler for message received by component
    handleMessage(message) {
        console.log('message.recordId', message.recordId);
        this.valueFromDiffParent = message.recordId;
    }
}