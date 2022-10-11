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
    @api keyword;
    data = [];
    rowOffset = 0;
    columns = columns;
    error;

    @wire(getAccountInfo,{key : '$keyword'})
    accountInfo({data,error}) {
        if(data) {

            console.log('>>>data>>>',data);
            if(data!=null)
            {
                this.data = data;
            } else {
                this.data = [];
            }    
            this.error = 'undefined';
        }

        if(error) {
            console.log('>>>error is>>>',error);
            this.data = 'undefined';
            this.error = error;
        }
    }

    handleKeywordChange(event) {
        console.log('>>>key value>>>',event.target.value);
        this.keyword = event.target.value;
    }
}