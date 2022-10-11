import { LightningElement, wire, api, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';

const columns = [
    {label:'Name',fieldName : 'Name',editable : true,sortable : true},
    {label:'Account Site',fieldName : 'Site',editable : true,sortable : true},
    {label:'Account Owner',fieldName : 'Owner.Name',editable : true,sortable : true},
    {label:'AnnualRevenue',fieldName : 'AnnualRevenue',editable : true,sortable : true},
    {label:'NumberOfEmployees',fieldName : 'NumberOfEmployees',editable : true,sortable : true}
]

export default class ListViewSecComp extends NavigationMixin(LightningElement) {
    keyword;
    _filteredData = [];
    rowOffset = 0;
    columns = columns;
    @track sortBy;
    @track sortDirection;
    saveDraftValues = [];

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

  handleSave(event) {
        this.saveDraftValues = event.detail.draftValues;
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
 
        // Updateing the records using the UiRecordAPi
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.ShowToast('Success', 'Records Updated Successfully!', 'success', 'dismissable');
            this.saveDraftValues = [];
            return this.refresh();
        }).catch(error => {
            this.ShowToast('Error', 'An Error Occured!!', 'error', 'dismissable');
        }).finally(() => {
            this.saveDraftValues = [];
        });
    }
 
    ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
                title: title,
                message:message,
                variant: variant,
                mode: mode
            });
            this.dispatchEvent(evt);
    }
 
    // This function is used to refresh the table once data updated
    async refresh() {
        await refreshApex(this.contacts);
    }
    
}