import { LightningElement, wire, api, track } from 'lwc';

const columns = [
    {label:'Name',fieldName : 'Name',editable : true},
    {label:'Account Site',fieldName : 'Site',editable : true},
    {label:'Account Owner',fieldName : 'OwnerId',editable : true},
    {label:'AnnualRevenue',fieldName : 'AnnualRevenue',editable : true},
    {label:'NumberOfEmployees',fieldName : 'NumberOfEmployees',editable : true}
]

export default class ListViewSecComp extends LightningElement {
    keyword;
    _filteredData = [];
    rowOffset = 0;
    columns = columns;
    @track sortBy;
    @track sortDirection;

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
    let parseData = JSON.parse(JSON.stringify(this._filteredData));
    let keyValue = (a) => {
      return a[fieldname];
    };
    let isReverse = direction === "asc" ? 1 : -1;
    parseData.sort((x, y) => {
      x = keyValue(x) ? keyValue(x) : "";
      y = keyValue(y) ? keyValue(y) : "";
      return isReverse * ((x > y) - (y > x));
    });
    this._filteredData = parseData;
  }
    
}