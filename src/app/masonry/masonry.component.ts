// declare var require: any;
// declare var imagesLoaded: any;

import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MasonryOptions} from './masonry-options';

// const imagesLoaded = require('imagesloaded');
// const Masonry = require('masonry-layout');
import * as Masonry from 'masonry-layout';
import * as imagesLoaded from 'imagesloaded';

@Component({
  selector: '[masonry], masonry',
  template: '<ng-content></ng-content>'
})
export class AngularMasonryComponent implements OnInit, OnDestroy {
  public _msnry: any;
  // Inputs
  @Input() public options: MasonryOptions;
  @Input() public useImagesLoaded: Boolean = false;

  // Outputs
  @Output() layoutComplete: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() removeComplete: EventEmitter<any[]> = new EventEmitter<any[]>();

  // private _imagesLoaded = null;
  constructor(private _element: ElementRef) {
  }

  ngOnInit() {
    // Create masonry options object
    if (!this.options) {
      this.options = {};
    }

    // Set default itemSelector
    if (!this.options.itemSelector) {
      this.options.itemSelector = '[masonry-brick], masonry-brick';
    }

    // Set element display to block
    if (this._element.nativeElement.tagName === 'MASONRY') {
      this._element.nativeElement.style.display = 'block';
    }

    // Initialize Masonry
    this._msnry = new Masonry(this._element.nativeElement, this.options);

    // console.log('AngularMasonryComponent:', 'Initialized');

    // Bind to events
    this._msnry.on('layoutComplete', (items: any) => {
      this.layoutComplete.emit(items);
    });
    this._msnry.on('removeComplete', (items: any) => {
      this.removeComplete.emit(items);
    });
  }

  ngOnDestroy() {
    if (this._msnry) {
      this._msnry.destroy();
    }
  }

  public layout() {
    setTimeout(() => {
      this._msnry.layout();
    });
    // this._msnry.layout();
    // console.log('AngularMasonryComponent:', 'Layout');
  }

  // public add(element: HTMLElement, prepend: boolean = false) {
  public add(element: HTMLElement) {

    let isFirstItem = false;

    // Check if first item
    if (this._msnry.items.length === 0) {
      isFirstItem = true;
    }

    if (this.useImagesLoaded) {
      imagesLoaded(element, () => {
        this._element.nativeElement.appendChild(element);

        // Tell Masonry that a child element has been added
        this._msnry.appended(element);

        // layout if first item
        if (isFirstItem) {
          this.layout();
        }
      });
      // TODO 删除这个的意义是什么
      // this._element.nativeElement.removeChild(element);
    } else {
      // Tell Masonry that a child element has been added
      this._msnry.appended(element);
      // layout if first item
      if (isFirstItem) {
        this.layout();
      }
    }

    // console.log('AngularMasonryComponent:', 'Brick added');
  }

  public remove(element: HTMLElement) {
    // Tell Masonry that a child element has been removed
    this._msnry.remove(element);

    // Layout items
    this.layout();

    // console.log('AngularMasonryComponent:', 'Brick removed');
  }
}
