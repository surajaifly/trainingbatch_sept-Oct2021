public with sharing class WireMethodController {
    @AuraEnabled(cacheable=true)
    public static List<contact> getContacts(){
        try {
            List<Contact> contactList = new List<Contact>();
            contactList = [
                SELECT Id, Name, FirstName, LastName, Email, Phone
                FROM Contact
                WHERE AccountId != NULL
                LIMIT 10
            ];
            //throw new AuraHandledException('Custom Error');
            return contactList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }

    @AuraEnabled(cacheable=true)
    public static List<contact> searchContacts(String searchStr){
        try {
            String searchKeyword = '%' + searchStr + '%';
            List<Contact> contactList = new List<Contact>();
            contactList = [
                SELECT Id, Name, FirstName, LastName, Email, Phone
                FROM Contact
                WHERE AccountId != NULL
                AND Name Like :searchKeyword
                LIMIT 10
            ];
            //throw new AuraHandledException('Custom Error');
            return contactList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

    }


    @AuraEnabled
    public static String createContact(String lastNameStr){
        try {
            Contact cont = new Contact();
            cont.LastName = lastNameStr;
            INSERT cont;
            return cont.id;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
