import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', loadChildren: ()=>import("./Components/students/students.module").then(m=>m.StudentsModule)},
  {path:'students', loadChildren: ()=>import("./Components/students/students.module").then(m=>m.StudentsModule)},
  {path:'addstudent', loadChildren: ()=>import("./Components/add-student/add-student.module").then(m=>m.AddStudentModule)},
  {path:'students/:id', loadChildren: ()=> import("./Components/student-details/student-details.module").then(m=>m.StudentDetailsModule)},
  {path:'update/:id', loadChildren: ()=>import("./Components/update-student/update-student.module").then(m=>m.UpdateStudentModule)},
  {path:'**', loadChildren: ()=> import("./Components/error/error.module").then(m=>m.ErrorModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
