import { LightningElement, wire, api } from 'lwc';
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
    }
    @api
    get state() {
        return this._state;
    }
    set state(value) {
        this.setAttribute('state',value);
        this._state = value;
    }

    connectedCallback() {
        console.log('>>>country>>>',this.country);
        console.log('>>>state selected>>>',this.state);
    }

    @wire(getAccountInfo,{key : '$keyword'})
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