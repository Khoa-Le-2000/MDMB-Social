class Account {
    constructor(AccountId, Password, Phone, Email, Name, Avatar, Birthday, Gender, CreatedDate) {
        this.AccountId = AccountId;
        this.Password = Password;
        this.Phone = Phone;
        this.Email = Email;
        this.Name = Name;
        this.Avatar = Avatar;
        this.Birthday = Birthday;
        this.Gender = Gender;
        this.CreatedDate = CreatedDate;
    }
}

exports.Account = Account;