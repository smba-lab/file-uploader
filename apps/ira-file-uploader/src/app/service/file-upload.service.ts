import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { ResultModel } from "../models/result.model";

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  constructor(
    private http: HttpClient
  ) {}

  sendFiles(dencity: number, timeFile?: File, densityFile?: File): Observable<ResultModel> {
    const form = new FormData();
    if (timeFile) form.append('timeFile', timeFile);
    if (densityFile) form.append('densityFile', densityFile);
    form.append('dencity', dencity.toString())

    return this.http.post<ResultModel>('upload', form);
  }
}
