import { Component, OnInit, ViewChild } from '@angular/core';

import { ComponentBase } from './../shared/bases/component-base';
import { CdEnvironment } from './../shared/models/cdenvironment';
import { EnvironmentService } from './../services/environment.service';

import { MessageService } from './../services/message.service';
import { EnvironmentEditComponent } from './environment-edit.component';

@Component({
    moduleId: module.id,
    selector: 'env',
    styleUrls: [ 'environments.component.css'],
    templateUrl: 'environments-overview.component.html',
    providers: [ EnvironmentService ]
})
export class EnvironmentsOverviewComponent extends ComponentBase<CdEnvironment> implements OnInit {
    @ViewChild(EnvironmentEditComponent)
    private _environmentEdit: EnvironmentEditComponent;
    constructor(private environmentService: EnvironmentService, private messageService: MessageService) {
                    super(environmentService, messageService);
                 }

    ngOnInit() {
        this.Init();
    }

     ShowEditWindow(event: any): void {
        this._environmentEdit.Show();
    }
}