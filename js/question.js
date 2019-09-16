//创建一个单选的组件
Vue.component('radioselect',{
	name:'radioselect',
	template:`<div>
		<span>{{ title }}</span>
		<div v-for="(item,index) in choices">
			<input type="radio" v-model="curValue" :value="choices[index]" :id="values[index]">
			<label :for="values[index]">{{item}}</label>
		</div>
		
	</div>`,
	props:{
		name: {
			type:String,
			default:'question0'
		},
		title:{
			type:String,
			default:'Question'
		},
		choices:{
			type:Array,
			default:function () {
				return ['c1','c2','c3']
			}
		}
	},
	data(){
		var values = [];
		this.choices.forEach((item,index) =>{
			console.log(item,index);
			values.push(this.name + (index+""))
		})
		
		return {
			values:values,
			curValue: ""
		}
	},
	watch:{
		curValue(val){
			this.$emit('pick',val)
		}
	}
});


//多选 ,最少选两项
Vue.component('multiselect',{
	name:'multiselect',
	
	props:{
		name: {
			type:String,
			default:'question0'
		},
		title:{
			type:String,
			default:'Question'
		},
		choices:{
			type:Array,
			default:function () {
				return ['c1','c2','c3']
			}
		}
	},
	
	data(){
		var values = [];
		this.choices.forEach((item,index) =>{
			values.push(this.name + (index+""))
		});
		return {
			values:values,
			curValue: []
		}
	},
	template:`<div>
		<span>{{ title }}</span>
		<div v-for="(item,index) in choices">
			<input type="checkbox" v-model="curValue" :value="choices[index]" :id="values[index]">
			<label :for="values[index]">{{item}}</label>
		</div>
	</div>`,
	
	watch:{
		curValue:{
			handler: function(val){
				this.$emit('pick',val)
			},
			deep:true
		}
	}
});




//自我介绍
Vue.component('typetext',{
	name:'typetext',
	props:{
		 name: {
            type: String,
            default: "question0"
        },
        title: {
            type: String,
            default: "Question"
        },
        text:{
        	type: String,
            default: ""
        }
	},
	data(){
		return {
			value: this.text
		}
	},
	template:`<div>
		<span>{{title}}</span>
		<div>
			<textarea v-model="value" autofocus rows="10" cols="40"></textarea>
		</div>
	</div>`,
	
	 watch:{
	 	value: function(val) {
	 		this.$emit('pick',val)
	 	}
	 }
})