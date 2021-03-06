import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Hero } from "../hero";
import { ShodownService } from "../shodownservice.service";
import { BattleStates } from "../battle-states.enum";
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { Attack } from '../attack';
import { AnimationDurations } from '../animation-durations';
import { HealthComponent } from '../health/health.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: "battle",
  templateUrl: "./battle.component.html",
  styleUrls: ["./battle.component.css"],
  animations: [
    trigger('PlayUserCard', [
      // state('onDeck', style({transform: 'translate(-100%, 175%)'})),
      // state('inPlay', style({transform: '*'})),
      transition(':enter', [
        style({ transform: 'translate(-90%, 90%)' }),
        animate(`${AnimationDurations.playCard}ms ease-out`, style({ transform: '*' }))
      ])
    ]),
    trigger('PlayComputerCard', [
      // state('onDeck', style({transform: 'translate(-100%, 175%)'})),
      // state('inPlay', style({transform: '*'})),
      transition(':enter', [
        style({ transform: 'translate(90%, -90%)' }),
        animate(`${AnimationDurations.playCard}ms ease-out`, style({ transform: '*' }))
      ])
    ]),
    trigger('UserAttack', [
      transition('none => bump', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(-40%)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ]),
      transition('none => punch', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(-40%) rotate(-15deg)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ]),
      transition('none => kick', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(-40%) rotate(15deg)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ])
    ]
    ),
    trigger('ComputerAttack', [
      transition('none => bump', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(40%)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ]),
      transition('none => punch', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(40%) rotate(15deg)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ]),
      transition('none => kick', [
        animate(`${AnimationDurations.attack}ms`, keyframes([
          style({ transform: '*', offset: 0 }),
          style({ transform: 'translateX(40%) rotate(-15deg)', offset: 0.15 }),
          style({ transform: '*', offset: 1 })
        ]))
      ])
    ]
    ),
    trigger('UserDeath', [
      transition('* => kick', [
        animate(`${AnimationDurations.death}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateX(0)    rotateY(0)', offset: 0 }),
          style({ transform: 'translateX(150%) translateY(-45%)  rotateY(90deg) rotateZ(90deg)', offset: 0.25 }),
          style({ transform: 'translateX(325%) translateY(-75%) rotateY(180deg) rotateZ(180deg)', offset: 0.50 }),
          style({ transform: 'translateX(450%) translateY(-125%) rotateY(90deg) rotateZ(90deg)', opacity: 0.5, offset: .75 }),
          style({ transform: 'translateX(500%) translateY(-135%) rotateY(180deg) rotateZ(180deg)', opacity: 0, offset: 1.0 })
        ]))
      ]),
      transition('* => bump', [
        animate(`${AnimationDurations.death}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateX(0)    rotateY(0)', offset: 0 }),
          style({ transform: 'translateX(150%) rotateY(90deg)', offset: 0.25 }),
          style({ transform: 'translateX(325%) rotateY(180deg)', offset: 0.50 }),
          style({ transform: 'translateX(450%) rotateY(90deg)', opacity: 0.5, offset: .75 }),
          style({ transform: 'translateX(500%) rotateY(180deg)', opacity: 0, offset: 1.0 })
        ]))
      ]),
      transition('* => punch', [
        animate(`${AnimationDurations.death}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateX(0)    rotateY(0)', offset: 0 }),
          style({ transform: 'translateX(150%) translateY(45%)  rotateY(90deg) rotateZ(-90deg)', offset: 0.25 }),
          style({ transform: 'translateX(325%) translateY(75%) rotateY(180deg) rotateZ(-180deg)', offset: 0.50 }),
          style({ transform: 'translateX(450%) translateY(125%) rotateY(90deg) rotateZ(-90deg)', opacity: 0.5, offset: .75 }),
          style({ transform: 'translateX(500%) translateY(135%) rotateY(180deg) rotateZ(-180deg)', opacity: 0, offset: 1.0 })
        ]))
      ])
    ]),
    trigger('ComputerDeath', [
      transition('* => kick', [
        animate(`${AnimationDurations.death}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateX(0)    rotateY(0)', offset: 0 }),
          style({ transform: 'translateX(-150%) translateY(-45%)  rotateY(-90deg) rotateZ(-90deg)', offset: 0.25 }),
          style({ transform: 'translateX(-325%) translateY(-75%) rotateY(-180deg) rotateZ(-180deg)', offset: 0.50 }),
          style({ transform: 'translateX(-450%) translateY(-125%) rotateY(-90deg) rotateZ(-90deg)', opacity: 0.5, offset: .75 }),
          style({ transform: 'translateX(-500%) translateY(-135%) rotateY(-180deg) rotateZ(-180deg)', opacity: 0, offset: 1.0 })
        ]))
      ]),
      transition('* => bump', [
        animate(`${AnimationDurations.death}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateX(0)    rotateY(0)', offset: 0 }),
          style({ transform: 'translateX(-150%) rotateY(-90deg)', offset: 0.25 }),
          style({ transform: 'translateX(-325%) rotateY(-180deg)', offset: 0.50 }),
          style({ transform: 'translateX(-450%) rotateY(-90deg)', opacity: 0.5, offset: .75 }),
          style({ transform: 'translateX(-500%) rotateY(-180deg)', opacity: 0, offset: 1.0 })
        ]))
      ]),
      transition('* => punch', [
        animate(`${AnimationDurations.death}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateX(0)    rotateY(0)', offset: 0 }),
          style({ transform: 'translateX(-150%) translateY(45%)  rotateY(-90deg) rotateZ(90deg)', offset: 0.25 }),
          style({ transform: 'translateX(-325%) translateY(75%) rotateY(-180deg) rotateZ(180deg)', offset: 0.50 }),
          style({ transform: 'translateX(-450%) translateY(125%) rotateY(-90deg) rotateZ(90deg)', opacity: 0.5, offset: .75 }),
          style({ transform: 'translateX(-500%) translateY(135%) rotateY(-180deg) rotateZ(180deg)', opacity: 0, offset: 1.0 })
        ]))
      ])
    ]),
    trigger('Pow', [
      transition('* => computer', [
        style({ display: 'block', left: '7.5%' }),
        animate(`${AnimationDurations.hitEffect}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateY(-25%) scale(1.5)', opacity: 0 })
        ]))
      ]),
      transition('* => player', [
        style({ display: 'block', right: '7.5%' }),
        animate(`${AnimationDurations.hitEffect}ms ${AnimationDurations.attack * .15}ms`, keyframes([
          style({ transform: 'translateY(-25%) scale(1.5)', opacity: 0 })
        ]))
      ])
    ]),
    trigger('DamageDealt', [
      transition('* => computer', [
        style({ display: 'block' }),
        animate(`${AnimationDurations.hitEffect}ms`, keyframes([
          style({ transform: 'translateY(-25%)', opacity: 0 })
        ]))
      ]),
      transition('* => player', [
        style({ display: 'block' }),
        animate(`${AnimationDurations.hitEffect}ms`, keyframes([
          style({ transform: 'translateY(-25%)', opacity: 0 })
        ]))
      ])
    ]),
    trigger('AdvantageDamageDealt', [
      transition('* => true', [
        animate(`${AnimationDurations.hitEffect}ms`, keyframes([
          style({ transform: 'scale(2)' })
        ]))
      ])
    ])
  ]
})

export class BattleComponent implements OnInit, OnDestroy {
  playerHeroes: Hero[];
  computerHeroes: Hero[];

  playerInputNeeded: boolean = false;
  lastActionDelay: number = 0;

  images: any = ["gotham", "metropolis",
    "futuristic", "atlantis", "fortress", "triskelion", "tower", "asgard"
  ];

  backgroundMusic: HTMLAudioElement;
  punchSound: HTMLAudioElement;
  fightSound: HTMLAudioElement;

  currentBackground: string = "";

  constructor(private shodown: ShodownService, private router: Router) { }

  ngOnInit() {
    this.playerHeroes = this.shodown.getPlayerHeroes();
    this.computerHeroes = this.shodown.getComputerHeroes();

    if (!this.playerHeroes || !this.computerHeroes) {
      this.router.navigate(["home"]);
      return;
    }

    this.prepareAudio();
    this.fightAudio();
    this.playBackgroundMusic();

    this.currentBackground = this.randomBackground();

    //temp just to test
    this.shodown.pickFirstPlayer();
    this.shodown.setBattleState(this.shodown.getIsPlayerTurn()
      ? BattleStates.PLAYER_CHOOSE
      : BattleStates.CPU_CHOOSE);

    // this.shodown.pickComputerHero();
    // this.shodown.pickPlayerHero();

    this.battleLoop();
  }

  ngOnDestroy() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
  }

  battleLoop(): void {
    if (!this.playerInputNeeded) {

      let functionToRun = null; //this is what will be run in this step
      let delay = this.lastActionDelay; //set the delay for this step based on the last action's required delay

      switch (this.shodown.getBattleState()) {
        case BattleStates.PLAYER_CHOOSE:
          // this.shodown.pickPlayerHero();
          functionToRun = (): void => {
            this.playerInputNeeded = true;
          }
          this.lastActionDelay = AnimationDurations.playCard;
          if (this.playerHeroes.length > 0) {
            delay -= 1000; //reduces the lag time for the player to be able to click
          }
          break;
        case BattleStates.CPU_CHOOSE:
          functionToRun = this.shodown.pickComputerHero;
          this.lastActionDelay = AnimationDurations.playCard;
          break;
        case BattleStates.PLAYER_ATTACK:
        case BattleStates.CPU_ATTACK:
          functionToRun = this.shodown.battle;
          this.lastActionDelay = AnimationDurations.attack;
          break;
        // case BattleStates.END_GAME:
        //   functionToRun = this.gameOver();
        default:
          if (!environment.production) {
            console.log("bad state");
          }
      }

      //run the rest of the steps on a delay
      setTimeout((): void => {
        if (this.shodown.checkWinner()) {
          this.gameOver();
          // setTimeout(this.gameOver, delay);
          return;
        }
        functionToRun();
        this.shodown.updateBattleState();
        if (this.shodown.removeDead()) {
          this.lastActionDelay += AnimationDurations.death;
        }

        if (!this.playerInputNeeded) {
          this.battleLoop();
        }
      }, delay);
    }
  }

  prepareAudio() {
    this.punchSound = new Audio();
    this.punchSound.src = "../../assets/sounds/punch.mp3";
    this.punchSound.load();

    this.fightSound = new Audio();
    this.fightSound.src = "../../assets/sounds/StreetFighter.mp3";
    this.fightSound.load();

    this.backgroundMusic = new Audio();
    this.backgroundMusic.src = "../../assets/sounds/The-Avengers-Theme-Song.mp3";
    this.backgroundMusic.load();
  }

  playBackgroundMusic() {
    this.backgroundMusic.play();
  }
  
  punchAudio() { 
    if (!this.shodown.getCurrentPlayerHero() || !this.shodown.getCurrentComputerHero()) {
      return;
    }
    this.punchSound.pause();
    this.punchSound.currentTime = 0;
    this.punchSound.play();
  }

  fightAudio(){
    this.fightSound.play();
  }

  choosePlayerCard(index: number): void {
    this.playerInputNeeded = false;
    this.shodown.pickPlayerHero(index);
    this.battleLoop();
  }

  gameOver = (): void => {
    if (!environment.production) {
      console.log(`The winner is ${this.shodown.getVictory() ? this.shodown.getUsername() : "the computer"}`);
    }
    this.router.navigate(["endgame"]);
  }

  currentComputerHero(): Hero {
    return this.shodown.getCurrentComputerHero();
  }

  currentPlayerHero(): Hero {
    return this.shodown.getCurrentPlayerHero();
  }

  currentAttack(): Attack {
    return this.shodown.getCurrentAttack();
  }

  currentAttackAnimation(): string {
    return this.shodown.getCurrentAttackAnimation();
  }

  currentHitEffect(): string {
    return this.shodown.getCurrentHitEffect();
  }
  
  computerHealth(): number {
    return this.shodown.getComputerHealth();
  }

  currentAttackTarget(): string {
    if (this.shodown.getCurrentAttack()) {
      if (this.shodown.getCurrentAttack().target === this.shodown.getCurrentComputerHero()) {
        return 'computer';
      } else if (this.shodown.getCurrentAttack().target === this.shodown.getCurrentPlayerHero()) {
        return 'player';
      }
    }
    
    return 'none';
  }

  currentPlayerHasAdvantage(): boolean {
    return ((this.shodown.getIsPlayerTurn() && this.computerHasAdvantage()) || (!this.shodown.getIsPlayerTurn() && this.playerHasAdvantage()));
  }

  randomBackground() {
    // return "Hello";
   return this.images[this.shodown.random(0, this.images.length-1)];
  }

  computerHasAdvantage(): boolean {
    if (!this.shodown.getCurrentComputerHero() || !this.shodown.getCurrentPlayerHero()) {
      return false;
    }
    return (this.shodown.getCurrentComputerHero().type.type === this.shodown.getCurrentPlayerHero().type.weak_against) || this.shodown.getCurrentComputerHero().type.type === 'all';
  }

  playerHasAdvantage(): boolean {
    if (!this.shodown.getCurrentComputerHero() || !this.shodown.getCurrentPlayerHero()) {
      return false;
    }
    return (this.shodown.getCurrentPlayerHero().type.type === this.shodown.getCurrentComputerHero().type.weak_against) || this.shodown.getCurrentPlayerHero().type.type === 'all';
  }

}
