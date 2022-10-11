import { LightningElement, wire, api, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateAccounts from '@salesforce/apex/ListViewSecController.updateAccounts';

const columns = [
    {label:'Name',fieldName : 'Name',editable : true,sortable : true},
    {label:'Account Site',fieldName : 'Site',editable : true,sortable : true},
    {label:'Account Owner',fieldName : 'Owner.Name',editable : true,sortable : true},
    {label:'AnnualRevenue',fieldName : 'AnnualRevenue',editable : true,sortable : true},
    {label:'NumberOfEmployees',fieldName : 'NumberOfEmployees',editable : true,sortable : true}
]

export default class ListViewSecComp extends LightningElement {
    keyword;
    _filteredData = [];
    rowOffset = 0;
    columns = columns;
    @track sortBy;
    @track sortDirection;
    @track draftValues = [];

    @api
    get filteredData() {
        return this._filteredData;
    }
    set filteredData(value) {
        this._filteredData = value;
        console.log('>>>filteredData>>>',this._filteredData);
    }
   

    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy,this.sortDirection);
    }

    

    sortData(fieldname, direction) {
        let parseData = JSON.parse(JSON.stringify(this.filteredData));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === "asc" ? 1 : -1;
        parseData.sort((x, y) => {
        x = keyValue(x) ? keyValue(x) : "";
        y = keyValue(y) ? keyValue(y) : "";
      
        typeof(x) === 'string' ? x=x.toLowerCase() : x;
        typeof(y) === 'string' ? y=y.toLowerCase() : y;
        return isReverse * ((x > y) - (y > x));
    });
    this.filteredData = parseData;
  }

  async handleSave(event) {
        const updatedFields = event.detail.draftValues;

        await updateAccounts( { data: updatedFields } )
        .then( result => {

            console.log( JSON.stringify( 'Apex update result: ',result ) );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account(s) updated',
                    variant: 'success'
                })
            );
            
            refreshApex( this.filteredData ).then( () => {
                this.draftValues = [];
            });        

        }).catch( error => {

            console.log( 'Error is ' + JSON.stringify( error ) );
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or refreshing records',
                    message: error.body.message,
                    variant: 'error'
                })
            );

        });
  }    
    
}