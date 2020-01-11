import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tag } from './tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tagFetchURL = 'http://localhost:3000/tag/';
  tagGetURL = 'http://localhost:3000/tag/id';

  constructor(private http: HttpClient) { }

  fetchTags(): Observable<Tag[]> {
    return this.http
      .get<Tag[]>(this.tagFetchURL);
  }

  getTag(id: string): Observable<Tag> {
    return this.http
      .post<Tag>(this.tagGetURL, {_id: id});
  }

  addTag(tag: Tag): Observable<Tag> {
    delete tag._id;
    console.log(tag);
    return this.http
      .put<Tag>(this.tagGetURL, tag);
  }

  updateTag(tag: Tag, id: string) {
    tag._id = id;
    return this.http
      .put<Tag>(this.tagGetURL, tag);
  }

  deleteTag(id: string): Observable<Tag> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {_id: id}
    };
    return this.http
      .delete<Tag>(this.tagGetURL, httpOptions);
  }

}
