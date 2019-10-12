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
        ]
    },
    paths:{
        jquery:'../../../lib/jquery-2.1.0',
        rentEvent:'../event/rentEvent',
        rentData:'../subimtData/rentData'
    }
});

require(["jquery","rentEvent","rentData"],function($,rentEvent,rentData){

    rentEvent.selectTime().setInputEvent().subimtRent(rentData);

});
