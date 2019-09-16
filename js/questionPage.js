Vue.component('questionpage',{
	 template:
	`<div>
		<div>{{ page +1}}/ {{count}}</div>
		<div v-for="(item,index) in questions">
			<radioselect v-show="page === index" v-if="item.type == \'radio\'" :name="\'q\' + (index + \'\')" :title="item.title" :choices = "item.choices" @pick="handlePick(arguments)"></radioselect>
			<multiselect v-show="page === index" v-else-if="item.type == \'multi'" :title="item.title" :choices = "item.choices" @pick="handlePick(arguments)"></multiselect>
			<typetext v-show="page === index" v-else="item.type ==\'typetext'" :title="item.title" @pick="handlePick(arguments)"></typetext>
		</div>
		
		<mybutton :banned="disabledNext" v-show = "page<count-1" @click="handleNext">下一题</mybutton>
		<mybutton :banned="false" v-show="page>0" @click="handlePrev" >上一题</mybutton>
		<mybutton :banned="false" @click="handleReset">重置</mybutton>
		<mybutton v-show="page === count-1" :banned="disabledSubmit" @click="handleSubmit">提交</mybutton>
		
	</div>`,
	props:{
		questions:{
			type:Array,
			default:function(){
				return [];
			}
		}
	},
	data(){
		return {
			page:0,
			disabledNext:true,
			disabledSubmit:true,
		}
	},
	computed:{
		count(){
			return this.questions.length
		}
	},
	methods:{
		//下一题
		handleNext(){
			if(this.page < this.count-1){
				this.page++;
				this.updateDisableNext();
			}
		},
		//上一题
		handlePrev(){
			if(this.page>0){
				this.page--;
				this.updateDisableNext()
			}
		},
		//重置
		handleReset(){
			var question = this.questions[this.page];
			console.log(question)
			switch (question.type) {
				case 'radio':
					this.$children[this.page].curValue ="";
					break;
				case 'multi':
					this.$children[this.page].curValue =[];
					break;
				case 'typetext':
					this.$children[this.page].value ='';
					break;
				default:
			}
		},
		
		handlePick(arguments){
			question = this.questions[this.page];
			switch(question.type){
				case 'radio':
				case 'multi':
					this.questions[this.page].picked = arguments[0];
					break;
				case 'typetext':
					this.questions[this.page].text = arguments[0];
					break;
				default:
				
			}
			this.updateDisableNext();
			this.updateDisableSubmit()
		},
		
		
		//判断选项触发按钮
		updateDisableNext(){
			var flag = false;
			var item = this.questions[this.page];
			if(item.type === "radio"){
				if(item.picked === "")
				flag = true
			}else if(item.type === "multi") {
				if(item.picked.length < 2)
				flag = true
			}else {
				if(item.text.length <10)
				flag = true
				
			}
			this.disabledNext = flag;
		},
		updateDisableSubmit(){
			var flag = false;
			this.questions.forEach((item) =>{
				if(item.type === "radio"){
					if(item.picked === "")
					flag = true
				}else if(item.type === "multi") {
					if(item.picked.length < 2)
					flag = true
				}else {
					if(item.text.length <10)
					flag = true
					
				}
			});
			this.disabledSubmit = flag
		},
		handleSubmit(){
			this.$emit('submit',this.questions)
		}
	}

})