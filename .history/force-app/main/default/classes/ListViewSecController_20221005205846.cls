public with sharing class ListViewSecController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInfo(String countryCode){
        try {

            if(country!=null && country!='') {
                System.debug('>>>inside key>>>'+key);
                String searchKey = '%'+countryCode+'%';
                return [SELECT id,Name,OwnerId,Site,AnnualRevenue,NumberOfEmployees FROM Account WHERE BillingCountryCode LIKE :searchKey];
            }

            return null;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
