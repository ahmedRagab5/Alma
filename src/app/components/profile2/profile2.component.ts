import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBasicComponent } from './edit/basic/edit-basic.component';
import { EditPassportComponent } from './edit/passport/edit-passport.component';
import { EditPreferencesComponent } from './edit/preferences/edit-preferences.component';
import { PasswordComponent } from "./edit/password/password.component";
import { MemberComponent } from "./edit/member/member.component";
import { FormControl } from '@angular/forms';

export interface Passport{
  title?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  passportNumber: string;
  issuingCountry: string;
  dateOfIssue: string;
  dateOfExpiration: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  emailAddress: string;
  countryCode: string;
  mobileNumber: string;
  confirmation: boolean;
}

export interface Iqama {
  title?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  passportNumber: string;
  issuingCountry: string;
  dateOfIssue: string;
  dateOfExpiration: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  emailAddress: string;
  countryCode: string;
  mobileNumber: string;
  confirmation: boolean;
}

export interface FamilyMember {
  basic: Basic;
  passport?:Passport;
  iqama?:Iqama;
  relationship: string;
}

interface Preferences {
  seatPreferences: string;
  meal: string;
  frequentFlyerNumber: string;
  frequentFlyerAirlines: string;
  travelAlerts: boolean;
  allBillingEntities: boolean;
}
export interface Basic{
  completionPercentage: number;
  gender: string;
  dateOfBirth: string;
  role: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
}
export interface secrite{
  email: string;
  password:string
  mobileNumber: string;
}
export interface ProfileData {
  logoUrl?: string;
  logoFile:File,
  basic:Basic;
  passports: Passport[];
  iqamas: Iqama[];
  preferences: Preferences;
  secrite:secrite;
  familyMembers: FamilyMember[];
}


@Component({
  selector: 'app-profile2',
  standalone: true,
  imports: [CommonModule, EditBasicComponent, EditPassportComponent, EditPreferencesComponent, PasswordComponent, MemberComponent],
  templateUrl: './profile2.component.html',
  styleUrl: './profile2.component.css'
})
export class Profile2Component implements OnInit {
  @Input() companyDetails: any = {};
  @Output() dataToParent = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput!: ElementRef;


  logoPreview!: string;
  selectedLogoFile!: File;
  isEditBasicMode = false;
  isEditPassportMode = false;
  isEditPreferencesMode = false;
  isEditIqamaMode = false;
  isEditPassMode = false;
  isEditMemberMode = false;
  isEditMode = false;
  editingPassportIndex = -1;
  editingIqamaIndex = -1;
  editingMemberIndex = -1;

  inputphoto=new FormControl('')

  profileData: ProfileData = {
    logoUrl: 'assets/download.jpeg',
    logoFile: new File([], ''),
    basic:{
      completionPercentage: 33,
      gender: 'Male',
      dateOfBirth:'02/10/1997' ,
      role: 'Admin',
      title: 'Mr.',
      firstName: 'Mohamed',
      middleName: 'Alaa',
      lastName: 'Shaheen',
    },
    passports: [
      {
        passportNumber: 'P12345678',
        issuingCountry: 'Saudi Arabia',
        firstName: 'Mohamed',
        middleName: 'Alaa',
        lastName: 'Shaheen',
        dateOfIssue: '12-08-2020',
        dateOfExpiration: '12-08-2025',
        dateOfBirth: '02-10-1997',
        nationality: 'Saudi',
        countryOfResidence: 'Saudi Arabia',
        emailAddress: 'mohamed.s@almatravel.co',
        countryCode: '+966',
        mobileNumber: '0508723461',
        confirmation: true
      },
      {
        passportNumber: 'P123963152',
        issuingCountry: 'Saudi Arabia',
        firstName: 'Mohamed',
        middleName: 'Alaa',
        lastName: 'Shaheen',
        dateOfIssue: '12-08-2020',
        dateOfExpiration: '12-08-2025',
        dateOfBirth: '02-10-1997',
        nationality: 'Saudi',
        countryOfResidence: 'USA',
        emailAddress: 'mohamed.s@almatravel.co',
        countryCode: '+971',
        mobileNumber: '0508723461',
        confirmation: true
      }
    ],
    iqamas: [
      {
        passportNumber: 'P12345678',
        issuingCountry: 'Saudi Arabia',
        firstName: 'Mohamed',
        middleName: 'Alaa',
        lastName: 'Shaheen',
        dateOfIssue: '12-08-2020',
        dateOfExpiration: '12-08-2025',
        dateOfBirth: '02-10-1997',
        nationality: 'Saudi',
        countryOfResidence: 'Saudi Arabia',
        emailAddress: 'mohamed.s@almatravel.co',
        countryCode: '+966',
        mobileNumber: '0508723461',
        confirmation: true
      },
      {
        passportNumber: 'P123963152',
        issuingCountry: 'Saudi Arabia',
        firstName: 'Mohamed',
        middleName: 'Alaa',
        lastName: 'Shaheen',
        dateOfIssue: '12-08-2020',
        dateOfExpiration: '12-08-2025',
        dateOfBirth: '02-10-1997',
        nationality: 'Saudi',
        countryOfResidence: 'USA',
        emailAddress: 'mohamed.s@almatravel.co',
        countryCode: '+971',
        mobileNumber: '0508723461',
        confirmation: true
      }
    ],
    preferences: {
      seatPreferences: 'window',
      meal: 'vegan',
      frequentFlyerNumber: '345',
      frequentFlyerAirlines: 'flynas',
      travelAlerts: true,
      allBillingEntities: true
    },
    secrite:{
      email: 'mohamed.s@almatravel.co',
      password:'12345678',
      mobileNumber: '+966-0508723461',
    },
    familyMembers: [
      {
        basic:{
          completionPercentage: 33,
          gender: 'Male',
          dateOfBirth:'02/10/1997' ,
          role: 'Admin',
          title: 'Mr.',
          firstName: 'Mohamed',
          middleName: 'Alaa',
          lastName: 'Shaheen',
        },
        iqama:{
          passportNumber: 'P12345678',
          issuingCountry: 'Saudi Arabia',
          firstName: 'Mohamed',
          middleName: 'Alaa',
          lastName: 'Shaheen',
          dateOfIssue: '12-08-2020',
          dateOfExpiration: '12-08-2025',
          dateOfBirth: '02-10-1997',
          nationality: 'Saudi',
          countryOfResidence: 'Saudi Arabia',
          emailAddress: 'mohamed.s@almatravel.co',
          countryCode: '+966',
          mobileNumber: '0508723461',
          confirmation: true
        },
        relationship: 'Sister'
      },
      {
        basic:{
          completionPercentage: 33,
          gender: 'Male',
          dateOfBirth:'02/10/1997' ,
          role: 'Admin',
          title: 'Mr.',
          firstName: 'Mohamed',
          middleName: 'Alaa',
          lastName: 'Shaheen',
        },
        passport:{
          passportNumber: 'P12345678',
          issuingCountry: 'Saudi Arabia',
          firstName: 'Mohamed',
          middleName: 'Alaa',
          lastName: 'Shaheen',
          dateOfIssue: '12-08-2020',
          dateOfExpiration: '12-08-2025',
          dateOfBirth: '02-10-1997',
          nationality: 'Saudi',
          countryOfResidence: 'Saudi Arabia',
          emailAddress: 'mohamed.s@almatravel.co',
          countryCode: '+966',
          mobileNumber: '0508723461',
          confirmation: true
        },
        relationship: 'Friend'
      }
    ]
  };

  constructor() {}

  ngOnInit() {
    // Initialize with any passed data
    if (this.companyDetails) {
      this.profileData = { ...this.profileData, ...this.companyDetails };
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  onLogoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      this.selectedLogoFile = file;

      // Update form controls
      this.profileData.logoFile=file
      // this.profileData.patchValue({
      //   logoFile: file
      // });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoPreview = e.target.result;
        // Update logoUrl in form
        // this.profileForm.patchValue({
        //   logoUrl: e.target.result
        // });
        this.profileData.logoUrl=e.target.result

      };
      reader.readAsDataURL(file);
    }
  }

  formatDate(date: string | Date): string {
    if (!date) return '';

    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    return `${dd}-${mm}-${yyyy}`;
  }
  // Profile picture methods
  editProfilePicture() {
    console.log('Edit profile picture clicked');
    // Implement profile picture editing logic
  }

  // Section editing methods
  editSection(section: string) {
    console.log(`Edit ${section} section clicked`);
    this.isEditMode=true
    if (section === 'basic') {
      this.isEditBasicMode = true;
    } else if (section === 'preferences') {
      this.isEditPreferencesMode = true;
    }else if (section === 'pass') {
      this.isEditPassMode = true;
    }else if (section === 'member') {
      this.isEditMemberMode = true;
    }
    window.scrollTo(0, 0);
    // Implement other section editing logic
  }

  // Edit basic details methods
  onBasicDetailsUpdated(updatedDetails: any) {
    this.profileData.basic = {  ...updatedDetails };
    console.log(this.profileData.basic)
    this.isEditBasicMode = false;
    this.isEditMode=false
    window.scrollTo(0, 0);
    // this.updateCompletionPercentage();
  }

  onCancelEdit() {
    this.close()
  }

  // Logout method
  logout() {
    console.log('Logout clicked');
    // Implement logout logic
  }

  // Passport methods
  deletePassport(index: number) {
    this.profileData.passports.splice(index, 1);
    this.updateCompletionPercentage();
  }
  deleteIqama(index: number) {
    this.profileData.iqamas.splice(index, 1);
    this.updateCompletionPercentage();
  }

  editPassport(index: number) {
    this.editingPassportIndex = index;
    this.isEditPassportMode = true;
    this.isEditMode=true
    window.scrollTo(0, 0);
  }
  editIqama(index: number) {
    this.editingIqamaIndex = index;
    this.isEditIqamaMode = true;
    this.isEditMode=true
    window.scrollTo(0, 0);
  }

  onPassportDetailsUpdated(updatedDetails: any) {
    if (this.editingPassportIndex >= 0) {
      this.profileData.passports[this.editingPassportIndex] = { ...this.profileData.passports[this.editingPassportIndex], ...updatedDetails };
    }
    this.isEditPassportMode = false;
    this.isEditMode=false
    this.editingPassportIndex = -1;
    window.scrollTo(0, 0);
    this.updateCompletionPercentage();
  }
  onIqamaDetailsUpdated(updatedDetails: any) {
    if (this.editingIqamaIndex >= 0) {
      this.profileData.iqamas[this.editingIqamaIndex] = { ...this.profileData.iqamas[this.editingIqamaIndex], ...updatedDetails };
    }
    this.isEditIqamaMode = false;
    this.isEditMode=false
    this.editingIqamaIndex = -1;
    window.scrollTo(0, 0);
    this.updateCompletionPercentage();
  }

  onCancelEditPassport() {
    this.isEditPassportMode = false;
    this.isEditMode = false;
    this.editingPassportIndex = -1;
  }

  getDefaultPassportDetails() {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      passportNumber: '',
      issuingCountry: '',
      dateOfIssue: '',
      dateOfExpiration: '',
      dateOfBirth: '',
      nationality: '',
      countryOfResidence: '',
      emailAddress: '',
      countryCode: '+966',
      mobileNumber: '',
      confirmation: false
    };
  }

  getPassportDetailsForEdit(): any {
    if (this.editingPassportIndex >= 0) {
      return this.profileData.passports[this.editingPassportIndex];
    }
    //   return {
    //     firstName: passport.firstName || '',
    //     middleName: passport.middleName || '',
    //     lastName: passport.lastName || '',
    //     passportNumber: passport.passportNumber || passport.number || '',
    //     issuingCountry: passport.issuingCountry || passport.country || '',
    //     dateOfIssue: passport.dateOfIssue || '',
    //     dateOfExpiration: passport.dateOfExpiration || passport.expiryDate || '',
    //     dateOfBirth: passport.dateOfBirth || '',
    //     nationality: passport.nationality || '',
    //     countryOfResidence: passport.countryOfResidence || '',
    //     emailAddress: passport.emailAddress || '',
    //     countryCode: passport.countryCode || '+966',
    //     mobileNumber: passport.mobileNumber || '',
    //     confirmation: passport.confirmation || false
    //   };
    // }
    return this.getDefaultPassportDetails();
  }

  // Iqama methods


  // Family member methods
  // addFamilyMember() {
  //   console.log('Add family member clicked');
  //   this.isEditMemberMode=true
  //   this.isEditMode=true
  //   // Implement add family member logic
  // }

  deleteFamilyMember(index: number) {
    this.profileData.familyMembers.splice(index, 1);
    this.updateCompletionPercentage();
  }

  editFamilyMember(index: number) {
    this.editingMemberIndex = index;
    this.isEditMemberMode = true;
    this.isEditMode=true
    window.scrollTo(0, 0);
  }
  // editFamilyMember(index: number) {
  //   console.log(`Edit family member ${index} clicked`);

  //   // Implement family member editing logic
  // }
  addFamilyMember(data:FamilyMember){
    if(this.editingMemberIndex>-1){
      this.profileData.familyMembers[this.editingMemberIndex]=data
      this.editingMemberIndex=-1
    }
    else{
      this.profileData.familyMembers.push(data)
      console.log('allData'+ data)

    }
    this.isEditMemberMode=false
      this.isEditMode=false
      window.scrollTo(0, 0);
  }

  // Edit preferences methods
  onPreferencesUpdated(updatedPreferences: any) {
    this.profileData.preferences = { ...updatedPreferences };
    console.log('Updated preferences:', this.profileData.preferences);
    this.isEditPreferencesMode = false;
    this.isEditMode = false;
    window.scrollTo(0, 0);
  }

  onCancelEditPreferences() {
    this.isEditPreferencesMode = false;
    this.isEditMode = false;
  }

  onChangePass(newPass:string){
    this.profileData.secrite.password=newPass
    this.isEditPassMode = false;
    this.isEditMode = false;
  }

  close(){
    this.isEditBasicMode = false;
    this.isEditPassportMode=false
    this.isEditIqamaMode=false
    this.isEditMemberMode=false
    this.isEditPassMode=false
    this.isEditPreferencesMode=false
    this.isEditMode = false;
    this.editingIqamaIndex=-1
    this.editingMemberIndex=-1
    this.editingPassportIndex=-1
  }

  // Helper method to update completion percentage
  private updateCompletionPercentage() {
    // Calculate completion percentage based on filled fields
    let completedFields = 0;
    let totalFields = 0;

    // Basic details (4 fields)
    totalFields += 4;
    // if (this.profileData.basic.name) completedFields++;
    if (this.profileData.basic.gender) completedFields++;
    if (this.profileData.basic.dateOfBirth) completedFields++;
    if (this.profileData.basic.role) completedFields++;

    // Login details (2 fields - excluding password)
    totalFields += 2;
    if (this.profileData.secrite.email) completedFields++;
    if (this.profileData.secrite.mobileNumber) completedFields++;

    // Preferences (4 fields)
    totalFields += 4;
    if (this.profileData.preferences.seatPreferences) completedFields++;
    if (this.profileData.preferences.meal) completedFields++;
    if (this.profileData.preferences.frequentFlyerAirlines) completedFields++;
    if (this.profileData.preferences.frequentFlyerNumber) completedFields++;

    // Passports and Iqamas (count as bonus)
    if (this.profileData.passports.length > 0) completedFields += 2;
    if (this.profileData.iqamas.length > 0) completedFields += 2;

    // Family members (count as bonus)
    if (this.profileData.familyMembers.length > 0) completedFields += 2;

    this.profileData.basic.completionPercentage = Math.round((completedFields / totalFields) * 100);
  }
}
