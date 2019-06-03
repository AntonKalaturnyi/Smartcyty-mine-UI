import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  //storing users
  users: Object;

  constructor(private data: UserService) { }

  ngOnInit() {
    this.data.getAllUsers().subscribe(data => {
        this.users = data;
        console.log(this.users);
    });
  }

}
