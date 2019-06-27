require.config({
    urlArgs: 'version=1.0.0',
   map: {
        '*': {
            'css': '../../../lib/css'
        }
    },
    shim: {
        'jquery': [
            'css!../../css/alert.css',
        ]
    },
    paths:{
        jquery:'../../../lib/jquery-2.1.0',
        withoutAnyEvent:'../event/submitWithoutAnyEvent',
        rentData:'../subimtData/rentData',
        alertObj:'../../../tool/alert'
    }
});

require(["jquery","withoutAnyEvent","rentData","alertObj"],function($,withoutAnyEvent,rentData,alertObj){

    withoutAnyEvent.submitWithoutAny(rentData,alertObj);

});
