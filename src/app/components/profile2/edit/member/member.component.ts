import { Component, EventEmitter, Input, input, Output, ViewChild } from '@angular/core';
import { EditBasicComponent } from "../basic/edit-basic.component";
import { EditPassportComponent } from "../passport/edit-passport.component";
import { Basic, FamilyMember, Iqama, Passport } from '../../profile2.component';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [EditBasicComponent, EditPassportComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {
  @Input() data!:FamilyMember
  @Output() dataToParent = new EventEmitter<FamilyMember>();
  @Output() cancelEdit = new EventEmitter<void>();
  @ViewChild(EditBasicComponent) basic!: EditBasicComponent;
  @ViewChild(EditPassportComponent) passport!: EditPassportComponent;
  @ViewChild(EditPassportComponent) iqama!: EditPassportComponent;
  isIqama:boolean=false
  // isUpdate=false
  basicData!:Basic
  passportData!:Passport
  iqamaData!:Iqama
  relation!:string


  ngOnInit(){
    if (this.data?.iqama) {
      this.isIqama=true
    }
  }
  toggle(x:number){
  //   if (x==1) {
  //     this.originalDetails.travelAlerts=!this.originalDetails.travelAlerts
  //   }
  //   else if(x==2){
  //     this.originalDetails.allBillingEntities=!this.originalDetails.allBillingEntities
  //   }
  }

  fromBasic(data:Basic){
    this.basicData=data
  }
  resvRelation(data:string){
    this.relation=data
  }
  fromPassport(data:Passport){
    this.passportData=data
  }
  fromIqama(data:Iqama){
    this.iqamaData=data
  }

  updateDetails(){
    this.basic.updateBasicDetails()
    this.basic.updateRelation()
    if (this.isIqama) {
      this.iqama.updatePassportDetails()
    }
    else{
      this.passport.updatePassportDetails()
    }


    console.log('here')
    if (this.basicData&&this.relation) {
      if (this.isIqama && this.iqamaData) {
        const allData:FamilyMember={
          basic:this.basicData,
          iqama:this.iqamaData,
          relationship:this.relation
        }
        this.dataToParent.emit(allData)
      }
      else if (!this.isIqama && this.passportData) {
        const allData:FamilyMember={
          basic:this.basicData,
          passport:this.passportData,
          relationship:this.relation
        }
        this.dataToParent.emit(allData)
        console.log(allData)
      }


    }

  }
  cancelAction(){
    this.cancelEdit.emit();
  }

}
