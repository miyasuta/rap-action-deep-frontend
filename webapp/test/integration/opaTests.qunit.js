sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'miyasuta/rapactiondeep/test/integration/FirstJourney',
		'miyasuta/rapactiondeep/test/integration/pages/StockList',
		'miyasuta/rapactiondeep/test/integration/pages/StockObjectPage'
    ],
    function(JourneyRunner, opaJourney, StockList, StockObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('miyasuta/rapactiondeep') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheStockList: StockList,
					onTheStockObjectPage: StockObjectPage
                }
            },
            opaJourney.run
        );
    }
);