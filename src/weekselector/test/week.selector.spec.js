describe("week selector", function() {
    describe("with year defined", function() {
        var scope, _Date, today;

        beforeEach(module('ui.weekselector'));

        beforeEach(inject(function($controller, $rootScope) {
            today = "2014-04-07T11:59:01.913Z";
            _Date = Date;
            Date = function(someDay) {
                return someDay ? new _Date(someDay) : new _Date(today);
            };
            Date.UTC = _Date.UTC;

            scope = $rootScope.$new();

            scope.startDate = "2012-04-01";
            scope.language = "fr";
            $controller('WeekSelectorController', {
                $scope: scope
            });
            scope.$apply();
        }));

        afterEach(function() {
            Date = _Date;
        });

        it('should initialize years', function() {
            expect(scope.years).toEqual([2012, 2013, 2014]);
        });

        it('should initialize to current week', function() {
            expect(scope.week.weekNumber).toEqual(15);
            expect(scope.year).toEqual(2014);
            expect(scope.month).toEqual(3);
        });

        it('should default to current week if current year is chosen', function() {
            scope.year = 2014;

            scope.populateMonths();

            expect(scope.month).toEqual(3);
            expect(scope.week.weekNumber).toEqual(15);
        });

        it('should populate all months when year selected is not current year', function() {
            scope.year = 2013;

            scope.populateMonths(true);

            expect(scope.months).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            expect(scope.month).toEqual(undefined);
            expect(scope.week).toEqual(undefined);
            expect(scope.weeks).toEqual([]);
        });

        it('should populate till current month when year selected is current year', function() {
            scope.year = 2014;

            scope.populateMonths();

            expect(scope.months).toEqual([0, 1, 2, 3]);
        });

        it('should set month to current month if the current year is selected', function() {
            scope.year = 2014;

            scope.populateMonths();

            expect(scope.month).toEqual(3);
            expect(scope.weeks.length).toEqual(2);
        });

        it('should reload data when startDate changes', function() {
            scope.startDate = "2011-01-02"

            scope.$apply();

            expect(scope.years).toEqual([2011, 2012, 2013, 2014]);
        });

        it('should return month in appropriate language', function() {
            scope.locale = 'fr';
            scope.$apply();

            expect(scope.toDate(1)).toEqual("janv.");
        });

        it('should populate from start month when year selected is start date year', function() {
            scope.year = 2012;

            scope.populateMonths();

            expect(scope.months).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11]);
        });

        it('should initialize months and weeks if year is reset', function() {
            scope.year = undefined;

            scope.populateMonths();

            expect(scope.month).toEqual(undefined);
            expect(scope.week).toEqual(undefined);
            expect(scope.months).toEqual([]);
            expect(scope.weeks).toEqual([]);
        });

        it('should retain the values of month and week if year is changed dynamically through code', function() {
            scope.year = 2013;

            scope.populateMonths(false);

            expect(scope.month).toEqual(3);
            expect(scope.week.weekNumber).toEqual(15);
        });

        it('should initialize weeks if month is reset', function() {
            scope.month = undefined;

            scope.populateWeeks();

            expect(scope.week).toEqual(undefined);
            expect(scope.weeks).toEqual([]);
        });

        it('should populate all weeks for month when date selected is not of current month', function() {
            scope.year = 2014;
            scope.month = 2;
            scope.populateWeeks();

            expect(scope.weeks).toEqual([{
                weekNumber: 10,
                weekYear: 2014,
                startOfWeek: '2014-03-03',
                startOfWeekForDisplay: moment('03-03-2014').startOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeekForDisplay: moment('03-09-2014').endOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeek: '2014-03-09'
            }, {
                weekNumber: 11,
                weekYear: 2014,
                startOfWeek: '2014-03-10',
                startOfWeekForDisplay: moment('03-10-2014').startOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeekForDisplay: moment('03-16-2014').endOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeek: '2014-03-16'
            }, {
                weekNumber: 12,
                weekYear: 2014,
                startOfWeek: '2014-03-17',
                startOfWeekForDisplay: moment('03-17-2014').startOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeekForDisplay: moment('03-23-2014').endOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeek: '2014-03-23'
            }, {
                weekNumber: 13,
                weekYear: 2014,
                startOfWeek: '2014-03-24',
                startOfWeekForDisplay: moment('03-24-2014').startOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeekForDisplay: moment('03-30-2014').endOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeek: '2014-03-30'
            }]);
        });

        it('should populate weeks till last week for month when date selected is today', function() {
            today = "2014-03-31T11:59:01.913Z";
            scope.year = 2014;
            scope.month = 3;
            scope.populateWeeks();

            expect(scope.weeks).toEqual([ {
                weekNumber: 14,
                weekYear: 2014,
                startOfWeek: '2014-03-31',
                startOfWeekForDisplay: moment('03-31-2014').startOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeekForDisplay: moment('04-06-2014').endOf("isoWeek").toDate().toLocaleDateString(),
                endOfWeek: '2014-04-06'
            }]);
        });
    });

    describe("with year undefined", function() {
        var scope, _Date, today;

        beforeEach(module('ui.weekselector'));

        beforeEach(inject(function($controller, $rootScope) {
            today = "2014-04-07T11:59:01.913Z";
            _Date = Date;
            Date = function(someDay) {
                return someDay ? new _Date(someDay) : new _Date(today);
            };
            Date.UTC = _Date.UTC;

            scope = $rootScope.$new();
            $controller('WeekSelectorController', {
                $scope: scope
            });
        }));

        afterEach(function() {
            Date = _Date;
        });

        it('should initialize start date', function() {
            expect(scope.startDate).toEqual("1900-01-01");
            expect(scope.years.length).toEqual(2014 - 1900 + 1);
        });


    });


   describe("with EPI week falling in next year", function(){

     var scope, _Date, today;

     beforeEach(module('ui.weekselector'));

     beforeEach(inject(function($controller, $rootScope) {
       today = "2019-12-31T10:59:01.913Z";
       _Date = Date;
       Date = function(someDay) {
         return someDay ? new _Date(someDay) : new _Date(today);
       };
       Date.UTC = _Date.UTC;

       scope = $rootScope.$new();
       $controller('WeekSelectorController', {
         $scope: scope
       });
     }));

     it('years should have next year', function() {
        expect(scope.years.length).toEqual(2020 - 1900 + 1);
     });

   })
});
