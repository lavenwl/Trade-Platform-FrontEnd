import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/** 登陆参数对象 */
export class LoginParam {
    name: string;
    password: string;

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
    }
}

@Injectable()
export class PassportService {

    constructor(
        private http: HttpClient
    ) { }
    login(param: LoginParam) {
        return this.http.post('/server/home/login', param);
    }
}
