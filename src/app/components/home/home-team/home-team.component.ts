import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home-team',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './home-team.component.html',
  styleUrl: './home-team.component.scss'
})
export class HomeTeamComponent {
  teamMembers = [
    {name: 'Jan Kowalski', role: 'Backend Developer'},
    {name: 'Anna Nowak', role: 'Frontend Developer'},
    {name: 'Piotr Wiśniewski', role: 'Designer'}
  ];
}
