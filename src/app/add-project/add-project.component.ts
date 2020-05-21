import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import $ from 'jquery';
import { SharedService } from '../services/shared.service';
import { ISoapMethodResponse } from 'ngx-soap';

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
  draft_list: any;
  draft_data: any;


  constructor(private shared: SharedService) { }

  ngOnInit(): void {

    $('.prev').click(function () {
      $('#pills-tabContent > .active').prev().addClass('active').next().removeClass('active')
      //for numbers
      $('#pills-tab > li > .active').parent('li').prev().children('a').addClass('active').parent().next().children().removeClass('active');
    })

    this.formdata = []
    this.dataSource = new MatTableDataSource(this.formdata);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    setTimeout(() => {
      this.getDraftProjects();
    }, 2000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDraftProjects() {
    let body_get_draft_proj = { i_builder_id: '510673', Token: 'MH3NPYK34J0KHDI' };

    setTimeout(() => {
      (<any>this.shared.client).GET_DRAFT_PROJECT(body_get_draft_proj).subscribe(

        (res: ISoapMethodResponse) => {
          console.log('method response', res);
          let xmlResponse = res.xml;
          let result = res.result.GET_DRAFT_PROJECTResult;

          var result_json = JSON.parse(result)

          this.draft_list = result_json.Table;

          this.draft_list.forEach(element => {
            let list_obj = { id: element.DRAFT_ID, name: element.PROJECT_NAME }
            this.formdata.push(list_obj);
            this.dataSource = new MatTableDataSource(this.formdata);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });

          console.log(this.draft_list);

        },
        err => console.log(err)
      );
    }, 1000);
  }

  getDraftData(id) {
    this.draft_list.forEach(element => {
      if (element.DRAFT_ID == id) {
        console.log('sebt');
        this.draft_data = element;
      }
    });
  }

  deleteDraft(id) {
    let body_delete_draft = { I_DRAFT_ID: id, Token: 'MH3NPYK34J0KHDI' };

    (<any>this.shared.client).UPD_DRAFT_PROJECT(body_delete_draft).subscribe(

      (res: ISoapMethodResponse) => {
        console.log('method response', res);
        let xmlResponse = res.xml;
        let result = res.result.UPD_DRAFT_PROJECTResult;

        var result_json = JSON.parse(result)

        // this.draft_list = result_json.Table;

        console.log(result_json);

      },
      err => console.log(err)
    );
  }
}


