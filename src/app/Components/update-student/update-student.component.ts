import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit{
  ID:any;
  student:any;
  addFlag:boolean = false;
  constructor(public route:ActivatedRoute, public service:MainService){
    console.log(route.snapshot.params["id"]);
  }
  // FormValidation:FormGroup = new FormGroup({});
  FormValidation:any;


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
  ngOnInit(): void {
    this.ID = this.route.snapshot.params["id"];
    this.FormValidation = new FormGroup({
      name: new FormControl('', [Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]+$/ig)]),
      age: new FormControl('', [Validators.required, Validators.min(10), Validators.max(30), Validators.pattern(/^[0-9]{2}$/ig)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/ig)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/ig)])
    });

    this.student = this.service.getStudentById(this.ID).subscribe({
      next: (s) => {
        this.student = s;
        console.log(this.FormValidation);
        this.FormValidation.setValue({
          name: this.student.name,
          age: this.student.age,
          address: this.student.address,
          email: this.student.email,
          mobile: this.student.mobile
        });
      },
      error: (err) => { console.log(err); }
    });
  }

  updateStudent(name:any, age:any, address:any, email:any, mobile:any){
    if(this.FormValidation.valid){
      // let newStudent = {name, age, address, phone};
      this.service.updateStudent(this.ID, name, age, address, email, mobile ).subscribe();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Student has been Updated',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
      console.log(this.FormValidation);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `can't update, check out data again`,
        footer: '<a href="/students">Back to Home</a>'
      })
    }
  }
}
