import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model'
import { Resource } from 'src/app/models/resource.model';

import { ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent } from 'ng-uikit-pro-standard';
import { HospitalData } from 'src/app/models/hospital-data.model';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-hospital-info',
  templateUrl: './hospital-info.component.html',
  styleUrls: ['./hospital-info.component.css']
})
export class HospitalInfoComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild('row', { static: true }) row!: ElementRef;

  elements: HospitalData[] = [];
  headElements : {value : string, viewValue : string}[]= [ 
    {value : 'name', viewValue : 'Hospital Name' }, 
    {value : 'totalIsolationBeds', viewValue : 'Total Isolation Beds'}, 
    {value : 'availaibleIsolationBeds', viewValue : 'Availaible Isolation Beds'}, 
    {value : 'totalOxygenBeds', viewValue : 'Total Oxygen Beds'}, 
    {value : 'availaibleOxygenBeds', viewValue : 'Availaible Oxygen Beds'}, 
    {value : 'totalVentilatorBeds', viewValue : 'Total Ventilators'},
    {value : 'availaibleVentilatorBeds', viewValue : 'Availaible Ventilators'},
    {value : 'lastVerified.timestamp', viewValue : 'Last Verified'}, 
    {value : 'reports', viewValue : 'Report'}
  ];

  searchText: string = '';
  previous!: string;

  selectedCity: City = {value: 'sangamner-0', viewValue: 'Sangamner'};
  selectedResource: Resource = {value : 'bed-0', viewValue: 'Beds'};
  selectedHospitalId: string = '';

  cities: City[] = [
    {value: 'sangamner-0', viewValue: 'Sangamner'}
  ];

  resources : Resource[] = [
    {value : 'bed-0', viewValue: 'Beds'}
  ];

  maxVisibleItems: number = 8;

  constructor(private cdRef: ChangeDetectorRef, private fetchDataService : FetchDataService) {}


  ngOnInit() {
    this.elements = this.fetchDataService.getHospitalInfoProxy(this.selectedCity.value, this.selectedResource.value);
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  emitDataSourceChange() {
    this.mdbTable.dataSourceChange().subscribe((data: any) => {
      console.log(data);
    });
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }

    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }

  onTableRowClick(id: string) {
    this.selectedHospitalId = id;
    console.log(id);
  }

  onScreenClick() {
    this.selectedHospitalId = '';
  }
}
