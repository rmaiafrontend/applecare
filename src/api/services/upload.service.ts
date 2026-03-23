import { apiClient } from '../client';

export interface UploadResponse {
  urlArquivo: string;
}

export const uploadService = {
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('arquivo', file);
    return apiClient<UploadResponse>({ method: 'POST', path: '/api/v1/admin/upload', body: formData, isMultipart: true });
  },
};
