import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { apiConfiguration } from '../config/api.config';

@Injectable({
    providedIn : 'root'
})
export class AuthenticationService {

    username !: String;
    static token : String = "";

    constructor(private http : HttpClient) { }

    login(username : String, password : String) {
        let requestUrl = apiConfiguration.host + apiConfiguration.authenticationRoute;

        let obj  = {
            username : username,
            password : password
        }

        return this.http.post(requestUrl, obj);
    }

    static isAuthenticated() {
        return AuthenticationService.token != null && AuthenticationService.token != "";
    }
}
