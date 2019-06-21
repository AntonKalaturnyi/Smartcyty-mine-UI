import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TransactionService } from 'src/app/services/transaction.service';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';
import { DateRange } from '@uiowa/date-range-picker';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
})

export class TransactionListComponent implements OnInit {

  dateRange: DateRange;
  transactions: Object;
  task: Object;

  constructor(private transactionService: TransactionService, private taskService: TaskService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.dateRange =  new DateRange(new Date());
    this.transactionService.findTransactionsByTaskId(this.route.snapshot.paramMap.get("id"))
      .subscribe(data => {
        this.transactions = data;
        console.log(this.transactions);
      });
    this.taskService.findTaskById(this.route.snapshot.paramMap.get("id"))
      .subscribe(data => {
        this.task = data;
        console.log(this.task)
      });
  }

  changeDate(dateRange: DateRange) {
    this.dateRange = dateRange;
    this.transactionService.findTransactionsByDate(this.route.snapshot.paramMap.get("id"),this.dateRange).subscribe(data => {
      this.transactions = data;
      console.log(this.transactions);
  });
  }

  handleDelete(id: Number) {
    this.transactionService.deleteTransaction(id);
  }

  handleEdit(id: Number) {
    this.router.navigateByUrl('/home/task/edit/' + id);
  }

}