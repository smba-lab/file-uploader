import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonDirective, InputModule } from '@ira-labs/ui';
import { FileUploadService } from "../../service/file-upload.service";
import { ResultModel } from "../../models/result.model";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: 'ira-uploader-file-upload',
  templateUrl: './file-upload.component.html',
  standalone: true,
  imports: [CommonModule, ButtonDirective, InputModule, ReactiveFormsModule]
})
export class FileUploadComponent {
  isLoading = false;
  resultData?: ResultModel;

  timeFile?: File;
  densityFile?: File;

  densityControl = this.formBuilder.nonNullable.control(0, Validators.required);

  constructor(
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder
  ) {}

  onFileChange(event: EventTarget | null, file: 'time' | 'density') {
    switch (file) {
      case "time": {
        this.timeFile = this.getFileFromEvent(event);
        break;
      }
      case "density": {
        this.densityFile = this.getFileFromEvent(event);
        break;
      }
    }
  }

  sendFiles() {
    this.isLoading = true;

    this.fileUploadService.sendFiles(this.densityControl.value, this.timeFile, this.densityFile).subscribe({
      next: (result) => {
        this.resultData = result;
      },
      error: () => this.isLoading = false,
      complete: () => this.isLoading = false
    });
  }

  resetValues() {
    this.resultData = undefined;
    this.densityControl.reset();
    this.timeFile = undefined;
    this.densityFile = undefined;
  }

  private getFileFromEvent(event: EventTarget | null) {
    if (!event) return;

    const fileList = (event as any).files as FileList;
    return fileList[0];
  }
}
