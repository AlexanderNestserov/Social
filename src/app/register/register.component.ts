import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm!:FormGroup;


  constructor(private formbuilder:FormBuilder, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      fullname:['', Validators.required],
      mobile:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
    })
  }
signUp(){
this.http.post<any>('http://localhost:3000/registration', this.registerForm.value)
.subscribe(res => {
 alert('success');
 this.registerForm.reset();
 this.router.navigate(['login']);
}, err=>{alert('wrong');})
}
}
