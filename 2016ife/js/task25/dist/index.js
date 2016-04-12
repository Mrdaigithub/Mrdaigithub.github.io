'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (WIN, DOC) {
    var Data = function () {
        function Data(data) {
            _classCallCheck(this, Data);

            this.data = data;
            this.current = null;
        }

        _createClass(Data, [{
            key: 'addData',
            value: function addData() {}
        }, {
            key: 'rmData',
            value: function rmData() {}
        }, {
            key: 'findData',
            value: function findData() {}
        }]);

        return Data;
    }();

    var View = function View() {
        _classCallCheck(this, View);
    };

    var jsonData = [{
        name: 'main',
        child: [{
            name: 'file1.1',
            child: []
        }, {
            name: 'file1.2',
            child: []
        }]
    }, {
        name: 'file2',
        child: [{
            name: 'file2.1',
            child: [{
                name: 'file2.1.1',
                child: []
            }]
        }, {
            name: 'file2.2',
            child: []
        }]
    }],
        data = new Data(jsonData);
    data.show();
})(window, document);