import { Component, OnInit, Input } from '@angular/core';

// import { ChartsModule } from 'ng2-charts/ng2-charts';
@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {
    ngOnInit(): void {
    
        this.chartLabels = Object.keys(this.antennas).map(key => key);
        this.chartDatasets = [{ data: [...Object.keys(this.antennas).map(key => this.antennas[key] * 100), 0] }];
        this.chartLabels.forEach(label => {
            switch (label) {
                case "PHI (משרת את הוט ופרטנר)":
                    {
                        this.chartColors[0].backgroundColor.push(
                            'rgba(255, 159, 64, 0.2)'
                        )
                        this.chartColors[0].borderColor.push(
                            'rgba(255, 159, 64, 1)'
                        )
                        break;
                    }
                case "הוט מובייל":
                    {
                        this.chartColors[0].backgroundColor.push(
                            'rgba(255, 99, 132, 0.2)'
                        )
                        this.chartColors[0].borderColor.push(
                            'rgba(255,99,132,1)',
                        )
                        break;
                    }
                case "פלאפון":
                    {
                        this.chartColors[0].backgroundColor.push(
                            'rgba(54, 162, 235, 0.2)',
                        )
                        this.chartColors[0].borderColor.push(
                            'rgba(54, 162, 235, 1)'
                        )
                        break;
                    }
                case "סלקום":
                    {
                        this.chartColors[0].backgroundColor.push(
                            'rgba(153, 102, 255, 0.2)'
                        )
                        this.chartColors[0].borderColor.push(
                            'rgba(153, 102, 255, 1)'
                        )
                        break;
                    }
                case "גולן תקשורת":
                    {
                        this.chartColors[0].backgroundColor.push(
                            'pink'
                        );
                        this.chartColors[0].borderColor.push(
                            '#ff5775'
                        )
                        break;
                    }
                default:
                    break;
            }
        }
        )
    }
    ngAfterViewInit() {
        this.change('bar');
    }
    @Input()
    antennas;
    public chartType: string = 'pie';
    change(type) {
        this.chartType = type;
    }

    public chartDatasets: Array<any> = [

    ];

    public chartLabels: Array<any> = [];

    public chartColors: Array<any> = [
        {
            backgroundColor: [],
            borderColor: [],
            borderWidth: 2,
            pointBackgroundColor: 'rgba(220,220,220,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(220,220,220,1)'
        }
    ];

    public chartOptions: any = {
        responsive: true
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }
}
