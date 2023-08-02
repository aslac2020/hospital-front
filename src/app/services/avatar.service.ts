import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Avatar } from '../model/Avatar';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AvatarElai } from '../model/AvatarElai';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpClient) { }

  createVideoAvatar(videoAvatar: Avatar): Observable<Avatar> {
    const configHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Key': environment.tokenApi
    })
    return this.http.post<Avatar>(`${environment.apiAvatar}/video.generate`, videoAvatar, { headers: configHeaders})
  }

  createVideoAvataElai(videoAvatar: AvatarElai): Observable<AvatarElai> {
    const configHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.tokenAvatarElai}`
    })
    return this.http.post<AvatarElai>(`${environment.apiAvatarElai}/videos`, videoAvatar, { headers: configHeaders})
  }

  getRetrieveVideo(id: string): Observable<AvatarElai> {
    const configHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.tokenAvatarElai}`
    })
    return this.http.get<AvatarElai>(`${environment.apiAvatarElai}/videos/${id}`, {headers: configHeaders})
  }

  getRenderVideo(id: string): Observable<any> {
    const configHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${environment.tokenAvatarElai}`
    })
    return this.http.post<any>(`${environment.apiAvatarElai}/videos/render/${id}`, null,  {headers: configHeaders})
  }

}
