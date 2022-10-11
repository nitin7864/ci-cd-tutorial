import { LightningElement, wire } from 'lwc';
import getAccountInfo from '@salesforce/apex/ListViewSecController.getAccountInfo'

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

    @wire()

    handleKeywordChange(event) {

    }
}