public with sharing class ListViewSecController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInfo(String key){
        try {
            String searchKey = '%'+key+'%';

            return [SELECT id,Name,OwnerId,Site,AnnualRevenue,NumberOfEmployees FROM Account WHERE Name LIKE :searchKey];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
