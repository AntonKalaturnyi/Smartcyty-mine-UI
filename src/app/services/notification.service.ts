import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title){
    this.toastr.success(message, title)
  }
  showSuccessHTMLMessage(message, title){
    this.toastr.success(message, title, {
      enableHtml :  true
    })
  }
  showSuccessWithTimeout(message, title, timespan){
    this.toastr.success(message, title ,{
      timeOut :  timespan,
      disableTimeOut: false
    })
  }
  showError(message, title){
    this.toastr.error(message, title)
  }
  showErrorHTMLMessage(message, title){
    this.toastr.error(message, title, {
      enableHtml :  true
    })
  }
  showErrorWithTimeout(message, title, timespan){
    this.toastr.error(message, title ,{
      timeOut :  timespan,
      disableTimeOut: false
    })
  }
  showInfo(message, title){
    this.toastr.info(message, title)
  }
  showInfoHTMLMessage(message, title){
    this.toastr.info(message, title, {
      enableHtml :  true
    })
  }
  showInfoWithTimeout(message, title, timespan){
    this.toastr.info(message, title ,{
      timeOut :  timespan,
      disableTimeOut: false
    })
  }
  showWarning(message, title){
    this.toastr.warning(message, title)
  }
  showWarningHTMLMessage(message, title){
    this.toastr.warning(message, title, {
      enableHtml :  true
    })
  }
  showWarningWithTimeout(message, title, timespan){
    this.toastr.warning(message, title ,{
      timeOut :  timespan,
      disableTimeOut: false
    })
  }
}
