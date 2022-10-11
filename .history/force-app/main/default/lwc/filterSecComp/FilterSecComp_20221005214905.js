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
    @track countrySelected = '';
    @track stateSelected = '';

    @wire(getPicklistValues, {recordTypeId: '$accounts.data.defaultRecordTypeId', fieldApiName: COUNTRY_FIELD })
    countryFieldInfo({ data, error }) {
        if (data) {
            //console.log('>>>Country>>>',data.values);
            this.countryOptions = data.values;
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
            this.error = 'undefined';
        }

        if(error) {
            this.data = 'undefined';
            this.error = error;
        }
    }

   handleCountryChange(event) {
        this.countrySelected = event.target.value;
        let key = this.stateFieldData.controllerValues[event.target.value];

        this.stateOptions = this.stateFieldData.values.filter(opt => opt.validFor.includes(key));
    }

    handleStateChange(event) {
        this.stateSelected = event.target.value;
        console.log('>>>state Select>>>',this.stateSelected);
        const filterData = this.data.filter(stateData => stateData.BillingStateCode.includes(this.stateSelected));
        this.data = filterData;
        console.log('>>>filtered data>>>',this.data);
    }

    handleEnter(event) {
        if(event.keyCode === 13) {
            this.handleKeywordChange();
        }
    }

    handleKeywordChange() {

    }
}
