import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import { Card, CardText } from 'material-ui/Card';
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { PulseLoader } from 'halogen';
import ReactGA from 'react-ga';
import GoogleAds from './GoogleAds';
import './App.css';
import getApiEndpoint from '../utils';

ReactGA.initialize('UA-104374147-1');

class App extends Component {
  constructor(props) {
    super(props);
    this.apiEndpoint = getApiEndpoint();
    this.state = {
      dropdownOptions: [],
      stockSymbol: '',
      isLoadingChart: false,
      isChartLoaded: false,
      errorMessage: '',
      fiveYearsData: {},
      tenYearsData: {},
      fifteenYearsData: {},
      summary: {},
    };
    this.chartOptions = {
      responsive: true,
      tooltips: {
        mode: 'label',
      },
      scales: {
        xAxes: [{
          display: true,
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: true,
          },
          labels: {
            show: true,
          },
        }, {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    };

    this.dropdownOptions = this.fetchDropdownOptions();
    this.fetchChartData = this.fetchChartData.bind(this);
    this.onChangeStockSymbol = this.onChangeStockSymbol.bind(this);
    this.onSelectStockSymbol = this.onSelectStockSymbol.bind(this);
    ReactGA.ga('send', 'pageview', '/mypage');
  }

  onChangeStockSymbol(searchText) {
    this.setState({
      stockSymbol: searchText.toUpperCase(),
    });
  }

  onSelectStockSymbol(chosenRequest) {
    console.log(chosenRequest);
    this.onChangeStockSymbol(chosenRequest);
    this.fetchChartData();
  }

  fetchDropdownOptions() {
    fetch(`${this.apiEndpoint}/symbols`)
      .then(response => response.json())
      .then(response => this.setState({
        dropdownOptions: response,
      }));
  }

  fetchChartData() {
    this.setState({
      isLoadingChart: true,
      isChartLoaded: false,
      errorMessage: '',
    });
    ReactGA.event({
      category: 'quote',
      action: 'search',
      label: this.state.stockSymbol,
    });
    if (this.state.dropdownOptions.indexOf(this.state.stockSymbol) < 0) {
      this.setState({
        errorMessage: 'This stock symbol is not available yet',
        isLoadingChart: false,
      });
    } else {
      fetch(`${this.apiEndpoint}/quote/${this.state.stockSymbol}`)
        .then(response => response.json())
        .then((response) => {
          this.setState({
            summary: {
              text: `Current Week Number ${response.week_number}`,
              stockSymbol: this.state.stockSymbol,
              fiveYear: response['5_year'].reliability[parseInt(response.week_number, 10) - 1],
              tenYear: response['10_year'].reliability[parseInt(response.week_number, 10) - 1],
              fifteenYear: response['15_year'].reliability[parseInt(response.week_number, 10) - 1],
              fiveYearUp: (response['5_year']['avg_%_change'][parseInt(response.week_number, 10) - 1] > 0) ? 'UP' : 'DOWN',
              tenYearUp: (response['10_year']['avg_%_change'][parseInt(response.week_number, 10) - 1] > 0) ? 'UP' : 'DOWN',
              fifteenYearUp: (response['15_year']['avg_%_change'][parseInt(response.week_number, 10) - 1] > 0) ? 'UP' : 'DOWN',
            },
            isChartLoaded: true,
            isLoadingChart: false,
            fiveYearsData: {
              labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
              datasets: [{
                label: 'Percentage',
                type: 'line',
                data: response['5_year'].reliability,
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2',
              }, {
                type: 'bar',
                label: 'Average % Change (5 years)',
                data: response['5_year']['avg_%_change'],
                fill: true,
                backgroundColor: response['5_year'].color,
                borderColor: response['5_year'].color,
                hoverBackgroundColor: response['5_year'].hover_color,
                hoverBorderColor: response['5_year'].hover_color,
                yAxisID: 'y-axis-1',
              }],
            },
            tenYearsData: {
              labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
              datasets: [{
                label: 'Percentage',
                type: 'line',
                data: response['10_year'].reliability,
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2',
              }, {
                type: 'bar',
                label: 'Average % Change (10 years)',
                data: response['10_year']['avg_%_change'],
                fill: true,
                backgroundColor: response['10_year'].color,
                borderColor: response['10_year'].color,
                hoverBackgroundColor: response['10_year'].hover_color,
                hoverBorderColor: response['10_year'].hover_color,
                yAxisID: 'y-axis-1',
              }],
            },
            fifteenYearsData: {
              labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53],
              datasets: [{
                label: 'Percentage',
                type: 'line',
                data: response['15_year'].reliability,
                fill: false,
                borderColor: '#EC932F',
                backgroundColor: '#EC932F',
                pointBorderColor: '#EC932F',
                pointBackgroundColor: '#EC932F',
                pointHoverBackgroundColor: '#EC932F',
                pointHoverBorderColor: '#EC932F',
                yAxisID: 'y-axis-2',
              }, {
                type: 'bar',
                label: 'Average % Change (15 years)',
                data: response['15_year']['avg_%_change'],
                fill: true,
                backgroundColor: response['15_year'].color,
                borderColor: response['15_year'].color,
                hoverBackgroundColor: response['15_year'].hover_color,
                hoverBorderColor: response['15_year'].hover_color,
                yAxisID: 'y-axis-1',
              }],
            },
          });
        });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Weekly Seasonal Model</h1>
          <p className="App-intro">
            Using historical stock information, the weekly seasonal model provides the
            average % change and its corresponding reliability for a given stock,
            in each week of the year.
          </p>
          <br />
          <p className="App-intro">
            Simply enter a stock symbol below and click on Analyze button
          </p>
        </header>
        <AutoComplete
          floatingLabelText="Enter stock symbol, eg: AAPL"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={this.state.dropdownOptions}
          maxSearchResults={3}
          onUpdateInput={this.onChangeStockSymbol}
          onNewRequest={this.onSelectStockSymbol}
        />
        <br />
        <RaisedButton
          label="Analyze"
          backgroundColor="rgb(47, 60, 91)"
          labelColor="rgb(255, 255, 255)"
          onClick={this.fetchChartData}
        />
        <br />
        {
          this.state.isLoadingChart &&
          <PulseLoader color="rgb(47, 60, 91)" />
        }
        {
          this.state.errorMessage &&
          <p className="errorMessage">{this.state.errorMessage}</p>
        }
        {
          this.state.isChartLoaded &&
          <div>
            <br />
            <Card>
              <CardText>
                <h2> Summary </h2>
                <p>{this.state.summary.text}</p>
                <p>Stock symbol you querying for : {this.state.summary.stockSymbol}</p>
                <p>
                  15 year average: {this.state.summary.fifteenYear}%
                  &nbsp;{this.state.summary.fifteenYearUp}
                </p>
                <p>
                  10 year average: {this.state.summary.tenYear}%
                  &nbsp;{this.state.summary.tenYearUp}
                </p>
                <p>
                  5 year average : {this.state.summary.fiveYear}%
                  &nbsp;{this.state.summary.fiveYearUp}
                </p>
              </CardText>
            </Card>
            <h2>Average % Change (15 Years)</h2>
            <div className="container">
              <Bar data={this.state.fifteenYearsData} options={this.chartOptions} />
            </div>
            <h2>Average % Change (10 Years)</h2>
            <div className="container">
              <Bar data={this.state.tenYearsData} options={this.chartOptions} />
            </div>
            <h2>Average % Change (5 Years)</h2>
            <div className="container">
              <Bar data={this.state.fiveYearsData} options={this.chartOptions} />
            </div>
          </div>
        }
        <GoogleAds client="ca-pub-4810050267945909" slot="5726347873" format="auto" />
        <footer className="App-footer">
          <p>Frontend built using React, backend with PHP</p>
          <p>Data from Yahoo Finance</p>
        </footer>
      </div>
    );
  }
}

export default App;
