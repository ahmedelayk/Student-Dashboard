import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/Services/main.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit{
  ID:any;
  student:any;
  constructor(public route:ActivatedRoute, public service:MainService, public ro:Router){
    // console.log(route.snapshot.params["id"]);
  }
  ngOnInit(): void {
    this.ID = this.route.snapshot.params["id"];
    this.service.getStudentById(this.ID).subscribe({
      next:(s)=>{
        console.log(s);
        this.student = s;
      },
      error: (err)=> {console.log(err)}
    })
  }
  updateStudent(){

  }
  deleteStudent(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteStudent(id).subscribe();
        this.ro.navigateByUrl("/students")
        Swal.fire(
          'Deleted!',
          'Student has been deleted.',
          'success'
        )
      }
    })
  }

}
