import { LightningElement,wire,track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import COUNTRY_FIELD from '@salesforce/schema/Account.BillingCountryCode';
import STATE_FIELD from '@salesforce/schema/Account.BillingStateCode';
import getAccountInfo from '@salesforce/apex/ListViewSecController.getAccountInfo';

export default class FilterWithSearchableCombo extends LightningElement {
    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT })
    accounts;

    @track stateFieldData;
    @track countryOptions;
    @track stateOptions;
    countrySelected = '';
    stateSelected = '';
    keyword = '';
    @track data = [];
    @track origData = [];
    isCountrySelected = true;
    value="";

    @wire(getPicklistValues, {recordTypeId: '$accounts.data.defaultRecordTypeId', fieldApiName: COUNTRY_FIELD })
    countryFieldInfo({ data, error }) {
        if (data) {
            this.countryOptions = [ { label: '--None--', value: '', selected: true }, ...data.values ];
        }

        if(error) {
            console.error('>>> error occured>>>',error);
        }
            
    }

    @wire(getPicklistValues, {recordTypeId: '$accounts.data.defaultRecordTypeId', fieldApiName: STATE_FIELD })
    stateFieldInfo({ data, error }) {
        if (data) {
            this.stateFieldData = data;
        }

        if(error) {
            console.error('>>>error occured>>>',error);
        }
            
    }

    @wire(getAccountInfo,{countryCode: '$countrySelected'})
    accountInfo({data,error}) {
        if(data) {
            console.log('>>>data ret>>>',this.data);
            this.data = data.map(record => Object.assign(
                {"Owner.Name" : record.Owner.Name},
                record
            ));
            this.origData = this.data;
            this.error = 'undefined';
        }

        if(error) {
            this.data = 'undefined';
            this.error = error;
        }
    }

   handleCountryChange(event) {
        this.countrySelected = event.target.value;
        this.keyword = '';
        if(this.countrySelected == '') {
            this.isCountrySelected = true;
            this.data = [];
            this.stateSelected = '';
        } else {
            this.isCountrySelected = false;
            
            let key = this.stateFieldData.controllerValues[event.target.value];

            this.stateOptions = this.stateFieldData.values.filter(opt => opt.validFor.includes(key));

            this.stateOptions = [ { label: '--None--', value: '', selected: true }, ...this.stateOptions ];
        }
        
        
    }

    handleStateChange(event) {

        
                 this.stateSelected = event.target.value;
                 this.keyword = '';

                
            if(this.stateSelected == '' && this.countrySelected == '') {
                this.data = [];
            } else if(this.stateSelected == '' && this.countrySelected != '' && this.keyword == '') {
                this.data = this.origData;
            } else {
                try {
                    this.filterByState(this.origData);
                } catch(error) {
                    console.error(error);
                }
                
            }
       
    }

    filterByState(value) {
        if(value) {
            let stateRec = [];
            for(let rec of value) {
                if(rec.BillingStateCode == this.stateSelected) {
                    stateRec.push(rec);
                }
                    
            }

            this.data = [];
            this.data = stateRec;
        }

        
    }

    filterByName(arrayToProcess) {
            let newRexArr = [];
            for(let filterRec of arrayToProcess) {
                if(filterRec.Name.toLowerCase().includes(this.keyword)) {
                        newRexArr.push(filterRec);
                }
            }

            this.data = [];
            this.data = newRexArr;
    }
   

    handleEnter(event) {
        if(event.keyCode === 13 && this.data) {
            this.keyword = event.target.value.toLowerCase();
            try{
                this.filterByName(this.data);
            } catch (error) {
                console.error(error);
            }
            
        }
    }

    handleKeyChange(event) {
        if(event.target.value == '') {
            if(this.stateSelected != '' && this.origData) {
                try {
                    this.filterByState(this.origData);
                } catch(error) {
                    console.error(error);
                }
                
            } else if(this.countrySelected == '' && this.stateSelected == '') {
                this.data = [];
            } 
            else {
                this.data = [];
                this.data = this.origData;
            }

        }
    }
}