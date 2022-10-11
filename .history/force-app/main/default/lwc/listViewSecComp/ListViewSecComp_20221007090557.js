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
        
        let col = [];

        //Object.keys(value[0]).forEach((prop)=> console.log(prop));

        console.log('>>>first>>>',JSON.stringify(value[0]));

        for(let item in value[0]) {
            col.push({label : `${item}`, fieldName:`${item}`});
        }

        this.columns = col;
    }
        
        
    

   
    
}