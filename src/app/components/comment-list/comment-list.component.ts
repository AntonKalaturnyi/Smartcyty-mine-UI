import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../services/comment.service';
import {TaskService} from '../../services/task.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Comment} from '../../model/Comment';
import {User} from "../../model/User";
import {Task} from "../../model/Task";
import {DialogService} from "../../services/dialog.service";
import {NotificationService} from "../../services/notification.service";
import {UserVerificationService} from "../../services/user-verification.service";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})

export class CommentListComponent implements OnInit {

  comments: Comment[] = [];
  allComments: Comment[] = [];
  task:Task = null;
  createCommentForm:FormGroup;
  user:User;
  isSuccesfullMessage: boolean;
  isValidationMessage:boolean;
  searchText:string;
  isMoreView:boolean;

  constructor(private commentService: CommentService, private userService: UserService, private formBuilder: FormBuilder,
              private taskService: TaskService, private userVerificationService:UserVerificationService,
              private actRouter: ActivatedRoute, private router: Router,private dialogService: DialogService, private notificationService : NotificationService) {
    this.createCommentForm = this.formBuilder.group({
      description: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.taskService.findTaskById(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe((data:Task) => {
        this.task = data;
      }, (error) =>
          this.notificationService.showErrorHTMLMessage(error.error.messasge,"Error")
      );

    this.commentService.findCommentByTaskId(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe((data:Comment[]) => {
        console.log(data);
        this.allComments = data;
        this.allComments.map(t => {
          this.userService.getUserbyId(t.userId).subscribe((date:User) =>{
            t.createName = date.surname + " " + date.name;
            return t;
          });
        });
        this.comments = data.slice(0,10);
        this.userService.getAuthenticatedUser().subscribe((date:User) => {
          this.user = date;
          let count = 0;
          this.allComments.forEach(v => {
            if (v.userId !== this.user.id && !v.userSeen.some(t => t == this.user.id)) count = count + 1;
          });
          if (count !== 0 && date)
            this.notificationService.showInfoWithTimeout("You have " + count + " unread comments", "Info", 6500);
        },
          (error) => this.notificationService.showErrorHTMLMessage(error.error.message,"Error"));
      }, (error) =>
        this.notificationService.showErrorHTMLMessage(error.error.message,"Error")
      );

    this.createCommentForm = this.formBuilder.group({
      description: ''
    });
  }



  get description() {
    return this.createCommentForm.get('description');
  }
  handleEdit(comment:Comment) {
    this.router.navigateByUrl('/home/comments/edit/' + comment.id);
  }

  handleDelete(comment:Comment) {
    this.dialogService.openConfirmDialog('Are you sure to delete this comment?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.commentService.deleteComment(comment).subscribe(date => {
          this.allComments = this.allComments.filter(item => item.id !== comment.id);
          this.comments = this.allComments.slice(0,10);
          if(this.comments.length > 10) this.isMoreView = false;
          console.log(date);
          this.notificationService.showSuccessWithTimeout("Comment has been successfully deleted!","Success",3200);
        }, (error) =>
        {
            this.notificationService.showErrorHTMLMessage(error.error.message,"Error");
        }
        );
      }
    });

  }

  handleCreate(comment:Comment) {
    if(comment.description !== '' ) {
      comment.userId = this.user.id;
      comment.taskId = this.task.id;
      this.commentService.createComment(comment).subscribe
      ((date: Comment) => {
          this.isSuccesfullMessage = true;
          this.isValidationMessage = false;
          this.createCommentForm.controls['description'].setValue('');
          console.log(comment);
          this.notificationService.showSuccessWithTimeout("Comment has been successfully created!","Success",3200);
          this.commentService.findCommentById(date.id).subscribe((result: Comment) => {
            result.createName = this.user.surname + " " + this.user.name;
            this.comments.unshift(result);
            this.comments = this.comments.slice(0,10);
            this.allComments.unshift(result);
          }, (error) =>
            this.notificationService.showErrorHTMLMessage(error.error.message,"Error")
          );
        }
      , (error) =>
          this.notificationService.showErrorHTMLMessage(error.error.message,"Error")
      );
    }
    else {
      this.isValidationMessage = true;
      this.notificationService.showErrorWithTimeout("You do not create the comment with the empty description!!!","Error",4200);
    }
  }


  viewMore(){
    this.comments = this.allComments.slice(0,this.comments.length+10);
  }

  messageSuccsesfulClose(){
    this.isSuccesfullMessage= false;
  }


  checkOnOwner(comment:Comment):boolean {
    if(this.user) {
      return comment.userId === this.user.id;
    }
    return false;
  }

  goBackToTask(){
    this.router.navigateByUrl('/home/organizations/');
  }

  sortNew(){
    this.allComments.sort((a, b) => {
      var date = new Date(a.createdDate);
      var date2 = new Date(b.createdDate);

      if( date.getTime() < date2.getTime()){
      return 1;
      }
      return -1;
    })
    this.comments = this.allComments.slice(0,10);
    this.notificationService.showInfoWithTimeout("The comment list was sorted by date, first new then old","Info",4200);
  }

  sortOld(){
    this.allComments.sort((a, b) => {
      var date = new Date(a.createdDate);
      var date2 = new Date(b.createdDate);

      if( date.getTime() > date2.getTime()){
        return 1;
      }
      return -1;
    })
    this.comments = this.allComments.slice(0,10);
    this.notificationService.showInfoWithTimeout("The comment list was sorted by date, first old then new","Info",4200);

  }

  search(){
      this.comments = this.allComments.filter(value =>
      {
        if(value.createName) {
          return value.createName.indexOf(this.searchText) > -1
        }
        return false;
      }
      );
      if(this.searchText !== ''){
        this.isMoreView = true;
      }
      else{
        this.isMoreView = false;
        if(this.comments.length > 10){
          this.comments = this.comments.slice(0,10);
        }
      }
  }
  messageValidationClose(){
    this.isValidationMessage = false;
  }

  checkOnSeen(comment:Comment):boolean{
    if(this.user) {
      return !(comment.userSeen.some(t => t === this.user.id));
    }
    return false;
  }

  addToSeen(comment:Comment){
    if(this.user) {
      this.commentService.addUserToCommentSeen(comment.id,this.user.id).subscribe( (res:boolean) =>{
        if(res){
          comment.userSeen.push(this.user.id);
          this.notificationService.showSuccessWithTimeout("You marked this comment as read!","Succses",4500);
        }
      });
    }
  }

  viewAll(){
    this.comments = this.allComments.slice(0,10);
    this.isMoreView = false;
    this.notificationService.showInfoWithTimeout("The comment list was filter, you see all comment","Info",2400);

  }

  viewNew(){
    if(this.user) {
      this.comments = this.allComments.filter(t => this.checkOnSeen(t) && !this.checkOnOwner(t));
      this.isMoreView = true;
      this.notificationService.showInfoWithTimeout("The comment list was filter, you see only new comment","Info",2400);

    }
  }

}


