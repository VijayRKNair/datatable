import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserListingService } from './user-listing.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatMenuTrigger} from '@angular/material/menu';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
export interface UserDetails {
  thumbnail: string;
  name: string;
  dob: Date;
  city: string;
  email: string;
  phoneNumber: number;
}
@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})

export class UserListingComponent implements OnInit,AfterViewInit {
  columns = [
    { columnDef: 'thumbnail', header: '',    cell: (element: any) => `${element.thumbnail}` },
    { columnDef: 'name', header: 'Name',    cell: (element: any) => `${element.name}` },
    { columnDef: 'dob',     header: 'Date Of Birth',   cell: (element: any) => `${element.dob}`},
    { columnDef: 'city',   header: 'City', cell: (element: any) => `${element.city}`   },
    { columnDef: 'email',   header: 'Email', cell: (element: any) => `${element.email}` },
    { columnDef: 'phoneNumber',   header: 'Phone Number', cell: (element: any) => `${element.phoneNumber}` },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  userListDataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  checked = false;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  filterComponentArray: Array<String>;
  contextMenuPosition = { x: '0px', y: '0px' };
  selectedFilterValues: Array<String> = [];
  @ViewChildren ('checkbox') filterCheckbox : QueryList<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private userListingService: UserListingService, private notificationBar: MatSnackBar) { }

  ngOnInit(): void {
    this.userListingService.getUersList().subscribe((userList) => {
      let userDataList : UserDetails[] =  userList.body['results'].map(mapper => {
          return this.formatUserTableData(mapper)
        })
        this.userListDataSource = new MatTableDataSource(userDataList);
        this.userListDataSource.sort = this.sort;
        this.userListDataSource.paginator = this.paginator;
        this.userListDataSource.filterPredicate = this.customFilterPredicate();
      },(err) => {
        this.handleError(err);
      })
  }

  ngAfterViewInit() {

   }

   handleError(err){
    this.notificationBar.open('Oops something went wrong!!', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
   }

  formatUserTableData(userListObj) : Object{
    return {
      "thumbnail": userListObj.picture.thumbnail,
      "name":userListObj.name.title+ '. '+userListObj.name.first + ' ' + userListObj.name.last,
      "dob"  : this.convertDate(userListObj.dob.date),
      "city" : userListObj.location.city,
      "email": userListObj.email,
      "phoneNumber": userListObj.phone
    }
  }

  convertDate(date){
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    let modifiedDate = year+'-' + month + '-'+dt;
    return modifiedDate
  }
  onContextMenu(event: MouseEvent, column) : void {
    if(column === 'city'){
      this.filterComponentArray = Array.from(new Set(this.userListDataSource._data.value.map(mapper => {
        return {
          "value": mapper[column],
          "isChecked": this.selectedFilterValues.includes(mapper[column]) ? !this.checked : this.checked
        }
      })))
      this.filterComponentArray.sort(function(a,b) {return (a['isChecked'] > b['isChecked']) ? 1 : ((b['isChecked']  > a['isChecked'] ) ? -1 : 0);}).reverse();
      event.preventDefault();
      this.contextMenuPosition.x = event.clientX + 'px';
      this.contextMenuPosition.y = event.clientY + 'px';
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }

  customFilterPredicate()  {
    return (user: UserDetails, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      let isCityAvailable = false;
      if (searchString.length) {
        for (const d of searchString) {
          if (user.city.toString().trim() == d) {
            isCityAvailable = true;
          }
        }
      } else {
        isCityAvailable = true;
      }
      return isCityAvailable;
    }
  }
  applyFilter(filterCheckBox,filterCol) : void{
    if(filterCheckBox.checked && !this.selectedFilterValues.includes(filterCol)){
      this.selectedFilterValues.push(filterCol);
    }else{
      let spliceIndex = this.selectedFilterValues.findIndex(mapper =>  mapper === filterCol)
      this.selectedFilterValues.splice(spliceIndex)
    }
    this.userListDataSource.filter = JSON.stringify(this.selectedFilterValues);
    }
}