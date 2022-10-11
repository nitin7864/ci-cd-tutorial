public with sharing class ListViewSecController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInfo(String countryCode){
        try {

            if(countryCode!=null && countryCode!='') {
                return [SELECT id,Name,Owner.Name,BillingStateCode,Site,AnnualRevenue,NumberOfEmployees FROM Account WHERE BillingCountry =:countryCode];
            }

            return null;
            
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    
    public class CustomException extends Exception {

    }
    
}