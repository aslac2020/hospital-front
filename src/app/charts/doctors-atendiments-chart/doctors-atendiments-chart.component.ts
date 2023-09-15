import { Component } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Doctor } from 'src/app/model/Doctor';
import { ChartServicesService } from 'src/app/services/chart-services.service';

@Component({
  selector: 'app-doctors-atendiments-chart',
  templateUrl: './doctors-atendiments-chart.component.html',
  styleUrls: ['./doctors-atendiments-chart.component.css']
})
export class DoctorsAtendimentsChartComponent {
  view: [number, number] = [400, 400];
  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition = LegendPosition.Below

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private chartService: ChartServicesService) {
    this.getDoctors();
  }

  single!: any[];

  getDoctors() {
    this.chartService.getAllDoctors().
      subscribe(
        {
          next: (data: Doctor[]) => {
            this.single = [];
            this.single =
              this.single = data.map(result => (
                {name: result.name,value: result.id}
              ))
          }
        }
      )
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
