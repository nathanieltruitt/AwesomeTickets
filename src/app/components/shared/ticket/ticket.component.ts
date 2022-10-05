import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faXmark, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  faXmark = faXmark;
  faTrashCan = faTrashCan;
  @Output() closeTicketEvent = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  closeTicket() {
    this.closeTicketEvent.emit();
  }
}
