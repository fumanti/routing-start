import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.allowEdit = this.route.snapshot.queryParams['allowEdit'];
    console.log(this.allowEdit);

    this.route.params
      .subscribe((result) => {
        this.server = this.serversService.getServer(+result['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      });

      this.route.queryParams
        .subscribe((result: Params) => {
          this.allowEdit = result['allowEdit'] === '1';
          console.log(result['allowEdit']);
        });
  }

  refresh() {
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
