import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  constructor(public service:MainService, public ro:Router){}
  addStudent(name:any, age:any, address:any, email:any, mobile:any){
    if(this.FormValidation.valid){
      let newStudent = {name, age, address, email, mobile};
      this.service.addStudent(newStudent).subscribe();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Student has been Added',
        showConfirmButton: false,
        timer: 1500
      });
      this.ro.navigateByUrl("/students");
    }else{
      console.log(this.FormValidation);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `can't add, check out data again`,
        footer: '<a href="/students">Back to Home</a>'
      })
    }

  }
  FormValidation = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-z\sA-Z]+$/ig)]),
      age: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(30), Validators.pattern(/^[0-9]{2}$/ig)]),
      address: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]+/ig)]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/ig)])
  })

  get nameValid(){
    return this.FormValidation.controls["name"].valid;
  }
  get ageValid(){
    return this.FormValidation.controls["age"].valid;
  }
  get addressValid(){
    return this.FormValidation.controls["address"].valid;
  }
  get emailValid(){
    return this.FormValidation.controls["email"].valid;
  }
  get mobileValid(){
    return this.FormValidation.controls["mobile"].valid;
  }
  // get AgeValid(){
  //   return this.FormValidation.controls["age"].valid;
  //   console.log("Value: ",this.FormValidation.value);
  //   console.log("Valid: ",this.FormValidation.valid);
  //   console.log("Age Valid: ",this.FormValidation.controls["age"].valid);
  //   console.log("Name Valid: ",this.FormValidation.controls["name"].valid);
  //   console.log("------------------------------")
  // }
}
