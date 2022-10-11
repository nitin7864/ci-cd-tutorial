public with sharing class ListViewSecController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInfo(String countryCode){
        
        List<AccountWrapperClass> wrapperList = new List<AccountWrapperClass>();
        /*for(Account acc : [SELECT Id, Name, billingStreet, billingCity, billingState, billingCountry, Type, (SELECT Id FROM Contacts) FROM Account WHERE Name != '' LIMIT 10]){
            wrapperList.add(new AccountWrapperClass(acc, acc.Contacts.SIZE()));
        }
        return wrapperList; */
        try {

            if(countryCode!=null && countryCode!='') {
                for(Account acc :[SELECT id,Name,Owner.Name,BillingStateCode,Site,AnnualRevenue,NumberOfEmployees FROM Account WHERE BillingCountryCode =:countryCode]) {

                }
            }

            return null;
            
        } catch (Exception e) {
            throw new CustomException(e.getMessage());
        }
    }

    public class AccountWrapperClass{
        @AuraEnabled
        public Account acc;
        @AuraEnabled
        public String Name;
        @AuraEnabled
        public String AccountSite;
        @AuraEnabled
        public String AccountOwner;
        @AuraEnabled
        public Integer AnnualRevenues;
        @AuraEnabled
        public Integer NumberOfEmployees;
 
 
        public AccountWrapperClass(Account acc){
            this.acc = acc;
            this.Name = acc.Name;
            this.AccountSite = acc.Site;
            this.AccountOwner = acc.Name;
            this.AnnualRevenues = acc.AnnualRevenue;
            this.NumberOfEmployees = acc.NumberOfEmployees;
        }
    }
    
    public class CustomException extends Exception {

    }
    
}
