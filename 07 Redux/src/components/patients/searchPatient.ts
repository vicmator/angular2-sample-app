import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-patient',
  template: `
  <div class="well">
    <div class="row">
      <div class="col-xs-12">
        <span class="col-xs-1 glyphicon glyphicon-search"></span>
        <p class="col-xs-9">Search patient</p>
        <span class="collapse-toggle pull-right glyphicon glyphicon-collapse-down" data-toggle="collapse"
          data-target="#search-form">
        </span>
      </div>
      <form id="search-form" class="collapse">
        <div class="col-xs-6 form-group">
          <label for="date">Date</label>
          <input type="date" class="form-control" id="date"/>
        </div>
        <div class="col-xs-6 form-group">
          <label for="time">Time</label>
          <input type="time" class="form-control" id="time"/>
        </div>
        <div class="col-xs-12 form-group">
          <label for="specialty">Specialty</label>
          <select class="form-control">
            <option *ngFor="let s of specialties">{{s}}</option>
          </select>
        </div>
        <div class="col-xs-12 form-group">
          <label for="doctor">Doctor</label>
          <input type="text" class="form-control" id="doctor"/>
        </div>
        <div class="col-xs-offset-10 col-xs-2 form-group">
          <div class="pull-right">
            <button (click)="searchPatient($event)" class="btn btn-primary">Search</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
})
class SearchPatient {
  @Input() specialties: Array<string>;
  @Input() searchPatient: (event: any) => void;
}

export {
  SearchPatient
}
