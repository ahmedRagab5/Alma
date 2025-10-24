import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  // Payment method selection
  selectedMethod: string = 'cards';

  // Card type selection
  selectedCardType: string = 'personal';

  // Card details form
  cardDetails = {
    proxyName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };

  constructor() {}

  /**
   * Select payment method
   */
  selectMethod(method: string): void {
    this.selectedMethod = method;
  }

  /**
   * Select card type
   */
  selectCardType(type: string): void {
    this.selectedCardType = type;
  }

  /**
   * Process payment
   */
  processPayment(): void {
    if (this.validateForm()) {
      // Simulate payment processing
      console.log('Processing payment...', {
        method: this.selectedMethod,
        cardType: this.selectedCardType,
        details: this.cardDetails
      });

      // Here you would typically:
      // 1. Validate card details
      // 2. Process payment through payment gateway
      // 3. Update wallet balance
      // 4. Redirect to success page or show confirmation

      alert('Payment processed successfully!');
      this.resetForm();
    }
  }

  /**
   * Cancel payment
   */
  cancelPayment(): void {
    if (confirm('Are you sure you want to cancel the payment?')) {
      this.resetForm();
      // Navigate back to previous page or close modal
      console.log('Payment cancelled');
    }
  }

  /**
   * Validate form data
   */
  private validateForm(): boolean {
    const required = ['proxyName', 'cardNumber', 'expiryDate', 'cvv'];

    for (const field of required) {
      if (!this.cardDetails[field as keyof typeof this.cardDetails]?.trim()) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Validate card number (basic validation)
    const cardNumber = this.cardDetails.cardNumber.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      alert('Please enter a valid card number');
      return false;
    }

    // Validate CVV
    if (this.cardDetails.cvv.length < 3 || this.cardDetails.cvv.length > 4) {
      alert('Please enter a valid CVV');
      return false;
    }

    // Validate expiry date
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!expiryRegex.test(this.cardDetails.expiryDate)) {
      alert('Please enter expiry date in MM/YYYY format');
      return false;
    }

    return true;
  }

  /**
   * Reset form
   */
  private resetForm(): void {
    this.cardDetails = {
      proxyName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    };
  }

  /**
   * Format card number with spaces
   */
  onCardNumberChange(): void {
    let value = this.cardDetails.cardNumber.replace(/\s/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    this.cardDetails.cardNumber = value;
  }

  /**
   * Format expiry date
   */
  onExpiryDateChange(): void {
    let value = this.cardDetails.expiryDate.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 6);
    }
    this.cardDetails.expiryDate = value;
  }

  /**
   * Format CVV (numbers only)
   */
  onCvvChange(): void {
    this.cardDetails.cvv = this.cardDetails.cvv.replace(/\D/g, '');
  }
}
