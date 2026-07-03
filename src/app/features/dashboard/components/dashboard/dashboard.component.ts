import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { toDashboardViewModel } from '../../mappers/dashboard.mapper';
import { DashboardViewModel } from '../../models/dashboard.vm';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  data: DashboardViewModel | null = null;
  loading = true;
  error = false;

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getData().subscribe({
      next: (dto) => {
        this.data = toDashboardViewModel(dto);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
