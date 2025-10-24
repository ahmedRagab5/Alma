import { Component, ContentChild, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../table/table.component";
import { title } from 'process';
import { PaymentComponent } from "./payment/payment.component";
import { ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: 'app-corporate-wallet',
  standalone: true,
  imports: [FormsModule, CommonModule, TableComponent, PaymentComponent, ɵEmptyOutletComponent],
  templateUrl: './corporate-wallet.component.html',
  styleUrl: './corporate-wallet.component.css'
})
export class CorporateWalletComponent {

  @ContentChild(TableComponent) child!: TableComponent;

  @Input() date:any={}
  @Input() length:number=0
  // Wallet data
  // balance: number = 2300;
  // currency: string = 'SAR';
  // points: number = 230;
  // giftVoucherAmount: number = 230;

  // Top-up functionality
  topUpAmount: string = '';

  isRewards=false
  isPayment=false
  // Transaction history with sample data

rewards=[
  {
    "amount": "SAR 20",
    "transactionId": "TXN-1001",
    "serviceType": "Flight",
    "emailAddress": "ahmedraisi@gmail.com",
    "date": "14/05/2025",
    "expiryDate": "14/05/2026"
  },
  {
    "amount": "SAR 10",
    "transactionId": "TXN-1002",
    "serviceType": "Hotel",
    "emailAddress": "tariq@gmail.com",
    "date": "12/05/2025",
    "expiryDate": "12/05/2026"
  },
  {
    "amount": "SAR 30",
    "transactionId": "TXN-1003",
    "serviceType": "Cruise",
    "emailAddress": "rami21@gmail.com",
    "date": "02/05/2025",
    "expiryDate": "02/05/2026"
  },
  {
    "amount": "SAR 40",
    "transactionId": "TXN-1004",
    "serviceType": "Train",
    "emailAddress": "linaahmed@gmail.com",
    "date": "22/04/2025",
    "expiryDate": "22/04/2026"
  },
  {
    "amount": "SAR 50",
    "transactionId": "TXN-1005",
    "serviceType": "Insurance",
    "emailAddress": "reem@gmail.com",
    "date": "22/04/2025",
    "expiryDate": "22/04/2026"
  },
  {
    "amount": "SAR 10",
    "transactionId": "TXN-1006",
    "serviceType": "Insurance",
    "emailAddress": "sara@gmail.com",
    "date": "21/04/2025",
    "expiryDate": "21/04/2026"
  },
  {
    "amount": "SAR 20",
    "transactionId": "TXN-1007",
    "serviceType": "Cab",
    "emailAddress": "omar@gmail.com",
    "date": "12/04/2025",
    "expiryDate": "12/04/2026"
  },
  {
    "amount": "SAR 40",
    "transactionId": "TXN-1008",
    "serviceType": "Visa",
    "emailAddress": "ali@gmail.com",
    "date": "02/04/2025",
    "expiryDate": "02/04/2026"
  },
  {
    "amount": "SAR 10",
    "transactionId": "TXN-1009",
    "serviceType": "Holidays",
    "emailAddress": "mayasaleh@gmail.com",
    "date": "01/04/2025",
    "expiryDate": "01/04/2026"
  },
  {
    "amount": "SAR 25",
    "transactionId": "TXN-1010",
    "serviceType": "Car Rental",
    "emailAddress": "yousef@gmail.com",
    "date": "28/03/2025",
    "expiryDate": "28/03/2026"
  },
  {
    "amount": "SAR 35",
    "transactionId": "TXN-1011",
    "serviceType": "Hotel",
    "emailAddress": "layla@gmail.com",
    "date": "24/03/2025",
    "expiryDate": "24/03/2026"
  },
  {
    "amount": "SAR 15",
    "transactionId": "TXN-1012",
    "serviceType": "Cruise",
    "emailAddress": "hassan@gmail.com",
    "date": "20/03/2025",
    "expiryDate": "20/03/2026"
  },
  {
    "amount": "SAR 45",
    "transactionId": "TXN-1013",
    "serviceType": "Insurance",
    "emailAddress": "nour@gmail.com",
    "date": "18/03/2025",
    "expiryDate": "18/03/2026"
  },
  {
    "amount": "SAR 30",
    "transactionId": "TXN-1014",
    "serviceType": "Flight",
    "emailAddress": "salma@gmail.com",
    "date": "15/03/2025",
    "expiryDate": "15/03/2026"
  }
]
rewardsInfo=[
  {key:'amount' ,title:'Amount'},
  {key:'transactionId' ,title:'Transaction Id'},
  {key:'serviceType' ,title:'Service Type'},
  {key:'emailAddress' ,title:'Email Address'},
  {key:'date' ,title:'Date'},
  {key:'expiryDate' ,title:'Expiry Date'},

]




  ;

  constructor() {}


  downloudCVS(){
    if (!this.child) {
      alert('Please open the rewards section first to download the report');
      return;
    }
    var info=this.child.sendData()
    var data=info.data
    var columns=info.columns

    var titles:any[]=[]
    var keys:any[]=[]

    columns.forEach(c=>{
      titles.push(c.title)
      keys.push(c.key)
    })
    const csvHeader = `${titles.join(',')}\n`;
    const csvRows = data.map(d => {
      var rows:any[]=[]
      keys.forEach(k=>{
        rows.push(d[k])
      })
      return rows.join(',')
    }).join('\n');
    const csvData = csvHeader + csvRows;

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'report.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }
  /**
   * Handle wallet top-up
   */
  onTopUpWallet(): void {
    const amount = parseFloat(this.topUpAmount.replace(/[^\d.]/g, ''));

    if (amount && amount > 0) {
      this.date.balance += amount;
      this.topUpAmount = '';

      // Add transaction record
      this.addTransaction({
        type: 'topup',
        amount: amount,
        date: new Date(),
        description: 'Wallet Top-up'
      });

      console.log(`Added ${amount} ${this.date.currency} to wallet. New balance: ${this.date.balance}`);
    } else {
      alert('Please enter a valid amount');
    }
  }

  /**
   * Handle points redemption
   */
  onRedeemPoints(): void {
    if (this.date.points >= 100) {
      const redeemAmount = Math.floor(this.date.points / 100) * 10; // 100 points = 10 SAR
      this.date.points = this.date.points % 100;
      this.date.balance += redeemAmount;

      this.addTransaction({
        type: 'redemption',
        amount: redeemAmount,
        date: new Date(),
        description: 'Points Redemption'
      });

      alert(`Redeemed ${redeemAmount} ${this.date.currency} from points!`);
    } else {
      alert('You need at least 100 points to redeem');
    }
  }

  /**
   * Add a new transaction to history
   */
  private addTransaction(transaction: any): void {
    // this.transactions.unshift(transaction);
  }

  /**
   * Format currency amount
   */
  formatCurrency(amount: number): string {
    return `${this.date.currency} ${amount.toLocaleString()}`;
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
