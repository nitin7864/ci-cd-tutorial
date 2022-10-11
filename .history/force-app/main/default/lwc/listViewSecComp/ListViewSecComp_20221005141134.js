import { LightningElement } from 'lwc';

const columns = [
    {label:'Name',fieldName : '',editable : true},
    {label:'Account Site',fieldName : '',editable : true},
    {label:'Account Owner',fieldName : '',editable : true},
    {label:'AnnualRevenue',fieldName : '',editable : true},
    {label:'NumberOfEmployees',fieldName : '',editable : true}
]

export default class ListViewSecComp extends LightningElement {
    keyword;
    data = [];
    rowOffset = 0;

    handleKeywordChange(event) {

    }
}