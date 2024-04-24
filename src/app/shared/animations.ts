import { animate, animateChild, group, query, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(
        ':enter, :leave',
        [
          style({
           opacity:0
          }),
        ],
        {optional: true},
      ),
      query(':enter', [style({opacity:0})], {optional: true}),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [animate('1000ms ease-out', style({ opacity: 0}))], {
          optional: true,
        }),
        query(':enter', [animate('1000ms ease-in', style({opacity: 1}))], {optional: true}),
        query('@*', animateChild(), {optional: true}),
      ]),
    ]),
  ]);