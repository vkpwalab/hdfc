import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import $ from 'jquery';

export interface UserData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {


  displayedColumns: string[] = ['name', 'edit project', 'delete project'];
  dataSource: MatTableDataSource<UserData>;
  formdata: UserData[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor() { }

  ngOnInit(): void {

    $('.next').click(function () {
      $('#pills-tabContent > .active').next().addClass('active').prev().removeClass('active')
      //for numbers
      $('#pills-tab > li > .active').parent('li').next().children('a').addClass('active').parent().prev().children().removeClass('active');

    })
    $('.prev').click(function () {
      $('#pills-tabContent > .active').prev().addClass('active').next().removeClass('active')
      //for numbers
      $('#pills-tab > li > .active').parent('li').prev().children('a').addClass('active').parent().next().children().removeClass('active');
    })

    this.formdata = [
      { id: 1, name: 'Albert' },
      { id: 1, name: 'blbert' },
      { id: 1, name: 'clbert' },
      { id: 1, name: 'dlbert' },
      { id: 1, name: 'elbert' },
      { id: 1, name: 'flbert' },
      { id: 1, name: 'glbert' },
    ]
    this.dataSource = new MatTableDataSource(this.formdata);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//       NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }
