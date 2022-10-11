import { LightningElement,wire,track } from 'lwc';

import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {getPicklistValues} from 'lightning/uiObjectInfoApi';
import COUNTRY_FIELD from '@salesforce/schema/Account.BillingCountryCode';
import STATE_FIELD from '@salesforce/schema/Account.BillingStateCode';

export default class FilterSecComp extends LightningElement {
    @wire(getObjectInfo, {objectApiName: ACCOUNT_OBJECT })
    accounts;

    @track stateFieldData;
    @track countryOptions;
    @track stateOptions;

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

    connectedCallback() {
        console.log('>>>country options Val>>>',this.countryOptions);
    }

   handleCountryChange(event) {
        let key = this.stateFieldData.controllerValues[event.target.value];

        this.stateOptions = this.countryFieldData.values.filter(opt => opt.validFor.includes(key));
    }
}
