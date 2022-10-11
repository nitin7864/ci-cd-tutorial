import { LightningElement,wire,track } from 'lwc';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import COUNTRY_FIELD from '@salesforce/schema/Account.BillingCountryCode';
import STATE_FIELD from '@salesforce/schema/Account.BillingStateCode';
import getAccountInfo from '@salesforce/apex/ListViewSecController.getAccountInfo';

export default class FilterSecComp extends LightningElement {
    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT })
    accounts;

    @track stateFieldData;
    @track countryOptions;
    @track stateOptions;
    countrySelected = '';
    stateSelected = '';
    @track data = [];
    @track origData = [];
    isCountrySelected = true;

    @wire(getPicklistValues, {recordTypeId: '$accounts.data.defaultRecordTypeId', fieldApiName: COUNTRY_FIELD })
    countryFieldInfo({ data, error }) {
        if (data) {
            //console.log('>>>Country>>>',data.values);
            //this.countryOptions = data.values;
            this.countryOptions = [ { label: '--None--', value: '', selected: true }, ...data.values ];
        }

        if(error) {
            console.log('>>> error occured>>>',error);
        }
            
    }

    @wire(getPicklistValues, {recordTypeId: '$accounts.data.defaultRecordTypeId', fieldApiName: STATE_FIELD })
    stateFieldInfo({ data, error }) {
        if (data) {
            this.stateFieldData = data;
        }
            
    }

    @wire(getAccountInfo,{countryCode: '$countrySelected'})
    accountInfo({data,error}) {
        if(data) {
            this.data = data;
            this.origData = data;
            this.error = 'undefined';
        }

        if(error) {
            this.data = 'undefined';
            this.error = error;
        }
    }

   handleCountryChange(event) {
        this.countrySelected = event.target.value;
        if(this.countrySelected == '') {
            this.isCountrySelected = true;
        } else {
            this.isCountrySelected = false;
            let key = this.stateFieldData.controllerValues[event.target.value];

            this.stateOptions = this.stateFieldData.values.filter(opt => opt.validFor.includes(key));

            this.stateOptions = [ { label: '--None--', value: '', selected: true }, ...this.stateOptions ];
        }
        
        
    }

    handleStateChange(event) {

        try {
                 this.stateSelected = event.target.value;
        console.log('>>>state Select>>>',this.stateSelected);
            
            this.filterByState(this.origData);
         
        /*const filterData = this.data.filter(filterByState);
        this.data = filterData;
        console.log('>>>filtered data>>>',this.data); */
        }

        catch(error) {
            console.error(error);
        }
       
    }

    filterByState(value) {
        console.log('inside filter by state');
        console.log('>>>orig Array>>>',value);
        if(value) {
            let stateRec = [];
            for(let rec of value) {
                console.log('>>>rec state>>>',rec.BillingStateCode);
                if(rec.BillingStateCode == this.stateSelected) {
                    console.log('>>>inside if>>>',rec.BillingStateCode);
                    stateRec.push(rec);
                }
                    
            }

            this.data = [];
            this.data = stateRec;
        }

        
    }
   

    handleEnter(event) {
        if(event.keyCode === 13 && this.data) {
            let newRexArr = [];
            for(let filterRec of this.data) {
                if(filterRec.Name.includes(event.target.value)) {
                        newRexArr.push(filterRec);
                }
            }

            this.data = [];
            this.data = newRexArr;
        }
    }

    handleKeyChange(event) {
        if(event.target.value == '') {
            console.log('>>>stateSelected>>>',this.stateSelected);
            if(this.stateSelected != '' && this.origData) {
                console.log('inside if');
                this.filterByState(this.origData);
            } else {
                console.log('inside else');
                this.data = [];
                this.data = this.origData;
            }

        }
    }
}
