import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import $ from 'jquery';
import { SharedService } from '../services/shared.service';
import { HttpClient } from '@angular/common/http';

declare var MapmyIndia;
declare var L;

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
  builder_id: string;
  token: string;
  map: any;
  curr_marker: any;
  pt: any;
  latlong: any;

  constructor(private shared: SharedService, private http:HttpClient) { }

  ngOnInit(): void {
    this.builder_id = '510673';
    this.token = 'MH3NPYK34J0KHDI';

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

    //map code start
    this.map = new MapmyIndia.Map("map", { center: [28.61, 77.23], zoomControl: true, hybrid: true });

    let that = this;
    this.map.on("click", function (e) {
      console.log(e);
      that.pt = e.latlng; //event returns lat lng of clicked point

      if (that.curr_marker) {
        that.map.removeLayer(that.curr_marker);
      }
      that.curr_marker = that.addMarker(e.latlng, 'Project Location', true);

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDraftProjects() {
    let body_get_draft_proj = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                    <soapenv:Header/>
                                    <soapenv:Body>
                                      <tem:GET_DRAFT_PROJECT>
                                          <!--Optional:-->
                                          <tem:i_builder_id>${this.builder_id}</tem:i_builder_id>
                                          <!--Optional:-->
                                          <tem:Token>${this.token}</tem:Token>
                                      </tem:GET_DRAFT_PROJECT>
                                    </soapenv:Body>
                                </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/GET_DRAFT_PROJECT';
    let result_tag = 'GET_DRAFT_PROJECTResult';
    this.shared.getData(soapaction, body_get_draft_proj, result_tag).subscribe(
      (data) => {
        this.draft_list = data.Table;

        this.draft_list.forEach(element => {
          let list_obj = { id: element.DRAFT_ID, name: element.PROJECT_NAME }
          this.formdata.push(list_obj);
          this.dataSource = new MatTableDataSource(this.formdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

        console.log(this.draft_list);
      }
    );
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
    let body_get_draft_proj = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
                                  <soapenv:Header/>
                                  <soapenv:Body>
                                    <tem:UPD_DRAFT_PROJECT>
                                        <!--Optional:-->
                                        <tem:I_DRAFT_ID>${id}</tem:I_DRAFT_ID>
                                        <!--Optional:-->
                                        <tem:Token>${this.token}</tem:Token>
                                    </tem:UPD_DRAFT_PROJECT>
                                  </soapenv:Body>
                              </soapenv:Envelope>`;

    let soapaction = 'http://tempuri.org/IService1/UPD_DRAFT_PROJECT';
    let result_tag = 'UPD_DRAFT_PROJECTResult';
    this.shared.getData(soapaction, body_get_draft_proj, result_tag).subscribe(
      (data) => {
        this.draft_list = data.Table;

        this.draft_list.forEach(element => {
          let list_obj = { id: element.DRAFT_ID, name: element.PROJECT_NAME }
          this.formdata.push(list_obj);
          this.dataSource = new MatTableDataSource(this.formdata);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

        console.log(this.draft_list);
      }
    );
  }

  selectLocation(){
    // this.http.get('http://apis.mapmyindia.com/advancedmaps/v1/<licence_key>/rev_geocode?lat=26.5645&lng=85.9914').subscribe(
    //   (res)=>{
    //     console.log(res);
    //   }
    // )
    this.latlong = this.pt;
  }
  addMarker(position, title, draggable) {

    var mk = new L.Marker(position, { draggable: draggable, title: title });

    mk.bindPopup(title);

    this.map.addLayer(mk);

    mk.on("click", function (e) {
      //your code about what you want to do on a marker click 
    });
    return mk;
  }
}


