import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../services/comment.service';
import {TaskService} from '../../services/task.service';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Comment} from '../../model/Comment';
import {User} from "../../model/User";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  comments: Comment[];
  allComments: Comment[];
  task;
  checkoutForm;
  user:User;
  isSuccesfullMessage: boolean;
  isValidationMessage:boolean;
  searchText:string;
  isMoreView:boolean;


  constructor(private commentService: CommentService, private userService: UserService, private formBuilder: FormBuilder,
              private taskService: TaskService,
              private actRouter: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {
    this.taskService.findTaskById(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe(data => {
        this.task = data;
      })

    this.commentService.findCommentByTaskId(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe((data:Comment[]) => {
          this.allComments = data;
          this.comments = data.slice(0,10);
      });

    this.checkoutForm = this.formBuilder.group({
      description: ''
    });
    this.userService.getAuthenticatedUser().subscribe((date:User) => {
      this.user = date;
    });

  }

  handleEdit(comment:Comment) {
    this.router.navigateByUrl('/home/comments/edit/' + comment.id);
  }

  handleDelete(comment:Comment) {
    this.commentService.deleteComment(comment.id).subscribe(date =>{
      this.comments = this.comments.filter(item => item.id !== comment.id);
      this.allComments = this.allComments.filter(item => item.id !== comment.id);
      console.log(date);
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
          this.checkoutForm.controls['description'].setValue('');
          console.log(comment);
          this.commentService.findCommentById(date.id).subscribe((result: Comment) => {
            this.comments.unshift(result);
            this.comments = this.comments.slice(0,10);
            this.allComments.unshift(result);
          });
        }
      );
    }
    else {
      this.isValidationMessage = true;
    }
  }


  viewMore(){

    this.comments = this.allComments.slice(0,this.comments.length+10);


  }
  messageSuccsesfulClose(){
    this.isSuccesfullMessage= false;
  }
  messageValidationClose(){
    this.isValidationMessage = false;
  }
  checkOnOwner(comment:Comment) {
        return comment.userId == this.user.id;
  }

  goBackToTask(){
    this.router.navigateByUrl('/home/organizations');
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
  }

  search(){

      this.comments = this.allComments.filter(value =>
        value.userId.toString().indexOf(this.searchText) > -1
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
}


