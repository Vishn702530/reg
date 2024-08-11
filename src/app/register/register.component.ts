import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  currentStep: number = 1; 


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      companyName: ['', Validators.required],
      // Add other form controls here
      input2: [''],
      input3: [''],
      input4: [''],
      input5: [''],
      input6: [''],
      input7: [''],
      input8: [''],
      input9: [''],
      input10: [''],
      input11: [''],
      input12: [''],
      terms: this.fb.array([false, false, false], Validators.requiredTrue) // Track the checkboxes

    });
  }

  onSubmit() {
    if (this.currentStep === 1) {
      this.currentStep = 2; // Move to the next step
    } else {
      // Handle form submission
      console.log(this.registrationForm.value);
    }
  }

  checkTerms(): void {
    this.registrationForm.get('submit')?.updateValueAndValidity();
  }
  
  get isStepOneCompleted(): boolean {
    return this.currentStep === 2; // Check if step 1 is completed
  }
  
  get isFinalStep(): boolean {
    return this.currentStep === 2; // Check if it's the final step
  }
  get canSubmit(): boolean {
    return (this.registrationForm.get('terms') as FormArray).controls.every(control => control.value === true);
  }
  canProceed(): boolean {
    if (this.currentStep === 1) {
      return true; // Enable the button to proceed from step 1 to step 2
    } else if (this.currentStep === 2) {
      return (this.registrationForm.get('terms') as FormArray).controls.every(control => control.value === true);
    }
    return false;
  }

  onCheckboxChange(index: number, event: any): void {
    const termsArray = this.registrationForm.get('terms') as FormArray;
    termsArray.at(index).setValue(event.target.checked);
  }

}
