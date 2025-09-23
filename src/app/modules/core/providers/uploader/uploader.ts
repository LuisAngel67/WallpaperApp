import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Uploader {
  private supabase: SupabaseClient;
  private bucket = environment.SUPABASE_CONFIG.SUPABASE_BUCKET;

  constructor() {
    this.supabase = createClient(
      environment.SUPABASE_CONFIG.SUPABASE_URL,
      environment.SUPABASE_CONFIG.SUPABASE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  async uploadImage(file: File): Promise<string | null> {
    try {
      const filePath = `${Date.now()}-${file.name}`;

      const { data, error } = await this.supabase.storage
        .from(this.bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;
      if (!data) throw new Error('No se recibió data al subir la imagen');

      const { data: publicData } = this.supabase.storage
        .from(this.bucket)
        .getPublicUrl(filePath);

      return publicData?.publicUrl ?? null;
    } catch (err) {
      console.error('[Uploader] Upload error:', err);
      return null;
    }
  }
}
