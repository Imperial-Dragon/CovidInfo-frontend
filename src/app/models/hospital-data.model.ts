export interface HospitalData {
    id : string;
    name : string;
    totalIsolationBeds : number;
    availaibleIsolationBeds : number;
    totalOxygenBeds : number;
    availaibleOxygenBeds : number;
    totalVentilatorBeds : number;
    availaibleVentilatorBeds : number;
    lastVerified : {
        timestamp : Date,
        verifiedBy : string
    };
    doctorName : string;
    address : string;
    contactNo : string;
    miscellaneous : string;
    noOfReports : number;
}