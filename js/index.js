var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope, $timeout) {

  $scope.playerarr = [];
  $scope.gamearr = [];
  $scope.disabled = true;
  $scope.winner = "";
  $scope.strict = false;

  function random() {
    return Math.floor(Math.random() * (4) + 1);
  }

  function sound(num) {
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + num + '.mp3');
    var player = audio.play();
    $("#b"+num).addClass("active");
    $timeout(function() { $("#b"+num).removeClass("active"); }, 600);
  }

  function buzz() {
    var audio = new Audio('https://d1490khl9dq1ow.cloudfront.net/sfx/mp3preview/buzzer-short_Mkc50-VO.mp3');
    audio.play();
  }

  function repeater(count) {
    $scope.disabled = true;
    sound($scope.playerarr[count]);
    count++;
    if (count < $scope.playerarr.length) {
      $timeout(function() {
        repeater(count);
      }, 600);
    } else {
       $scope.disabled = false;
    }
   
  }

  $scope.reset = function() {
    $scope.playerarr = [];
    $scope.start();
  };

  $scope.start = function(num) {
    $scope.playerarr = [];
    $scope.disabled = false;
    $scope.num = random();
    $scope.playerarr.push($scope.num);
    repeater(0);
  };

  $scope.play = function(num) {
    $scope.gamearr.push(num);
    if ($scope.gamearr[$scope.gamearr.length - 1] === $scope.playerarr[$scope.gamearr.length - 1]) {
      sound(num);
    } else {
      buzz();
      $scope.gamearr = [];
      if ($scope.strict) {
        $scope.playerarr = [];
      }
      $timeout(function() {
        repeater(0);
      }, 1000);
    }
    if ($scope.gamearr.length === 20) {
      var audio = new Audio('https://dl.dropboxusercontent.com/u/31750021/tada.mp3');
      audio.play();
      $scope.winner = "You Win!"
      $timeout(function() {
        $scope.winner = "";
        $scope.playerarr = [];
        $scope.gamearr = [];
        $scope.disabled = true;
      }, 5000);
    } else if ($scope.gamearr.length === $scope.playerarr.length) {
      $timeout(function() {
        $scope.gamearr = [];
        $scope.num = random();
        $scope.playerarr.push($scope.num);
        repeater(0);
      }, 1000);
    };
  }

});