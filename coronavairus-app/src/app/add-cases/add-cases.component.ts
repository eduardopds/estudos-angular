import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder,FormGroup,NgForm,Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-cases',
  templateUrl: './add-cases.component.html',
  styleUrls: ['./add-cases.component.scss']
})


export class AddCasesComponent implements OnInit {

  casesForm: FormGroup;
  id = null
  name: string = '';
  gender: string = '';
  age: number = null;
  address: string = '';
  city: string = '';
  country: string = '';
  status: string = '';
  statusList = ['Positivo', 'Morto', 'Recuperado'];
  genderList = ['Masculino', 'Feminino', 'Prefiro não dizer'];
  isLoadingResults: boolean = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.casesForm = this.formBuilder.group({
      name : ['' ,Validators.required],
      gender : ['', Validators.required],
      age : ['', Validators.required],
      address : ['', Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required],
      status : ['', Validators.required]
    });

  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addCases(this.casesForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/cases-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
