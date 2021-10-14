public with sharing class ParentComponentController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getRelatedOpportunity(String currentOppId){
        try {
            Opportunity currentOpp = [
                SELECT AccountId 
                FROM Opportunity 
                WHERE  Id = :currentOppId
            ];
            
            List<Opportunity> relatedOppList = new List<Opportunity>();
            relatedOppList = [
                SELECT Name, Amount, ExpectedRevenue
                FROM Opportunity 
                WHERE  AccountId = :currentOpp.AccountId
            ];
            return relatedOppList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
