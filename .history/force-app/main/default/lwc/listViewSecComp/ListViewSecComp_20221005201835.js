import { LightningElement, wire, api, track } from 'lwc';
import getAccountInfo from '@salesforce/apex/ListViewSecController.getAccountInfo';

const columns = [
    {label:'Name',fieldName : 'Name',editable : true},
    {label:'Account Site',fieldName : 'Site',editable : true},
    {label:'Account Owner',fieldName : 'OwnerId',editable : true},
    {label:'AnnualRevenue',fieldName : 'AnnualRevenue',editable : true},
    {label:'NumberOfEmployees',fieldName : 'NumberOfEmployees',editable : true}
]

export default class ListViewSecComp extends LightningElement {
    keyword;
    data = [];
    rowOffset = 0;
    columns = columns;
    error;
    //_country;
    //_state;
    @track countrySelected;
    @track stateSelected;

    @api
    get country() {
        return this.countrySelected;
    }
    set country(value) {
        this.countrySelected = value;
        this.setValue();
        console.log('>>>country>>>',this.countrySelected);
    }
    @api
    get state() {
        return this.stateSelected;
    }
    set state(value) {
        this.stateSelected = value;
        this.setValue();
        console.log('>>>state>>>',this.stateSelected);
    }

    setValue() {
        getAccountInfo({state : this.stateSelected,country: this.countrySelected})
            .then((result) =>{
                this.data = result;
                this.error = 'undefined';
            })
            .catch((error) =>{
                this.data = 'undefined';
                this.error = error;
            })
    }

    

    /*@wire(getAccountInfo,{key : '$keyword',state : '$stateSelected',country: '$countrySelected'})
    accountInfo({data,error}) {
        if(data) {
            this.data = data;
            this.error = 'undefined';
        }

        if(error) {
            this.data = 'undefined';
            this.error = error;
        }
    }*/

    handleKeywordChange(event) {
        console.log('>>>key value>>>',event.target.value);
        this.keyword = event.target.value;
        /*if(this.keyword == '') {
            console.log('>>>keyword>>>',this.keyword);
            this.data = [];
        }*/
        this.setValue();
    }
}