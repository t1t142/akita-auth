import { Directive, Input, OnDestroy } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { SessionQuery } from './state/session.query';

@Directive({ selector: '[showIfLoggedIn]' })
export class ShowIfLoggedInDirective implements OnDestroy {
  subscription: Subscription;
  @Input() showIfLoggedIn: boolean;

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authQuery: SessionQuery
  ) {
  }

  ngOnInit() {
    this.subscription = this.authQuery.isLoggedIn$.subscribe(isLoggedIn => {
      this.viewContainer.clear();
      if (isLoggedIn) {
        if (this.showIfLoggedIn) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      } else {
        if (this.showIfLoggedIn) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}