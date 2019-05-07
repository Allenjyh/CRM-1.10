var HNpicker = function($, doc) {
	this.$ = $;
	this.doc = doc;
}

HNpicker.prototype = {
	pickerInit: function(fn) {
		var $ = this.$,
			doc = this.doc;

		$.init();

		$.ready(function() {

			fn();

		});
	},
	roomPicker: function(ele) {
		/**
		 * 获取对象属性的值
		 * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
		 * @param {Object} obj 对象
		 * @param {String} param 属性名
		 */
		var $ = this.$,
			doc = this.doc;
		var _getParam = function(obj, param) {
			return obj[param] || '';
		};

		//-----------------------------------------
		//					//级联示例
		var roomPickerObj = new $.PopPicker({
			layer: 3
		});
		roomPickerObj.setData(roomData);
		var showCityPickerButton = doc.getElementById(ele);
		showCityPickerButton.addEventListener('tap', function(event) {
			roomPickerObj.show(function(items) {
				showCityPickerButton.value = _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " + _getParam(items[2], 'text');
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);

		return this;

	},
	datePicker: function(ele) {
		/**
		 * 选择日期
		 * **/
		var $ = this.$,
			doc = this.doc;
		var btns = $(ele);
		btns.each(function(i, btn) {
			btn.addEventListener('tap', function() {

				var result = $(this)[0];
				var _self = this;
				if(_self.picker) {
					_self.picker.show(function(rs) {
						result.value = rs.text;
						_self.picker.dispose();
						_self.picker = null;
					});
				} else {
					var optionsJson = this.getAttribute('data-options') || '{}';
					var options = JSON.parse(optionsJson);
					var id = this.getAttribute('id');
					/*
					 * 首次显示时实例化组件
					 * 示例为了简洁，将 options 放在了按钮的 dom 上
					 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
					 */
					_self.picker = new $.DtPicker(options);
					_self.picker.show(function(rs) {
						/*
						 * rs.value 拼合后的 value
						 * rs.text 拼合后的 text
						 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
						 * rs.m 月，用法同年
						 * rs.d 日，用法同年
						 * rs.h 时，用法同年
						 * rs.i 分（minutes 的第二个字母），用法同年
						 */
						result.value = rs.text;
						/* 
						 * 返回 false 可以阻止选择框的关闭
						 * return false;
						 */
						/*
						 * 释放组件资源，释放后将将不能再操作组件
						 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
						 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
						 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
						 */
						_self.picker.dispose();
						_self.picker = null;
					});
				}

			}, false);
		});

		return this;
	}
}
