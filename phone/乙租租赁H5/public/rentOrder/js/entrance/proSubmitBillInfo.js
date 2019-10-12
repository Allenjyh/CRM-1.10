require.config({
    urlArgs: 'version=1.0.0',
    map: {
        '*': {
            'css': '../../../lib/css'
        }
    },
    shim: {
        'jquery': [
            'css!../../css/pickerStyle.css',
            'css!../../css/alert.css',
        ]
    },
    paths:{
        jquery:'../../../lib/jquery-2.1.0',
        billInfoEvent:'../event/billInfoEvent',
        rentData:'../subimtData/rentData',
        alertObj:'../../../tool/alert'
    }
});

require(["jquery","billInfoEvent","rentData","alertObj"],function($,billInfoEvent,rentData,alertObj){

    billInfoEvent.submitBillPay(rentData,alertObj);

});
