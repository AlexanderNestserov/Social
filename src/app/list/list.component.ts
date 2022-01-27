import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { ListModel } from './list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  search = '';

  formValue: FormGroup = new FormGroup({});
  listModelObj: ListModel = new ListModel();
  listData: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      age: ['', [Validators.required,
      Validators.min(18),
      Validators.max(65),
      Validators.pattern(/^[0-9]/)
      ]],
      university: [''],
      yoa: ['', [
        Validators.pattern(/^[0-9]/)
      ]],
      yog: ['', [
        Validators.pattern(/^[0-9]/)
      ]],
      specialization: [''],
    })
    this.getAllList();
  }
  get name() {
    return this.formValue.get('name') as FormControl
  }
  get surname() {
    return this.formValue.get('surname') as FormControl
  }
  get age() {
    return this.formValue.get('age') as FormControl
  }
  get yoa() {
    return this.formValue.get('yoa') as FormControl
  }
  get yog() {
    return this.formValue.get('yog') as FormControl
  }
  clickAddList() {
    this.formValue.reset({
      name: '',
      surname: '',
      age: '',
      university: '',
      yoa: '',
      yog: '',
      specialization: '',
    })
    this.showAdd = true;
    this.showUpdate = false;
  }
  postListDetails() {
    this.listModelObj.name = this.formValue.value.name;
    this.listModelObj.surname = this.formValue.value.surname;
    this.listModelObj.age = +this.formValue.value.age;
    this.listModelObj.university = this.formValue.value.university;
    this.listModelObj.yoa = + this.formValue.value.yoa;
    this.listModelObj.yog = + this.formValue.value.yog;
    this.listModelObj.specialization = this.formValue.value.specialization;

    this.api.postList(this.listModelObj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset({
          name: '',
          surname: '',
          age: '',
          university: '',
          yoa: '',
          yog: '',
          specialization: '',
        });
        this.getAllList();
      }, error => {
        alert("Not success");
      })
  }
  getAllList() {
    this.api.getList()
      .subscribe(res => {
        this.listData = res;
      })
  }
  deleteList(row: any) {
    this.api.deleteList(row.id)
      .subscribe(res => {
        this.getAllList();
      })
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.listModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['surname'].setValue(row.surname);
    this.formValue.controls['age'].setValue(row.age);
    this.formValue.controls['university'].setValue(row.university);
    this.formValue.controls['yoa'].setValue(row.yoa);
    this.formValue.controls['yog'].setValue(row.yog);
    this.formValue.controls['specialization'].setValue(row.specialization);


  }
  updateListDetails() {
    this.listModelObj.name = this.formValue.value.name;
    this.listModelObj.surname = this.formValue.value.surname;
    this.listModelObj.age = +this.formValue.value.age;
    this.listModelObj.university = this.formValue.value.university;
    this.listModelObj.yoa = + this.formValue.value.yoa;
    this.listModelObj.yog = + this.formValue.value.yog;
    this.listModelObj.specialization = this.formValue.value.specialization;
    this.api.updateList(this.listModelObj, this.listModelObj.id)
      .subscribe(res => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset({
          name: '',
          surname: '',
          age: '',
          university: '',
          yoa: '',
          yog: '',
          specialization: '',
        });
        this.getAllList();
      })
  }
}
