import { Component } from '@angular/core';
import { CorporateWalletComponent } from "../corporate-wallet/corporate-wallet.component";
import { TableComponent } from "../../table/table.component";

@Component({
  selector: 'app-wallet1',
  standalone: true,
  imports: [CorporateWalletComponent, TableComponent],
  templateUrl: './wallet1.component.html',
  styleUrl: './wallet1.component.css'
})
export class Wallet1Component {

  walletDate ={
    balance:  2300,
    currency: 'SAR',
    points: 230,
    giftVoucherAmount: 230,
  }

  dataInfo=[
    {key:'transactionId' ,title:'Transaction Id'},
    {key:'serviceType' ,title:'Service Type'},
    {key:'transactionType' ,title:'Transaction Type'},
    {key:'transactionPurpose' ,title:'Transaction Purpose'},
    {key:'amount' ,title:'Amount'},
    {key:'customerName' ,title:'Customer Name'},
    {key:'emailAddress' ,title:'Email Address'},
    {key:'billingRefNo' ,title:'Billing ref No'}
  ]

  transactions: any[] =
  [
    {
      "transactionId": "TXN-1001",
      "serviceType": "Flight",
      "transactionType": "Credit",
      "transactionPurpose": "Add Ons",
      "amount": "SAR 1,701",
      "customerName": "Ahmed Raisi",
      "emailAddress": "ahmedraisi@gmail.com",
      "billingRefNo": "90612"
    },
    {
      "transactionId": "TXN-1002",
      "serviceType": "Hotel",
      "transactionType": "Credit",
      "transactionPurpose": "Add Ons",
      "amount": "SAR 1,230",
      "customerName": "Tariq Salem",
      "emailAddress": "tariq@gmail.com",
      "billingRefNo": "90613"
    },
    {
      "transactionId": "TXN-1003",
      "serviceType": "Cruise",
      "transactionType": "Credit",
      "transactionPurpose": "Gift Voucher",
      "amount": "SAR 1,702",
      "customerName": "Rami Saad",
      "emailAddress": "rami21@gmail.com",
      "billingRefNo": "90614"
    },
    {
      "transactionId": "TXN-1004",
      "serviceType": "Train",
      "transactionType": "Credit",
      "transactionPurpose": "Incentive",
      "amount": "SAR 1,801",
      "customerName": "Lina Ahmed",
      "emailAddress": "linaahmed@gmail.com",
      "billingRefNo": "90615"
    },
    {
      "transactionId": "TXN-1005",
      "serviceType": "Insurance",
      "transactionType": "Credit",
      "transactionPurpose": "Gift Voucher",
      "amount": "SAR 1,345",
      "customerName": "Reem Yasir",
      "emailAddress": "reem@gmail.com",
      "billingRefNo": "90616"
    },
    {
      "transactionId": "TXN-1006",
      "serviceType": "Insurance",
      "transactionType": "Debit",
      "transactionPurpose": "Incentive",
      "amount": "SAR 1,230",
      "customerName": "Sara Nabil",
      "emailAddress": "sara@gmail.com",
      "billingRefNo": "90617"
    },
    {
      "transactionId": "TXN-1007",
      "serviceType": "Cab",
      "transactionType": "Debit",
      "transactionPurpose": "Rewards",
      "amount": "SAR 1,040",
      "customerName": "Omar Zaid",
      "emailAddress": "omar@gmail.com",
      "billingRefNo": "90618"
    },
    {
      "transactionId": "TXN-1008",
      "serviceType": "Visa",
      "transactionType": "Credit",
      "transactionPurpose": "Incentive",
      "amount": "SAR 1,721",
      "customerName": "Ali Khan",
      "emailAddress": "ali@gmail.com",
      "billingRefNo": "90619"
    },
    {
      "transactionId": "TXN-1009",
      "serviceType": "Holidays",
      "transactionType": "Credit",
      "transactionPurpose": "Rewards",
      "amount": "SAR 1,734",
      "customerName": "Maya Saleh",
      "emailAddress": "mayasaleh@gmail.com",
      "billingRefNo": "90620"
    },
    {
      "transactionId": "TXN-1010",
      "serviceType": "Car Rental",
      "transactionType": "Debit",
      "transactionPurpose": "Maintenance",
      "amount": "SAR 1,512",
      "customerName": "Yousef Kamal",
      "emailAddress": "yousef@gmail.com",
      "billingRefNo": "90621"
    },
    {
      "transactionId": "TXN-1011",
      "serviceType": "Hotel",
      "transactionType": "Credit",
      "transactionPurpose": "Booking",
      "amount": "SAR 2,043",
      "customerName": "Layla Amin",
      "emailAddress": "layla@gmail.com",
      "billingRefNo": "90622"
    },
    {
      "transactionId": "TXN-1012",
      "serviceType": "Cruise",
      "transactionType": "Credit",
      "transactionPurpose": "Add Ons",
      "amount": "SAR 1,629",
      "customerName": "Hassan Omar",
      "emailAddress": "hassan@gmail.com",
      "billingRefNo": "90623"
    },
    {
      "transactionId": "TXN-1013",
      "serviceType": "Insurance",
      "transactionType": "Debit",
      "transactionPurpose": "Claims",
      "amount": "SAR 1,389",
      "customerName": "Nour El-Deen",
      "emailAddress": "nour@gmail.com",
      "billingRefNo": "90624"
    },
    {
      "transactionId": "TXN-1014",
      "serviceType": "Flight",
      "transactionType": "Credit",
      "transactionPurpose": "Upgrade",
      "amount": "SAR 2,210",
      "customerName": "Salma Fathi",
      "emailAddress": "salma@gmail.com",
      "billingRefNo": "90625"
    }
  ]
}
