import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HospitalData } from 'src/app/models/hospital-data.model';
import { apiConfiguration } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  constructor(private http: HttpClient) { }

  getHospitalInfo(cityId : string, resourceId : string) {
    let requestUrl = apiConfiguration.host + apiConfiguration.getHospitalDataRoute;
    return this.http.get(requestUrl, {
      params : {
        cityId : cityId,
        resourceId : resourceId
      }
    })
  }

  getHospitalInfoProxy(cityId : string, resourceId : string) {
    let elements : HospitalData[] = [];
    for (let i = 1; i <= 5; i++) {
      elements.push({
        id : 'h-' + i.toString(),
        name : 'Tambe Hospital',
        totalIsolationBeds : 40,
        availaibleIsolationBeds : 20,
        totalOxygenBeds : 25,
        availaibleOxygenBeds : 15,
        totalVentilatorBeds : 10,
        availaibleVentilatorBeds : 3,
        lastVerified : {
          timestamp : new Date(),
          verifiedBy : 'Hospital'
        },
        doctorName : 'Dr. ABC XYZ',
        address : 'Devacha Mala, Sangamner, 422605',
        contactNo : '7845639812',
        miscellaneous : 'None',
        noOfReports : Math.random()
      });
    }

    return elements;
  }
}
