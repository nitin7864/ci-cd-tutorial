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
    @api
    get country() {
        return this._country;
    }
    set country(value) {
        this.setAttribute('country',value);
        this._country = value;
        console.log('>>>country>>>',this._country);
    }
    @api
    get state() {
        return this._state;
    }
    set state(value) {
        this.setAttribute('state',value);
        this._state = value;
        console.log('>>>state>>>',this._state);
    }

    @track _country;
    @track _state;

    connectedCallback() {
        console.log('>>>connectedCallback country>>>',this._country);
        console.log('>>>connectedCallback state>>>',this._state);
    }

    @wire(getAccountInfo,{key : '$keyword',state : '$_state',country: '$_country'})
    accountInfo({data,error}) {
        if(data) {
            this.data = data;
            this.error = 'undefined';
        }

        if(error) {
            this.data = 'undefined';
            this.error = error;
        }
    }

    handleKeywordChange(event) {
        console.log('>>>key value>>>',event.target.value);
        this.keyword = event.target.value;
        if(this.keyword == '') {
            console.log('>>>keyword>>>',this.keyword);
            this.data = [];
        }
    }
}