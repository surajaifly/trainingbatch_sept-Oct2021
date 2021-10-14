import { LightningElement, track } from 'lwc';

export default class LoopInLWC extends LightningElement {
    @track foodNames = [];
    //@track foodNames = ['Pasta', 'Pizza', 'Maggie', 'Pizza'];
    
    @track monthByIndex = [
        {
            key: 1,
            value: "JAN"
        },
        {
            key: 2,
            value: "FEB"
        },
        {
            key: 3,
            value: "MAR"
        }
    ];
    newFoodName;

    handleAddItem(event) {
        console.log('BUTTON IS CLICKED');
        this.foodNames.push(this.newFoodName);
        console.log('foodNames: ', this.foodNames);
    }

    handleNewFood(event) {
        console.log('New for Item', event.target.value);
        this.newFoodName = event.target.value;
    }

    handleAddMonth() {
        let item = {};
        item.key = 4;
        item.value = "APR";

        this.monthByIndex.push(item);
    }
}