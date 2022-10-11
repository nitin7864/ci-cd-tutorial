public with sharing class ListViewSecController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountInfo(String state,String country){
        try {

            System.debug('>>>key>>>'+key);
            System.debug('>>>state>>>'+state);
            System.debug('>>>country>>>'+country);

            if(key!=null && key!='') {
                System.debug('>>>inside key>>>'+key);
                String searchKey = '%'+key+'%';
                return [SELECT id,Name,OwnerId,Site,AnnualRevenue,NumberOfEmployees FROM Account WHERE Name LIKE :searchKey];
            }

            return null;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
