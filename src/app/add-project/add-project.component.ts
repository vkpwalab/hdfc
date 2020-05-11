import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import $ from 'jquery';

export interface UserData {
  id: number;
  name: string;
}

/** Constants used to fill up our data base. */
// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  

  displayedColumns: string[] = ['name', 'edit project', 'delete project'];
  dataSource: MatTableDataSource<UserData>;
  formdata:UserData[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor() { 

   
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    // console.log(users)
    // Assign the data to the data source for the table to render
     }

  ngOnInit(): void {
   
    $('.next').click( function(){
      $('.active').next().addClass('active').prev().removeClass('active')
      
  })
  $('.prev').click( function(){
      $('.active').prev().addClass('active').next().removeClass('active')
  })
  /**** JQuery *******/
//   $('body').on('click','.next-tab', function(){
//    var next = $('.nav-pills > .active').next('li');
//    if(next.length){
//      next.find('a').trigger('click');
//    }else{
//       $('#pills-tab a:first').tab('show');     } });
//  $('body').on('click','.previous-tab', function(){
//      var prev = $('.nav-pills > .active').prev('li')
//     if(prev.length){
//       prev.find('a').trigger('click');
// }else{
//       $('#pills-tab a:last').tab('show');
//     }
// });
    this.formdata = [
      {id:1,name:'Albert'},
      {id:1,name:'blbert'},
      {id:1,name:'clbert'},
      {id:1,name:'dlbert'},
      {id:1,name:'elbert'},
      {id:1,name:'flbert'},
      {id:1,name:'glbert'},
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
