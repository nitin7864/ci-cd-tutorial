public with sharing class ListViewSecController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInfo(String key){
        try {

            System.debug('>>>key>>>'+key);
            if(key!=null && key!='') {
                String searchKey = '%'+key+'%';
                return [SELECT id,Name,OwnerId,Site,AnnualRevenue,NumberOfEmployees FROM Account WHERE Name LIKE :searchKey];
            }

            return null;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
