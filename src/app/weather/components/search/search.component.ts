import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @Output() searched = new EventEmitter<string>();

  cityForm: FormGroup;
  city: FormControl;

  constructor() {
    this.city = new FormControl('', Validators.required);
    this.cityForm = new FormGroup({
      city: this.city
    });
  }

  /**
   * Emit the event to the parent and reset the form
   */
  onSubmit() {
    if (this.cityForm.valid) {
      this.searched.next(this.cityForm.value.city);
      this.cityForm.reset();
    }
  }
}
