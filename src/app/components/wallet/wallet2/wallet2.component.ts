import { Component } from '@angular/core';
import { TableComponent } from "../../table/table.component";
import { CorporateWalletComponent } from "../corporate-wallet/corporate-wallet.component";

@Component({
  selector: 'app-wallet2',
  standalone: true,
  imports: [TableComponent, CorporateWalletComponent],
  templateUrl: './wallet2.component.html',
  styleUrl: './wallet2.component.css'
})
export class Wallet2Component {

  isTran=true
  walletDate ={
    balance:  2300,
    currency: 'SAR',
    points: 230,
    giftVoucherAmount: 230,
  }
  dataInfo=[
    {key:'TransactionID' ,title:'Transaction Id'},
    {key:'ServiceType' ,title:'Service Type'},
    {key:'CorporateName' ,title:'Corporate Name'},
    {key:'CustomerName' ,title:'Customer Name'},
    {key:'EmailAddress' ,title:'Email Address'},
    {key:'TransactionType' ,title:'Transaction Type'},
    {key:'TransactionDate' ,title:'Transaction Date'}
  ]

  transactions: any[] =
  [
    {
      "TransactionID": "TXN-1001",
      "ServiceType": "Flight",
      "CorporateName": "Aurex Consulting Group",
      "CustomerName": "Ahmed Raisi",
      "EmailAddress": "ahmedraisi@gmail.com",
      "TransactionType": "Credit",
      "TransactionDate": "14/05/2025"
    },
    {
      "TransactionID": "TXN-1002",
      "ServiceType": "Hotel",
      "CorporateName": "Avanta Energy Services",
      "CustomerName": "Tariq Salem",
      "EmailAddress": "tariq@gmail.com",
      "TransactionType": "Credit",
      "TransactionDate": "12/05/2025"
    },
    {
      "TransactionID": "TXN-1003",
      "ServiceType": "Cruise",
      "CorporateName": "Axton Global Solutions",
      "CustomerName": "Rami Saad",
      "EmailAddress": "rami21@gmail.com",
      "TransactionType": "Credit",
      "TransactionDate": "02/05/2025"
    },
    {
      "TransactionID": "TXN-1004",
      "ServiceType": "Train",
      "CorporateName": "BrightPath Technologies",
      "CustomerName": "Lina Ahmed",
      "EmailAddress": "linaahmed@gmail.com",
      "TransactionType": "Credit",
      "TransactionDate": "22/04/2025"
    },
    {
      "TransactionID": "TXN-1005",
      "ServiceType": "Insurance",
      "CorporateName": "BlueOrbit Travel Solutions",
      "CustomerName": "Reem Yasir",
      "EmailAddress": "reem@gmail.com",
      "TransactionType": "Credit",
      "TransactionDate": "22/04/2025"
    },
    {
      "TransactionID": "TXN-1006",
      "ServiceType": "Insurance",
      "CorporateName": "BrightEdge Technologies LLC",
      "CustomerName": "Sara Nabil",
      "EmailAddress": "sara@gmail.com",
      "TransactionType": "Debit",
      "TransactionDate": "21/04/2025"
    },
    {
      "TransactionID": "TXN-1007",
      "ServiceType": "Cab",
      "CorporateName": "BrightEdge Technologies GmbH",
      "CustomerName": "Omar Zaid",
      "EmailAddress": "omar@gmail.com",
      "TransactionType": "Debit",
      "TransactionDate": "12/04/2025"
    },
    {
      "TransactionID": "TXN-1008",
      "ServiceType": "Visa",
      "CorporateName": "BrightEdge Technologies Inc.",
      "CustomerName": "Ali Khan",
      "EmailAddress": "ali@gmail.com",
      "TransactionType": "Credit",
      "TransactionDate": "02/04/2025"
    },
    {
      "TransactionID": "TXN-1009",
      "ServiceType": "Holidays",
      "CorporateName": "BrightEdge Technologies Ltd",
      "CustomerName": "Maya Saleh",
      "EmailAddress": "mayasaleh@gmail.com",
      "TransactionType": "Credit",
      "TransactionDate": "01/04/2025"
    }
  ]

  filters:any[]=[
    {
      filterName:"ServiceType",
      placeholder:"Service Type",
      value:"",
      options:["Fight","Hotel","Train","Visa"]
    },
    {
      filterName:"TransactionType",
      placeholder:"Transaction Type",
      value:"",
      options:["Credit","Debit"]
    },
  ]

  shift(){
    this.isTran=!this.isTran
  }
}
