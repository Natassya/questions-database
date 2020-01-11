import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Tag } from './tag.model';
import { TagService } from './tag.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  private tags: Tag[] = [];
  filteredTags: Array<Tag> = [];
  _inputBusca: string;

  constructor(private tagService: TagService,
              private router: Router,
              private route: ActivatedRoute) {  }

  ngOnInit() {
    this.tagService.fetchTags().subscribe(tags => {
        this.tags = tags;
        this.filteredTags = this.tags;
      });

  }

  getTags() {
    return this.tags.slice();
  }

  addTag() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  editTag(tag: Tag) {
    this.router.navigate(['./', tag._id], {relativeTo: this.route});
  }

  deleteTag(tag: Tag) {
    this.tagService.deleteTag(tag._id).subscribe(tag => {
      this.tagService.fetchTags().subscribe(tags => {
          this.tags = tags;
          this.filteredTags = this.tags;
        });
    });
  }


  get inputBusca(): string {
    return this._inputBusca;
  }

  set inputBusca(value: string) {
    this._inputBusca = value;
    this.filteredTags = this.inputBusca ? this.performFilter(this.inputBusca) : this.tags;
  }

  performFilter(filterBy: string): Tag[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tags.filter((tag: Tag) =>
      tag.description.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      tag.type.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onBuscar() {
    this.performFilter(this.inputBusca);
  }

}
