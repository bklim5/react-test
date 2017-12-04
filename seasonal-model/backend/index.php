<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$app = new \Slim\App;
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->get('/symbols', function (Request $request, Response $repsonse) {
    $symbols = json_decode(file_get_contents('symbols.json'));
    return $this->response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->withJson($symbols);
    
});

$app->get('/quote/{symbol}', function (Request $request, Response $response) {
    date_default_timezone_set('America/New_York');
    $currentWeekNumber = intval(date("W")); 
    $data = json_decode(file_get_contents('output.json'), true);
    $quote = $request->getAttribute('symbol');

    $weeklyChange = array();
    $weeklyAveragePercentChange = array();
    $weeks = array();
    for ($i = 1; $i <= 53; $i++) {
        $weeks[] = $i;
    }

    $currentWeekIndex = -1;
    for ($i = 0; $i < count($weeks); $i++) {
        $weeklyChange[$weeks[$i]] = array();
        $weeklyAveragePercentChange[$weeks[$i]] = 0;

        if ($currentWeekNumber == $weeks[$i]) {
            $currentWeekIndex = $i;
        }
    }

    // 15 years info
    for ($i = 0 ; $i < count($weeks) ; $i++ ) {
        $weeklyAveragePercentChange[$weeks[$i]] =  $data[$quote]['15 year analysis'][$weeks[$i]]['weekly_average_percent_change'];
    }

    $weeklyPercentage = array();
    $weeklyColor = array();
    $weeklyHoverColor = array();
    for ($week = 0; $week < count($weeks); $week++) {
        if ($weeklyAveragePercentChange[$weeks[$week]] < 0) {
            $weeklyColor[$week] = "#E57373";
            $weeklyHoverColor[$week] = "#CC7070";
        } else {
            $weeklyColor[$week] = "#81C784";
            $weeklyHoverColor[$week] = "#83CA8F";
        }

        if ($currentWeekIndex == $week) {
            $weeklyColor[$week] = "#70BFCC";
            $weeklyHoverColor[$week] = "#82D3E0";
        }

        $weeklyPercentage[$weeks[$week]] = $data[$quote]['15 year analysis'][$weeks[$week]]['Reliability'];
    }

    // 10 years info
    $tenYearweeklyAveragePercentChange = array();
    $tenYearweeklyChange = array();

    for ($i = 0 ; $i < count($weeks) ; $i++ ) {
        $tenYearweeklyAveragePercentChange[$weeks[$i]] =  $data[$quote]['10 year analysis'][$weeks[$i]]['weekly_average_percent_change'];
    }

    $tenYearsWeeklyPercentage = array();
    $tenYearWeeklyColor = array();
    $tenYearWeeklyHoverColor = array();
    for ($week = 0; $week < count($weeks); $week++) {
        if ($tenYearweeklyAveragePercentChange[$weeks[$week]] < 0) {
            $tenYearWeeklyColor[$week] = "#E57373";
            $tenYearWeeklyHoverColor[$week] = "#CC7070";
        } else {
            $tenYearWeeklyColor[$week] = "#81C784";
            $tenYearWeeklyHoverColor[$week] = "#83CA8F";
        }

        if ($currentWeekIndex == $week) {
            $tenYearWeeklyColor[$week] = "#70BFCC";
            $tenYearWeeklyHoverColor[$week] = "#82D3E0";
        }

        $tenYearsWeeklyPercentage[$weeks[$week]] = $data[$quote]['10 year analysis'][$weeks[$week]]['Reliability'];
    }

    // 5 years info
    $fiveYearweeklyAveragePercentChange = array();
    $fiveYearweeklyChange = array();

    for ($i = 0 ; $i < count($weeks) ; $i++ ) {
        $fiveYearweeklyAveragePercentChange[$weeks[$i]] =  $data[$quote]['5 year analysis'][$weeks[$i]]['weekly_average_percent_change'];
    }


    $fiveYearsweeklyPercentage = array();
    $fiveYearWeeklyColor = array();
    $fiveYearWeeklyHoverColor = array();
    for ($week = 0; $week < count($weeks); $week++) {
        if ($fiveYearweeklyAveragePercentChange[$weeks[$week]] < 0) {
            $fiveYearWeeklyColor[$week] = "#E57373";
            $fiveYearWeeklyHoverColor[$week] = "#CC7070";
        } else {
            $fiveYearWeeklyColor[$week] = "#81C784";
            $fiveYearWeeklyHoverColor[$week] = "#83CA8F";
        }

        if ($currentWeekIndex == $week) {
            $fiveYearWeeklyColor[$week] = "#70BFCC";
            $fiveYearWeeklyHoverColor[$week] = "#82D3E0";
        }

        $fiveYearsweeklyPercentage[$weeks[$week]] = $data[$quote]['5 year analysis'][$weeks[$week]]['Reliability'];
    }
    $output = array();
    $output['5_year'] = array();
    $output['5_year']['reliability'] = explode(",", implode(",", $fiveYearsweeklyPercentage));
    $output['5_year']['avg_%_change'] = explode(",", implode(", ", $fiveYearweeklyAveragePercentChange));
    $output['5_year']['color'] = $fiveYearWeeklyColor;
    $output['5_year']['hover_color'] = $fiveYearWeeklyHoverColor;

    $output['10_year'] = array();
    $output['10_year']['reliability'] = explode(",", implode(",", $tenYearsWeeklyPercentage));
    $output['10_year']['avg_%_change'] = explode(",", implode(",", $tenYearweeklyAveragePercentChange));
    $output['10_year']['color'] = $tenYearWeeklyColor;
    $output['10_year']['hover_color'] = $tenYearWeeklyHoverColor;

    $output['15_year'] = array();
    $output['15_year']['reliability'] = explode(",", implode(",", $weeklyPercentage));
    $output['15_year']['avg_%_change'] = explode(",", implode(",", $weeklyAveragePercentChange));
    $output['15_year']['color'] = $weeklyColor;
    $output['15_year']['hover_color'] = $weeklyHoverColor;

    $output['week_number'] = $currentWeekNumber;
    return $this->response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')->withJson($output);
});

$app->run();