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
  headElements = ['Hospital Name', 'Total Isolation Beds', 'Availaible Isolation Beds', 'Total Oxygen Beds', 
  'Availaible Oxygen Beds', 'Total Ventilators', 'Availaible Ventilators', 'Last Verified', 'Report'];

  searchText: string = '';
  previous!: string;

  selectedCity: string = '';
  selectedResource: string = '';
  selectedHospitalId: string = '';

  cities: City[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  resources : Resource[] = [
    {value : 'bed-0', viewValue: 'Beds'}
  ];

  maxVisibleItems: number = 8;

  constructor(private cdRef: ChangeDetectorRef, private fetchDataService : FetchDataService) {}


  ngOnInit() {
    this.elements = this.fetchDataService.getHospitalInfoProxy(this.selectedCity, this.selectedResource);
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  addNewRow() {
    this.mdbTable.addRow({
      id: this.elements.length.toString(),
      first: 'Wpis ' + this.elements.length,
      last: 'Last ' + this.elements.length,
      handle: 'Handle ' + this.elements.length
    });
    this.emitDataSourceChange();
  }

  addNewRowAfter() {
    this.mdbTable.addRowAfter(1, {id: '2', first: 'Nowy', last: 'Row', handle: 'Kopytkowy'});
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
  }

  removeLastRow() {
    this.mdbTable.removeLastRow();
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
  }

  removeRow() {
    this.mdbTable.removeRow(1);
    this.mdbTable.getDataSource().forEach((el: any, index: any) => {
      el.id = (index + 1).toString();
    });
    this.emitDataSourceChange();
    this.mdbTable.rowRemoved().subscribe((data: any) => {
      console.log(data);
    });
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
