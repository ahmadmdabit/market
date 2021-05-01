import { NgForm, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ColumnData } from './interfaces/ColumnData';
import { MusteriTelefon } from './interfaces/MusteriTelefon';
import { Musteri } from './interfaces/Musteri';
import { ApiResponse } from './interfaces/ApiResponse';

import { CheckboxRenderer } from "./renders/checkbox-renderer.component";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getIlList();
  }

  ilList: Promise<any> = new Promise(function (resolve, reject) {
    resolve([]);
  });

  /** Services -------------------------------------------------------------------- */

  private getIlList() {
    this.http.get<ApiResponse>(`${environment.apiURL}/Il`)
      .subscribe(
        (result) => {
          if (result != undefined && result != null && result.status) {
            this.ilList = new Promise(function (resolve, reject) {
              resolve(result.data);
            });
          }
        }
      );
  }

  private getMusteriList() {
    this.http.get<ApiResponse>(`${environment.apiURL}/Musteri`)
      .subscribe(
        (result) => {
          if (result != undefined && result != null && result.status) {
            this.rowData = new Promise(function (resolve, reject) {
              resolve(result.data);
            });
          }
        }
      );
  }

  private upsertMusteri() {
    this.http.post<ApiResponse>(`${environment.apiURL}/Musteri`, this.data)
      .subscribe(
        (result) => {
          if (result != undefined && result != null && result.status) {
            this.getMusteriList();
            this.callRefreshAfterMillis({}, 50);
          }
        }
      );
  }

  /** /Services ------------------------------------------------------------------- */

  /** Ag-Grid -------------------------------------------------------------------- */
  private gridApi;
  private gridColumnApi;

  rowSelection = 'single';

  columnDefs = [
    { field: 'id', type: 'numberColumn', sortable: true, floatingFilter: true, },
    { field: 'ad', sortable: true, filter: true, floatingFilter: true, },
    { field: 'soyad', sortable: true, filter: true, floatingFilter: true, },
    { field: 'cinsiyet', cellRenderer: "checkboxRenderer", sortable: true, filter: true, floatingFilter: true },
    { field: 'dogumTarihi', type: 'dateColumn', sortable: true, floatingFilter: true, },
  ];

  rowData: Promise<any> = new Promise(function (resolve, reject) {
    resolve([]);
  });

  frameworkComponents = {
    checkboxRenderer: CheckboxRenderer
  };

  columnTypes = {
    numberColumn: {
      width: 130,
      filter: 'agNumberColumnFilter',
    },
    dateColumn: {
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterLocalDateAtMidnight: Date, cellValue: string) {
          if (cellValue == null) {
            return 0;
          }

          var dateParts = cellValue.split('/');
          var day = Number(dateParts[0]);
          var month = Number(dateParts[1]) - 1;
          var year = Number(dateParts[2]);
          var cellDate = new Date(year, month, day);

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        },
      },
      valueFormatter: (params: ColumnData) => {
        if (params.data.dogumTarihi == undefined || params.data.dogumTarihi == null) {
          return null;
        }
        var dateAsString = params.data.dogumTarihi.toString();
        var dateParts = dateAsString.split('T')[0].split('-');
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      },
    },
  };

  onSelectionChanged(event) {
    var selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length === 1) {
      // console.log(selectedRows[0]);
      // this.selectionEvent.emit(selectedRows[0]);
      // modal.open(null, selectedRows[0]);
      this.show(selectedRows[0]);
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.getMusteriList();
  }

  csvExport() {
    var params = this.getParams();
    if (params.suppressQuotes || params.columnSeparator) {
      alert(
        'NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel.'
      );
    }
    this.gridApi.exportDataAsCsv(params);
  }

  private getParams() {
    return {
      suppressQuotes: null,
      columnSeparator: null,
      customHeader: null,
      customFooter: null,
    };
  }

  private callRefreshAfterMillis(params, millis) {
    setTimeout(function () {
      this.gridApi?.refreshCells(params);
    }, millis);
  }

  /** /Ag-Grid -------------------------------------------------------------------- */

  /** Modal -------------------------------------------------------------------- */

  showModal: boolean;
  title: string;
  data: Musteri;

  show(data: Musteri) {
    this.data = data;
    this.title = `Yeni Müşteri Ekle:`;
    if (data != null) {
      this.title = `Müşteri Güncelleme: ${data?.ad} ${data?.soyad}`;
    }
    this.fill();
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.empty();
  }

  private fill() {
    if (this.data == null) {
      return;
    }
    this.myForm.controls.ad.setValue(this.data.ad)
    this.myForm.controls.soyad.setValue(this.data.soyad);
    this.myForm.controls.cinsiyet.setValue(this.data.cinsiyet);
    this.myForm.controls.meslegi.setValue(this.data.meslegi);
    let date = null;
    if (this.data.dogumTarihi != null) {
      let dt = new Date(this.data.dogumTarihi);
      let mm = (dt.getMonth() + 1).toString();
      if (mm.length == 1) {
        mm = '0' + mm;
      }
      let dd = dt.getDate().toString();
      if (dd.length == 1) {
        dd = '0' + dd;
      }
      date = dt.getFullYear() + '-' + mm + '-' + dd;
    }
    this.myForm.controls.dogumTarihi.setValue(date);
    this.myForm.controls.mailAdresi.setValue(this.data.mailAdresi);
    this.myForm.controls.webSitesi.setValue(this.data.webSitesi);
    this.myForm.controls.reklamMailleri.setValue(this.data.reklamMailleri);
    this.myForm.controls.adresBilgisi.setValue(this.data.adresBilgisi);
    this.myForm.controls.ilID.setValue(this.data.ilID);
    this.myForm.controls.notlar.setValue(this.data.notlar);
    // Telefonlar
    if (this.data.musteriTelefonlar != undefined && this.data.musteriTelefonlar != null && this.data.musteriTelefonlar.length > 0) {
      let sub = this.data.musteriTelefonlar.length - Object.keys((<FormGroup>this.myForm.controls.phoneNumbers).controls).length;
      if (sub > 0) {
        for (let ii = 0; ii < sub; ii++) {
          this.add();
        }
      }
      setTimeout(() => {
        let index = 0;
        // console.log(this.myForm.value.phoneNumbers, Object.keys(this.myForm.value.phoneNumbers));
        for (const key in (<FormGroup>this.myForm.controls.phoneNumbers).controls) {
          if (Object.prototype.hasOwnProperty.call((<FormGroup>this.myForm.controls.phoneNumbers).controls, key)) {
            // const element = this.myForm.controls.phoneNumbers[key];
            // console.log(key, index);
            (<FormGroup>this.myForm.controls.phoneNumbers).controls[key].setValue(this.data.musteriTelefonlar[index].telefon);
            ++index;
          }
        }
      }, 500); // Fix bug
    }
  }

  private empty() {
    this.myForm.controls.ad.setValue(null)
    this.myForm.controls.soyad.setValue(null);
    this.myForm.controls.cinsiyet.setValue(false);
    this.myForm.controls.meslegi.setValue(null);
    this.myForm.controls.dogumTarihi.setValue(null);
    this.myForm.controls.mailAdresi.setValue(null);
    this.myForm.controls.webSitesi.setValue(null);
    this.myForm.controls.reklamMailleri.setValue(false);
    this.myForm.controls.adresBilgisi.setValue(null);
    this.myForm.controls.ilID.setValue(null);
    this.myForm.controls.notlar.setValue(null);
    // Telefonlar
    let index = 0;
    for (const key in this.myForm.value.phoneNumbers) {
      if (Object.prototype.hasOwnProperty.call(this.myForm.value.phoneNumbers, key)) {
        // const element = this.myForm.value.phoneNumbers[key];
        // this.myForm.controls.phoneNumbers[key].setValue(null);
        this.remove(index);
        ++index;
      }
    }
  }

  private collect() {
    if (this.data == undefined || this.data == null) {
      this.data = {} as Musteri;
    }

    this.data.ad = this.myForm.controls.ad.value;
    this.data.soyad = this.myForm.controls.soyad.value;
    this.data.cinsiyet = this.myForm.controls.cinsiyet.value;
    this.data.meslegi = this.myForm.controls.meslegi.value;
    this.data.dogumTarihi = this.myForm.controls.dogumTarihi.value;
    this.data.mailAdresi = this.myForm.controls.mailAdresi.value;
    this.data.webSitesi = this.myForm.controls.webSitesi.value;
    this.data.reklamMailleri = this.myForm.controls.reklamMailleri.value;
    this.data.adresBilgisi = this.myForm.controls.adresBilgisi.value;
    this.data.ilID = this.myForm.controls.ilID.value;
    this.data.notlar = this.myForm.controls.notlar.value;
    // Telefonlar
    let index = 0;
    if (this.data.musteriTelefonlar == undefined || this.data.musteriTelefonlar == null) {
      this.data.musteriTelefonlar = [];
    }
    for (const key in this.myForm.value.phoneNumbers) {
      if (Object.prototype.hasOwnProperty.call(this.myForm.value.phoneNumbers, key)) {
        // const element = this.myForm.value.phoneNumbers[key];
        if (this.data.musteriTelefonlar[index] == undefined || this.data.musteriTelefonlar[index] == null) {
          this.data.musteriTelefonlar[index] = {} as MusteriTelefon;
        }
        this.data.musteriTelefonlar[index].telefon = this.myForm.value.phoneNumbers[key];
        ++index;
      }
    }
  }

  private count = 1;

  phoneNumberIds: number[] = [1];

  @ViewChild('myForm')
  private myForm: NgForm;

  remove(i: number) {
    this.phoneNumberIds.splice(i, 1);
  }

  add() {
    this.phoneNumberIds.push(++this.count);
  }

  save(myForm: NgForm) {
    // console.log(myForm.value);
    this.showModal = false;

    this.collect();

    // POST data
    console.warn(this.data);
    this.upsertMusteri();

    this.empty();
  }

  /** /Modal -------------------------------------------------------------------- */

}
