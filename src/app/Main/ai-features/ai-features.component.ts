import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ai-features',
  templateUrl: './ai-features.component.html',
  styleUrls: ['./ai-features.component.css']
})
export class AiFeaturesComponent implements OnInit {
  bestEmployee: string = '';
  peakHours: string[] = [];
  bestProduct: string = '';
  dynamicPricing: any[] = [];
  expiringSoonProducts: any[] = [];
  forecastData: any[] = [];
  forecastChartUrl: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchForecastData();
  }

  fetchForecastData() {
    this.http.get<any>('https://localhost:5001/api/forecast').subscribe({
      next: (data) => {
        this.bestEmployee = data.bestEmployee;
        this.peakHours = data.peakHours;
        this.bestProduct = data.bestProduct;
        this.dynamicPricing = data.dynamicPricing;
        this.expiringSoonProducts = data.expiringSoonProducts;
        this.forecastData = data.salesForecast;

        this.updateForecastChartUrl();
      },
      error: () => {
        // Fallback values
        this.bestEmployee = 'Ibrar Zahid';
        this.peakHours = ['12PM–2PM', '6PM–8PM'];
        this.bestProduct = 'Laptop';

        this.dynamicPricing = [
          { product: 'Laptop', currentPrice: 85000, recommendedPrice: 82000 },
          { product: 'Mouse', currentPrice: 1500, recommendedPrice: 1400 }
        ];

        this.expiringSoonProducts = [
          { product: 'Old Stock Keyboard', expiryDate: '2025-07-10', discount: '20%' },
          { product: 'Wired Mouse', expiryDate: '2025-07-15', discount: '15%' }
        ];

        this.forecastData = [
          { month: 'July', product: 'Laptop', predictedSales: 120 },
          { month: 'July', product: 'Mouse', predictedSales: 300 }
        ];

        this.updateForecastChartUrl();
      }
    });
  }

  updateForecastChartUrl() {
    const labels = this.forecastData.map(item => item.product);
    const data = this.forecastData.map(item => item.predictedSales);

    const chartConfig = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Predicted Sales',
          data: data
        }]
      }
    };

    const encodedChart = encodeURIComponent(JSON.stringify(chartConfig));
    this.forecastChartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
  }
}
