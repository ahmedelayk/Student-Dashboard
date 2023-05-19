import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private client: HttpClient) {}
  private Base_URL = 'http://localhost:3000/students';
  // private Base_URL = 'https://jsonplaceholder.typicode.com/users';
  // Handling All request methods
  getAllStudents(){
    return this.client.get(this.Base_URL);
  }
  getStudentById(id:any){
    return this.client.get(`${this.Base_URL}/${id}`);
  }
  addStudent(newStudent:any){
    return this.client.post(this.Base_URL, newStudent);
  }
  deleteStudent(id:any){
    return this.client.delete(`${this.Base_URL}/${id}`);
  }
  updateStudent(id: any, name:any, age:any, address:any, email:any, mobile:any){
    return this.client.put(this.Base_URL+"/"+id, {name, age, address, email, mobile});
  }
}
