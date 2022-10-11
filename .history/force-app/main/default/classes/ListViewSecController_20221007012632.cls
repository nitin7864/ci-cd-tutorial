public with sharing class ListViewSecController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInfo(String countryCode){
        try {

            if(countryCode!=null && countryCode!='') {
                return [SELECT id,Name,Owner.Name,BillingStateCode,Site,AnnualRevenue,NumberOfEmployees FROM Account WHERE BillingCountryCode =:countryCode];
            }

            return null;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static string updateAccounts( Object data ) {
        
        List < Account > accsForUpdate = ( List < Account > ) JSON.deserialize(
            JSON.serialize( data ),
            List <Account>.class
        );
        try {
            update accsForUpdate;
            return ‘Success: Account(s) updated successfully’;
        }
        catch (Exception e) {
            return ‘The following exception has occurred: ‘ + e.getMessage();
        }

    }
}
