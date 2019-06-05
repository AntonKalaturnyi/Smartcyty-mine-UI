import { Component, OnInit, } from '@angular/core';
import { OrganizationListService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  // Need to get all tasks 
  organizations: Object;

  constructor(private data: OrganizationListService) { 
  }

  ngOnInit() {
    this.data.getOrganizations().subscribe(data =>{
      this.organizations = data;
      console.log(this.organizations);
  });
  }

}
