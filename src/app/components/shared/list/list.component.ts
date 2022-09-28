import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() headers!: string[];
  // objects to list inside of the table
  @Input() rows!: object[];
  @Output() clickDetails = new EventEmitter();
  windowWidth!: number;

  constructor() {}

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
  }

  getData(index: number): object[] {
    return Object.values(this.rows[index]);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowWidth = window.innerWidth;
  }

  getDetails(event: any) {
    this.clickDetails.emit(event);
  }
}
