import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../services/comment.service';
import {TaskService} from '../../services/task.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Comment} from '../../model/Comment';
import {User} from "../../model/User";
import {DialogService} from "../../services/dialog.service";
import {NotificationService} from "../../services/notification.service";
import {UserVerificationService} from "../../services/user-verification.service";
import {WebSocketService} from "../../services/webSocket.service";
import {CommentNotification} from "../../model/CommentNotification";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})

export class CommentListComponent implements OnInit {

  comments: Comment[] = [];
  allComments: Comment[] = [];
  taskId:number;
  createCommentForm:FormGroup;
  user:User;
  isSuccesfullMessage: boolean;
  isValidationMessage:boolean;
  inputSearch:string;
  isLoading:boolean =true;
  itemsPerPage: number = 7;
  currentPage: number = 1;

  constructor(private commentService: CommentService, private userService: UserService, private formBuilder: FormBuilder,
              private taskService: TaskService, private userVerificationService:UserVerificationService,
              private actRouter: ActivatedRoute,private webSocketService:WebSocketService,
              private router: Router,private dialogService: DialogService,
              private notificationService : NotificationService) {
    this.createCommentForm = this.formBuilder.group({
      description: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    this.taskId = Number(this.actRouter.snapshot.paramMap.get('id'));
    this.commentService.findCommentByTaskId(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe((data:Comment[]) => {
          this.allComments = data;
          this.allComments.map(t => {
            this.userService.getUserbyId(t.userId).subscribe((date:User) =>{
              t.userName = date.surname + " " + date.name;
              return t;
            });
          });
          this.comments = this.allComments;
        this.userService.getAuthenticatedUser().subscribe((result:User) => {
          this.user = result;
          this.isLoading = false;
          let count = 0;
          this.allComments.forEach(v => {
            if (v.userId !== this.user.id && !v.userSeen.some(t => t === this.user.id)) count++;
          });
          if (count !== 0)
            this.notificationService.showInfoWithTimeout("You have " + count + " unread comments", "Info", 6500);
        },
          (error) => this.notificationService.showErrorHTMLMessage(error.error.message,"Error"));
      }, (error) =>
        this.notificationService.showErrorHTMLMessage(error.error.message,"Error")
      );
    this.createCommentForm = this.formBuilder.group({
      description: ''
    });

    this.webSocketService.addComment((comment:CommentNotification) =>{
      this.userService.getAuthenticatedUser().subscribe((user: User) => {
        if (comment.userId !== user.id) {
          this.commentService.findCommentById(comment.id).subscribe(
            date => {
              this.allComments.unshift(date);
            }
          );
        }
      });
    });

  }

  get description() {
    return this.createCommentForm.get('description');
  }

  clickOnEditComment(comment: Comment) {
    this.router.navigateByUrl('/home/comments/edit/' + comment.id);
  }

  clickOnDeleteComment(comment: Comment) {
    this.dialogService.openConfirmDialog('Are you sure to delete this comment?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.commentService.deleteComment(comment).subscribe(date => {
          this.allComments = this.allComments.filter(item => item.id !== comment.id);
          this.comments = this.allComments;
          console.log(date);
          this.notificationService.showSuccessWithTimeout("Comment has been successfully deleted!","Success",3200);
        }, error =>
        {
            this.notificationService.showErrorHTMLMessage(error.error.message,"Error");
        }
        );
      }
    });

  }

  clickOnCreateComment(comment: Comment) {
    if(
      comment.description !== '' ) {
      comment.userId = this.user.id;
      comment.taskId = this.taskId;
      this.commentService.createComment(comment).subscribe
      ((date: Comment) => {
          this.isSuccesfullMessage = true;
          this.isValidationMessage = false;
          this.createCommentForm.controls['description'].setValue('');
          console.log(comment);
          this.notificationService.showSuccessWithTimeout('Comment has been successfully created!', 'Success', 3200);
          this.commentService.findCommentById(date.id).subscribe((result: Comment) => {
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
      this.isSuccesfullMessage = false;
      this.isValidationMessage = true;
      this.notificationService.showErrorWithTimeout("You do not create the comment with the empty description!","Error",4200);
    }
  }

  checkOnOwner(comment: Comment): boolean {
    return comment.userId === this.user.id;
  }


  sortNew() {
    this.comments.sort((a, b) => {
      var date = new Date(a.createdDate);
      var date2 = new Date(b.createdDate);

      if (date.getTime() < date2.getTime()) {
        return 1;
      }
      return -1;
    });
  }

  sortOld(){
    this.comments.sort((a, b) => {
      var date = new Date(a.createdDate);
      var date2 = new Date(b.createdDate);

      if( date.getTime() > date2.getTime()){
        return 1;
      }
      return -1;
    });
  }

  search(){
      this.comments = this.allComments.filter(value =>  value.userName.toLowerCase().indexOf(this.inputSearch.toLowerCase()) > -1);
  }

  messageValidationClose(){
    this.isValidationMessage = false;
  }

  messageSuccsesfulClose(){
    this.isSuccesfullMessage = false;
  }

  checkOnSeen(comment:Comment):boolean{
    return !this.checkOnOwner(comment) && !(comment.userSeen.some(t => t === this.user.id));
  }

  addToUserSeenList(comment:Comment){
      this.commentService.addUserToCommentSeen(comment.id, this.user.id).subscribe( (result: boolean) =>{
        if(result){
          comment.userSeen.push(this.user.id);
          this.notificationService.showSuccessWithTimeout("You marked this comment as read!","Succses",4500);
        }}
      ,(error)=>{
          this.notificationService.showErrorHTMLMessage(error.error.message,"Error");
        });
  }

  showAllComments(){
    this.comments = this.allComments;
    this.currentPage = 1;
  }

  showOnlyNewComments(){
      this.comments = this.allComments.filter(t => this.checkOnSeen(t) && !this.checkOnOwner(t));
      this.currentPage = 1;
  }

}


