import { LightningElement, api, track } from 'lwc';

export default class ChildComponentOne extends LightningElement {
    @api relatedOpportunityList;
    @track selectedOppId;
    handleCheckBox(event) {
        console.log('event.target', JSON.stringify(event.target));
        this.selectedOppId = event.target.dataset.id;
        console.log('this.selectedOppId', this.selectedOppId);

        // Creates the event with the data.
        const selectedEvent = new CustomEvent("checkboxselection", {
            detail: this.selectedOppId
        });

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
}