import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './Components/students/students.component';
import { ErrorComponent } from './Components/error/error.component';
import { StudentDetailsComponent } from './Components/student-details/student-details.component';
import { UpdateStudentComponent } from './Components/update-student/update-student.component';
import { AddStudentComponent } from './Components/add-student/add-student.component';

const routes: Routes = [
  {path:'',component:StudentsComponent},
  {path:'students',component:StudentsComponent},
  {path:'addstudent',component:AddStudentComponent},
  {path:'students/:id',component:StudentDetailsComponent},
  {path:'update/:id',component:UpdateStudentComponent},
  {path:'**',component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
