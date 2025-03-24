export interface Peticion {
  id?: number;
  created_at?: string;
  updated_at?: string;
  titulo?: string;
  descripcion?: string;
  destinatario?: string;
  firmantes?: number;
  estado?: string;
  user_id?: number;
  categoria_id?: number;
  file?:{
    file_path?:string,
    name?:string,
  }
}
