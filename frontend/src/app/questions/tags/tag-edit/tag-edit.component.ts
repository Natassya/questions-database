import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Tag } from '../tag.model';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  editMode = false;
  tag: Tag;

  constructor(private tagService: TagService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          let type = 'Conteúdo';
          let description = '';
          this.form = new FormGroup({
            'type': new FormControl(type, Validators.required),
            'description': new FormControl(description, Validators.required),
          });
          if (this.editMode) {
            this.tagService.getTag(this.id).subscribe(tag => {
                this.tag = tag;
                let type = tag.type;
                let description = tag.description;
                this.form = new FormGroup({
                  'type': new FormControl(type, Validators.required),
                  'description': new FormControl(description, Validators.required),
                });
              });
          }
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.tagService.updateTag(this.form.value, this.id).subscribe(tag => {
          this.tag = tag;
        });
    } else {
      this.tagService.addTag(this.form.value).subscribe(tag => {
          this.tag = tag;
        });
    }
    this.router.navigate(['tags']);
  }

  onDelete() {
    this.tagService.deleteTag(this.tag._id).subscribe(tag => {
      this.router.navigate(['tags']);
    });

  }

}
