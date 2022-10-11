import { LightningElement, wire, api, track } from 'lwc';

/*const columns = [
    {label:'Name',fieldName : 'Name',editable : true,sortable : true},
    {label:'Account Site',fieldName : 'Site',editable : true,sortable : true},
    {label:'Account Owner',fieldName : 'Owner.Name',editable : true,sortable : true},
    {label:'AnnualRevenue',fieldName : 'AnnualRevenue',editable : true,sortable : true},
    {label:'NumberOfEmployees',fieldName : 'NumberOfEmployees',editable : true,sortable : true}
] */

export default class ListViewSecComp extends LightningElement {
    keyword;
    _filteredData = [];
    rowOffset = 0;
    //columns = columns;
    columns;
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
        this.setupColumn(this._filteredData);
    }
   
    setupColumn(value) {
        console.log('>>>connectedCallback called>>>');
        let col = [];
        console.log('>>>this.filteredData>>>',value);
        for(let item in value[0]) {
            console.log('>>>item>>>',item);
            col.push({label : `${item}`, fieldName:`${item}`});
        }

        this.columns = col;
    }
        
        
    

   
    
}