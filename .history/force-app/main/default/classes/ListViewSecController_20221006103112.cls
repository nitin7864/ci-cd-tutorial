public with sharing class ListViewSecController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInfo(String countryCode){
        try {

            if(countryCode!=null && countryCode!='') {
                return [SELECT id,Name,OwnerId,BillingStateCode,Site,AnnualRevenue,NumberOfEmployees FROM Account WHERE BillingCountryCode =:countryCode];
            }

            return null;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
