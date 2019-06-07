import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../services/comment.service';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {
  checkoutForm;
  user;
  constructor(private formBuilder: FormBuilder, private commentService: CommentService, private router: Router,
              private actRouter: ActivatedRoute) {
    this.checkoutForm = this.formBuilder.group({
      description: '',
    });
  }

  onSubmit(incom) {
    console.log(incom);
    let comment = incom;
    this.commentService.findCommentById(this.actRouter.snapshot.paramMap.get('id')).subscribe(com => {
     com.description = incom.description;
     comment = com;
     this.commentService.updateComment(this.actRouter.snapshot.paramMap.get('id'), comment).subscribe(() => {
        this.router.navigateByUrl('home/comments/' + comment.taskId);
      });
    });

  }

  ngOnInit() {
    this.commentService.findCommentById(this.actRouter.snapshot.paramMap.get('id')).subscribe(comment => {
      this.checkoutForm.controls.description.setValue(comment.description);
    });
  }
}
