import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rewritetext',
  standalone: true,
  imports: [],
  templateUrl: './rewritetext.component.html',
  styleUrl: './rewritetext.component.scss'
})
export class RewritetextComponent {
  @ViewChild('textElement') textElement!: ElementRef<HTMLDivElement>;

  phrases: string[] = ['We Learn ', 'We grow', 'Welcome to WaiiShop', ''];
  currentPhraseIndex: number = 0;
  chars: string = "!<>-_\\/[]{}&#8212;=+*^?#________";
  intervalId: any;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.scrambleText();
  }

  scrambleText(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    const el = this.textElement.nativeElement;
    const oldText = el.innerText;
    const newText = this.phrases[this.currentPhraseIndex];
    const length = Math.max(oldText.length, newText.length);

    let queue: { from: string, to: string, start: number, end: number , char?:string}[] = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({ from, to, start, end });
    }

    let frame = 0;
    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 1) {
            queue[i].char = this.randomChar();
          }
          output += `<span class="sb">${char}</span>`;
        } else {
          output += from;
        }
      }

      el.innerHTML = output;

      if (complete === queue.length) {
        clearInterval(this.intervalId);
        this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
        this.intervalId = window.setTimeout(this.scrambleText.bind(this), 1500);
      } else {
        frame++;
        this.intervalId = requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}
