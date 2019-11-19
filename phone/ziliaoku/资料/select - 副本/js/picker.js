const getRoomItem = {
	level1: [],
	level2: [],
	level3: [],
	level4: []
};

function roomPicker(dataSet) {

	//后台的数据格式
	let dataList = dataSet.data;
	
	//最深层级数
	;(function(dataList){
		let dataLists = {
			children : dataList
		},
		hierarchy = 0,
		ulBox = "",
		num = 0;
		function recursion(obj,k) {
		    num = Math.max(num,k);
		    if (obj.children)
		        obj.children.forEach(function(v, i){
		            recursion(v,k+1);
		        });
		}
		recursion(dataLists,1);
		
		
		hierarchy = num-1;
		
		for(let i=0;i<hierarchy;i++){
			ulBox += '<div class="room">'+
							'<ul class="room-list room-list-l">'+
							'</ul>'+
						'</div>';
		}
		
		if(dataSet.roomStar){
			ulBox += '<div class="room">'+
							'<ul class="room-list room-list-r">'+
							'</ul>'+
						'</div>';
		}
		if(dataSet.roomEnd){
			ulBox += '<div class="room">'+
							'<ul class="room-list room-list-r">'+
							'</ul>'+
						'</div>';
		}
		
		document.getElementById(dataSet.id).innerHTML = ulBox;
		
	})(dataList.levelItem)


	//设置数据的初始化
	let level1Arry = [],
		level2Arry = [],
		level3Arry = [],
		level4Arry = [],
		level5Arry = [],
		roomStarAry = [],
		roomEndAry = [];

	//填入获取的数据，初始化列表
	if(dataList.levelItem && dataList.levelItem.length > 0) {
		//第一级
		dataList.levelItem.forEach(ele => {
			level1Arry.push({
				id: ele.id,
				pid: ele.pid,
				name: ele.name
			})
		})
		//第二级
		if(dataList.levelItem[0].children && dataList.levelItem[0].children.length > 0) {
			dataList.levelItem[0].children.forEach(ele => {
				level2Arry.push({
					id: ele.id,
					pid: ele.pid,
					name: ele.name
				})
			})
			//第三级
			if(dataList.levelItem[0].children[0].children && dataList.levelItem[0].children[0].children.length > 0){
				dataList.levelItem[0].children[0].children.forEach(ele => {
					level3Arry.push({
						id: ele.id,
						pid: ele.pid,
						name: ele.name
					})
				})
				//第四级
				if(dataList.levelItem[0].children[0].children[0].children && dataList.levelItem[0].children[0].children[0].children.length > 0){
					dataList.levelItem[0].children[0].children[0].children.forEach(ele => {
						level4Arry.push({
							id: ele.id,
							pid: ele.pid,
							name: ele.name
						})
					})
					//第五级
					if(dataList.levelItem[0].children[0].children[0].children[0].children && dataList.levelItem[0].children[0].children[0].children[0].children.length > 0){
						dataList.levelItem[0].children[0].children[0].children[0].children.forEach(ele => {
							level5Arry.push({
								id: ele.id,
								pid: ele.pid,
								name: ele.name
							})
						})
					}
				}
			}

		}
		
		//房号
		for(let i = 0; i < 999; i++) {
				if(i > 0) {
					if(i < 10) {
						roomStarAry.push("00" + (i))
						roomEndAry.push("00" + (i))
					} else if(i >= 10 && i < 100) {
						roomStarAry.push("0" + (i))
						roomEndAry.push("0" + (i))
					} else if(i >= 100) {
						roomStarAry.push(i)
						roomEndAry.push(i)
					}
				}

			}
		
	}
	
	
	
	
	if(dataSet.roomStar){
		getRoomItem.roomStar = roomStarAry[0];
	}
	if(dataSet.roomEnd){
		getRoomItem.roomEnd = roomEndAry[0];
	}
	

	//获取要填充的容器
	let levelArry = document.querySelectorAll('.room-list-l'),
		level1Data = levelArry[0] ? levelArry[0] : false,
		level2Data = levelArry[1] ? levelArry[1] : false,
		level3Data = levelArry[2] ? levelArry[2] : false,
		level4Data = levelArry[3] ? levelArry[3] : false;
		level5Data = levelArry[4] ? levelArry[4] : false;
		
	let roomArry = document.querySelectorAll('.room-list-r'),
		roomData1 = roomArry[0] ? roomArry[0] : false,
		roomData2 = roomArry[1] ? roomArry[1] : false;

	//初始化要填充的html
	var initHtml = (f => {
		let level1Html = '',
			level2Html = '',
			level3Html = '',
			level4Html = '',
			level5Html = '',
			room1Html = '',
			room2Html = '';

		level1Arry.forEach(ele => {
			level1Html += `<li class="room-list-item">${ele.name}</li>`
		})

		level2Arry.forEach(ele => {
			level2Html += `<li class="room-list-item">${ele.name}</li>`
		})

		level3Arry.forEach(ele => {
			level3Html += `<li class="room-list-item">${ele.name}</li>`
		})

		level4Arry.forEach(ele => {
			level4Html += `<li class="room-list-item">${ele.name}</li>`
		})
		
		level5Arry.forEach(ele => {
			level5Html += `<li class="room-list-item">${ele.name}</li>`
		})
		
		roomStarAry.forEach(ele => {
			room1Html += `<li class="room-list-item">${ele}</li>`
		})
		
		roomEndAry.forEach(ele => {
			room2Html += `<li class="room-list-item">${ele}</li>`
		})

	
	
	

		if(level1Data){
			level1Data.innerHTML = level1Html;
			getRoomItem.level1 = level1Arry[0];
		}
			
		if(level2Data){
			level2Data.innerHTML = level2Html;
			getRoomItem.level2 = level2Arry[0];
		}
			
		if(level3Data){
			level3Data.innerHTML = level3Html;
			getRoomItem.level3 = level3Arry[0];
		}
			
		if(level4Data){
			level4Data.innerHTML = level4Html;
			getRoomItem.level4 = level4Arry[0];
		}
			
		if(level5Data){
			level5Data.innerHTML = level5Html;
			getRoomItem.level5 = level5Arry[0];
		}
			
		if(roomData1)
			roomData1.innerHTML = room1Html
		if(roomData2)
			roomData2.innerHTML = room2Html

	})();

	//设置选择器
	class roomPicker {
		constructor(obj, initIndex = 0, callback) {
			this.obj = obj
			this.index = -initIndex
			this.callback = callback
			this.deg = 0 //初始化偏转的角度
			this.length = this.obj.children.length
			this.distance = (this.obj ? (this.obj.children[0]?this.obj.children[0].offsetHeight:0) : 0)
			this.ready()
		}
		static setTranslate3d(obj, dis) {
			obj.style.transform = `translate3d(0,${dis}px,0)`
		}
		static setRotateX(obj, index, deg = 25) {
			//设置每个Li的偏转角度
			Array.from(obj).forEach((ele, i) => {
				obj[i].style.transform = `rotateX(${(i+index)*deg}deg)`
			})
		}
		ready() {
			//初始化运动距离
			roomPicker.setTranslate3d(this.obj, this.index * this.distance)
			//初始化3D偏转角度
			roomPicker.setRotateX(this.obj.children, this.index)
			this.bind(this.obj)
		}
		bind(selector) {
			let iStartPageY = 0,
				step = 1, //弹性系数
				prevPoint = 0,
				speed = 0, //手指离开时候的瞬时速度,速度越大,最后停留的越远
				timer = null,
				length = this.length - 1

			const touchstart = e => {
                if (e.cancelable) {
                    // 判断默认行为是否已经被禁用
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                    }
                }

				e.stopPropagation()
				clearInterval(timer)
				iStartPageY = e.changedTouches[0].clientY
				prevPoint = iStartPageY
			}
			const touchmove = e => {
                // 判断默认行为是否可以被禁用
                if (e.cancelable) {
                    // 判断默认行为是否已经被禁用
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                    }
                }
				e.stopPropagation()
				let iDisY = (e.changedTouches[0].pageY - iStartPageY)
				speed = (e.changedTouches[0].pageY - prevPoint)
				prevPoint = e.changedTouches[0].pageY
				//已滑动在头部或尾部,但是用户还想往上或下滑,这是给一种越往上或下滑越难拖动的体验
				if((this.index == 0 && iDisY > 0) || (this.index == -length && iDisY < 0)) {
					step = 1 - Math.abs(iDisY) / selector.clientWidth //根据超出长度计算系数大小，超出的越到 系数越小
					step = Math.max(step, 0) //系数最小值为0
					iDisY = parseInt(iDisY * step)
				}
				roomPicker.setTranslate3d(selector, this.index * this.distance + iDisY)
				roomPicker.setRotateX(this.obj.children, this.index + iDisY / this.distance)
			}
			const touchend = e => {
				e.preventDefault()
				e.stopPropagation()
				let iDisX = e.changedTouches[0].pageY - iStartPageY
				//初速度很小的逻辑处理
				let flag = false
				if(Math.abs(speed) <= 1) {
					flag = true
				}
				timer = setInterval(f => {
					if(Math.abs(speed) <= 1) {
						clearInterval(timer)
						if(flag) {
							this.index += Math.round(iDisX / this.distance)
						}
						this.index = this.index > 0 ? Math.min(this.index, 0) : Math.max(this.index, -length)
						this.index = this.index > 0 ? 0 : (this.index < -length ? -length : this.index)
						selector.style.transitionDuration = '400ms'
						selector.addEventListener("webkitTransitionEnd", f => {
							//touchend事件触发后会有一个动画，触发完成后立即清除transition
							selector.style.transitionDuration = '0ms'
						})
						Array.from(selector.children).forEach(ele => {
							ele.style.transitionDuration = '200ms'
							ele.addEventListener("webkitTransitionEnd", f => {
								ele.style.transitionDuration = '0ms'
							})
						})
						roomPicker.setTranslate3d(selector, this.index * this.distance)
						roomPicker.setRotateX(this.obj.children, this.index)
						this.callback && this.callback(Math.abs(this.index))
					} else {
						speed *= 0.2
						iDisX += speed
						this.index += Math.round(iDisX / this.distance)
					}
				}, 13);
			}
			selector.addEventListener("touchstart", touchstart, false)
			selector.addEventListener("touchmove", touchmove, false)
			selector.addEventListener("touchend", touchend, false)
		}
	}

	//选择
	new roomPicker(level1Data, 0, indexLevel1Data => {
		let selectedData = level1Arry[indexLevel1Data];
		getRoomItem.level1 = selectedData;

		if(level2Data) {
			let level2Html = "";
			level2Arry = [];
			let levelStatus = true;
			dataList.levelItem.forEach(ele => {
				
				if(selectedData.id == ele.id) {
					if(ele.children){
                        ele.children.forEach(ele => {
                            level2Arry.push(ele)
                    	})
					}else {
                        dataList.levelItem[0].children.forEach(ele => {
                            level2Arry.push(ele)
                    	})
                        levelStatus = false;
					}


				}
			});
			if(!levelStatus){
				return;
			}

			level2Arry.forEach(ele => {
				level2Html += `<li class="room-list-item">${ele.name}</li>`
			})

			level2Data.innerHTML = level2Html

			getRoomItem.level2 = level2Arry[0];

			//复位操作
			new roomPicker(level2Data, 0, indexLevel2Data => {

				let selectedData = level2Arry[indexLevel2Data]
				getRoomItem.level2 = selectedData;

				let level3Html = ''

			})
		}

	})

	if(level2Data) {
		new roomPicker(level2Data, 0, indexLevel2Data => {

			let selectedData = level2Arry[indexLevel2Data]
			getRoomItem.level2 = selectedData;
			
			
			if(level3Data) {
				let level3Html = "";
				level3Arry = [];
				dataList.levelItem.forEach(ele => {
					
					ele.children.forEach(ele => {
						if(selectedData.id == ele.id) {
							ele.children.forEach(ele => {
								level3Arry.push(ele)
							})
		
						}
					})
						
				})
				level3Arry.forEach(ele => {
					level3Html += `<li class="room-list-item">${ele.name}</li>`
				})
	
				level3Data.innerHTML = level3Html
	
				getRoomItem.level3 = level3Arry[0];
	
				//复位操作
				new roomPicker(level3Data, 0, indexLevel3Data => {
	
					let selectedData = level3Arry[indexLevel3Data]
					getRoomItem.level3 = selectedData;
	
					//let level3Html = ''
	
				})
			}
			

		})
	}

	if(level3Data) {
		new roomPicker(level3Data, 0, indexLevel3Data => {
			let selectedData = level3Arry[indexLevel3Data]
			getRoomItem.level3 = selectedData;

		})
	}

	if(level4Data) {
		new roomPicker(level4Data, 0, indexLevel4Data => {
			let selectedData = level4Arry[indexLevel4Data]
			getRoomItem.level4 = selectedData;

		})
	}
	

	if(level5Data) {
		new roomPicker(level5Data, 0, indexLevel5Data => {
			let selectedData = level5Arry[indexLevel5Data]
			getRoomItem.level5 = selectedData;

		})
	}
	
	if(roomData1) {
		new roomPicker(roomData1, 0, indexRoomData1 => {
			let selectedData = roomStarAry[indexRoomData1]
			getRoomItem.roomStar = selectedData;

		})
	}
	
	if(roomData2) {
		new roomPicker(roomData2, 0, indexRoomData2 => {
			let selectedData = roomEndAry[indexRoomData2]
			getRoomItem.roomEnd = selectedData;

		})
	}

};

roomPicker.prototype = {
	init(id,callback) {
		//roomPicker();
		this.controlRoomPicker(id,callback);
	},
	roomEvent(dom, type, fn) {
		if(dom.addEventListener) {
			dom.addEventListener(type, fn, false);
		} else if(dom.attachEvent) {
			dom.attachEvent('on' + type, fn);
		} else {
			dom['on' + type] = fn;
		}
	},
	$(id) {
		return document.getElementById(id);
	},
	controlRoomPicker(id,callback) {
		//this.$("room-controller").style.display = "none";
		let addBox = this.$(id), //调起选择器
			roomClose = this.$("roomClose"),
			roomSure = this.$("roomSure")

		//绑定新建结构按钮
		this.roomEvent(addBox, 'click', fn => {

			this.$("room-controller").style.display = "block";
		});
		//关闭选择器
		this.roomEvent(roomClose, 'click', fn => {
			this.$("room-controller").style.display = "none";
			document.body.style.overflow = "auto";// 浮层关闭时滚动设置
		});
		//确定选择
		this.roomEvent(roomSure, 'click', fn => {

			//console.log(getRoomItem)

			callback();
			this.$("room-controller").style.display = "none";

		})

	}
}