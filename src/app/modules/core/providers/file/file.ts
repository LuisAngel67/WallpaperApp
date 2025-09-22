import { Injectable } from '@angular/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  async pickImage(): Promise<any | null> {
    try {
      const result = await FilePicker.pickFiles({
        types: ['image/*'],
      });
      if (result.files && result.files.length > 0) {
        return result.files[0];
      }
      console.log('All ok ' + result);
      return null;
    } catch (error) {
      console.log('Error picking file:', error);
      return null;
    }
  }
}
