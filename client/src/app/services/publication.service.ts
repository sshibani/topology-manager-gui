import { Injectable, EventEmitter, Output } from '@angular/core';
import { Headers, Response, Http } from '@angular/http';
import { CommonConst } from './../shared/constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';

import { Publication } from './../shared/models/publication';
import { MessageService } from './message.service';

@Injectable()
export class PublicationService {
    private _environmentUrl;
    private _headers;
    private _http: Http;
    private _messageService: MessageService;

    private _observable: Observable<Publication[]>;
    constructor(http: Http) {
        this._http = http;
        this._environmentUrl = "assets/data/Publications";
        this._headers = new Headers();
        // this._headers.append('Authorization', 'Basic ' + btoa('administrator:Tr1v1d3nt'));
        this._headers.append('Content-Type', 'application/json');
    }


    public GetAll(): Observable<Publication[]> {
        if (this._observable) {
            return this._observable;
        } else {
            this._observable = this._http.get(this._environmentUrl, { headers: this._headers })
                                            .map(this.extractData)
                                            .publishReplay(50)
                                            .refCount();
            return this._observable;
        }

    }
    public Get(id: string): Observable<Publication> {
         return this.GetAll()
                    .map(env => env.find(e => e.Id === id));
    }

    extractData(res: Response) {
        console.warn(res.json());
        return res.json() as Publication[];
        //return this._cacheResults;
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        //this._messageService.SendMessage("error", error.message, 5000);
        return Promise.reject(error.message || error);
    }
}