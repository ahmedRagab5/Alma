import { Component } from '@angular/core';
import { TableComponent } from "../table/table.component";
import { Wallet2Component } from "./wallet2/wallet2.component";
import { Wallet1Component } from "./wallet1/wallet1.component";

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [TableComponent, Wallet2Component, Wallet1Component],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

}
